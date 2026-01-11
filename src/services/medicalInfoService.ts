import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

import { GLOBAL_DISEASE_DATA } from '../data/diseaseData';

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = GLOBAL_DISEASE_DATA;

const extractSection = (text: string, keywords: string[]): string[] => {
    // Advanced heuristic: split by punctuation and filter for keyword density
    const sentences = text.split(/[.!?]+(?=\s|$)/);
    const matches = sentences
        .map(s => s.trim())
        .filter(s => s.length > 5)
        .filter(s => {
            const lowerS = s.toLowerCase();
            return keywords.some(k => lowerS.includes(k.toLowerCase()));
        });

    // Remove duplicates and return top results
    return [...new Set(matches)].slice(0, 5);
};

export const fetchMedicalInfo = async (query: string): Promise<MedicalInfo> => {
    const normalizedQuery = query.toLowerCase();

    // 1. Check local data
    let conditionData: MedicalCondition | undefined;
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            conditionData = data;
            break;
        }
    }

    // 2. Fetch from Wikipedia
    let summary = "";
    let title = query;
    let imageUrl: string | undefined;

    try {
        const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        if (wikiRes.status === 404) {
            // Try a search if direct summary fails
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
            const searchData = await searchRes.json();
            if (searchData.query?.search?.[0]) {
                const newQuery = searchData.query.search[0].title;
                const newWikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(newQuery)}`);
                if (newWikiRes.ok) {
                    const data = await newWikiRes.json();
                    summary = data.extract;
                    title = data.title;
                    imageUrl = data.thumbnail?.original || data.thumbnail?.source;
                }
            }
        } else if (wikiRes.ok) {
            const data = await wikiRes.json();
            summary = data.extract;
            title = data.title;
            imageUrl = data.thumbnail?.original || data.thumbnail?.source;
        }
    } catch (error) {
        console.error("Failed to fetch from Wikipedia:", error);
    }

    if (!summary && !conditionData) {
        return {
            title: title,
            summary: "I'm searching my global records, but I couldn't find a detailed match. Please try a common disease name.",
            disclaimer: DISCLAIMER
        };
    }

    // 3. Heuristic extraction
    const symptoms = conditionData?.symptoms || extractSection(summary, ["symptom", "sign", "manifestation", "feel", "characterized by", "including"]);
    const precautions = conditionData?.precautions || extractSection(summary, ["prevent", "avoid", "precaution", "risk", "lifestyle", "control", "reduction"]);
    const medications = conditionData?.medications || extractSection(summary, ["medication", "treatment", "drug", "therapy", "prescribe", "management", "remedy"]);
    const remedies = conditionData?.homeRemedies || extractSection(summary, ["remedy", "home", "natural", "supportive", "water", "rest", "diet", "herbal"]);
    const causes = conditionData?.causes || extractSection(summary, ["cause", "due to", "result of", "origin", "linked to", "etiology"]);
    const knowledge = conditionData?.diseaseKnowledge || extractSection(summary, ["known as", "history", "discovered", "global", "impact", "research", "scientific", "study"]);

    return {
        title: conditionData ? conditionData.name : title,
        summary: summary || "Fetching global overview...",
        imageUrl: imageUrl,
        causes: causes.length > 0 ? causes : undefined,
        symptoms: symptoms.length > 0 ? symptoms : undefined,
        precautions: precautions.length > 0 ? precautions : undefined,
        medications: medications.length > 0 ? medications : undefined,
        homeRemedies: remedies.length > 0 ? remedies : undefined,
        diseaseKnowledge: knowledge.length > 0 ? knowledge : undefined,
        disclaimer: DISCLAIMER
    };
};
