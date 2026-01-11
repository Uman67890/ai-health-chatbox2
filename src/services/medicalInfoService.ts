import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

import { GLOBAL_DISEASE_DATA } from '../data/diseaseData';

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = GLOBAL_DISEASE_DATA;

const extractSectionFromFullText = (text: string, headerKeywords: string[]): string[] => {
    try {
        const lowerText = text.toLowerCase();
        let startIndex = -1;

        // Find the section header
        for (const keyword of headerKeywords) {
            const index = lowerText.indexOf(keyword.toLowerCase());
            if (index !== -1) {
                // Look for the "== Header ==" pattern approx
                startIndex = index;
                break;
            }
        }

        if (startIndex === -1) return [];

        // Extract text from this header until the next header (== ...)
        const sectionStart = text.indexOf('\n', startIndex);
        if (sectionStart === -1) return [];

        let remainingText = text.slice(sectionStart).trim();
        const nextSectionIndex = remainingText.search(/==\s.+?\s==/);

        const relevantContent = nextSectionIndex !== -1
            ? remainingText.slice(0, nextSectionIndex)
            : remainingText;

        // Split into sentences/points
        const points = relevantContent
            .split(/\.|\n/)
            .map(s => s.trim())
            .filter(s => s.length > 10 && s.length < 200) // Filter specifically for readable points
            .filter(s => !s.includes("ISBN") && !s.includes("http"));

        return points.slice(0, 5); // Return top 5 points
    } catch (e) {
        return [];
    }
};

export const fetchMedicalInfo = async (query: string): Promise<MedicalInfo> => {
    const normalizedQuery = query.toLowerCase();

    // 1. Check local massive database
    let conditionData: MedicalCondition | undefined;
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            conditionData = data;
            break;
        }
    }

    // 2. Fetch from Wikipedia (Always fetch to get Image & Summary)
    // If we have local data, we use its name for a better search match
    let summary = "";
    let title = conditionData ? conditionData.name : query;
    let imageUrl: string | undefined;

    let wikiSymptoms: string[] = [];
    let wikiPrecautions: string[] = [];
    let wikiMedications: string[] = [];
    let wikiCauses: string[] = [];
    let wikiRemedies: string[] = [];

    try {
        const searchQuery = conditionData ? conditionData.name : query;

        // Search for the best matching page title first
        const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`);
        const searchData = await searchRes.json();

        if (searchData.query?.search?.[0]) {
            const wikiTitle = searchData.query.search[0].title;

            // Now fetch the FULL content for this title
            const contentRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodeURIComponent(wikiTitle)}&explaintext=1&piprop=original&format=json&origin=*`);
            const contentData = await contentRes.json();
            const pages = contentData.query.pages;
            const pageId = Object.keys(pages)[0];
            const page = pages[pageId];

            if (pageId !== "-1") {
                const fullText = page.extract || "";
                summary = fullText.split('\n')[0]; // First paragraph
                imageUrl = page.original?.source;
                title = wikiTitle; // Prefer Wiki title for display as it is properly capitalized

                // Only run intelligent parsing if we DON'T have local data
                if (!conditionData) {
                    console.log("Parsing full article for:", wikiTitle);
                    wikiSymptoms = extractSectionFromFullText(fullText, ["Signs and symptoms", "Symptoms", "Presentation", "Characteristics"]);
                    wikiCauses = extractSectionFromFullText(fullText, ["Cause", "Causes", "Virology", "Pathology", "Mechanism"]);
                    wikiPrecautions = extractSectionFromFullText(fullText, ["Prevention", "Screening", "Mitigation"]);
                    wikiMedications = extractSectionFromFullText(fullText, ["Treatment", "Management", "Medication", "Therapy"]);
                    wikiRemedies = extractSectionFromFullText(fullText, ["Lifestyle", "Diet", "Home remedies", "Self-care", "Alternative medicine"]);
                }
            }
        }
    } catch (error) {
        console.error("Failed to search medical database:", error);
    }

    if (!summary && !conditionData) {
        return {
            title: title,
            summary: "I searched global medical records but couldn't find a precise match. Please check the spelling or try a more common name.",
            disclaimer: DISCLAIMER
        };
    }

    // 3. Merge Local + Wiki Data
    // Prioritize LOCAL data for structure, use WIKI for missing pieces (Image, Summary)
    return {
        title: conditionData ? conditionData.name : title,
        summary: summary ? (summary.slice(0, 300) + "...") : (conditionData ? `Detailed medical information about ${conditionData.name}.` : "Fetching medical overview..."),
        imageUrl: imageUrl,
        causes: conditionData ? conditionData.causes : (wikiCauses.length > 0 ? wikiCauses : undefined),
        symptoms: conditionData ? conditionData.symptoms : (wikiSymptoms.length > 0 ? wikiSymptoms : undefined),
        precautions: conditionData ? conditionData.precautions : (wikiPrecautions.length > 0 ? wikiPrecautions : undefined),
        medications: conditionData ? conditionData.medications : (wikiMedications.length > 0 ? wikiMedications : undefined),
        homeRemedies: conditionData ? conditionData.homeRemedies : (wikiRemedies.length > 0 ? wikiRemedies : ["Rest and hydration (General advice -- specific data unavailable)"]),
        diseaseKnowledge: undefined, // Type compat
        disclaimer: DISCLAIMER
    };
};
