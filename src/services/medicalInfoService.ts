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

    // 1. Check local massive database first (Instant & Curated)
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            return {
                ...data,
                title: data.name,
                summary: `Comprehensive details about ${data.name}.`,
                disclaimer: DISCLAIMER
            };
        }
    }

    // 2. Fallback: The "Infinite" Wikipedia Parser
    // We fetch the FULL text (explaintext) to parse specific sections
    let summary = "";
    let title = query;
    let imageUrl: string | undefined;

    let symptoms: string[] = [];
    let precautions: string[] = [];
    let medications: string[] = [];
    let causes: string[] = [];
    let remedies: string[] = [];

    try {
        // Search for the best matching page title first
        const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
        const searchData = await searchRes.json();

        if (searchData.query?.search?.[0]) {
            title = searchData.query.search[0].title;

            // Now fetch the FULL content for this title
            const contentRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodeURIComponent(title)}&explaintext=1&piprop=original&format=json&origin=*`);
            const contentData = await contentRes.json();
            const pages = contentData.query.pages;
            const pageId = Object.keys(pages)[0];
            const page = pages[pageId];

            if (pageId !== "-1") {
                const fullText = page.extract || "";
                summary = fullText.split('\n')[0]; // First paragraph
                imageUrl = page.original?.source;

                // --- INTELLIGENT PARSING ---
                console.log("Parsing full article for:", title);

                symptoms = extractSectionFromFullText(fullText, ["Signs and symptoms", "Symptoms", "Presentation", "Characteristics"]);
                causes = extractSectionFromFullText(fullText, ["Cause", "Causes", "Virology", "Pathology", "Mechanism"]);
                precautions = extractSectionFromFullText(fullText, ["Prevention", "Screening", "Mitigation"]);
                medications = extractSectionFromFullText(fullText, ["Treatment", "Management", "Medication", "Therapy"]);

                // For Home Remedies, we look for 'Management', 'Lifestyle', 'Diet' sections
                remedies = extractSectionFromFullText(fullText, ["Lifestyle", "Diet", "Home remedies", "Self-care", "Alternative medicine"]);
            }
        }
    } catch (error) {
        console.error("Failed to search medical database:", error);
    }

    if (!summary) {
        return {
            title: title,
            summary: "I searched global medical records but couldn't find a precise match. Please check the spelling or try a more common name.",
            disclaimer: DISCLAIMER
        };
    }

    return {
        title: title,
        summary: summary.slice(0, 300) + "...", // Limit summary length
        imageUrl: imageUrl,
        causes: causes.length > 0 ? causes : undefined,
        symptoms: symptoms.length > 0 ? symptoms : undefined,
        precautions: precautions.length > 0 ? precautions : undefined,
        medications: medications.length > 0 ? medications : undefined,
        homeRemedies: remedies.length > 0 ? remedies : ["Rest and hydration (General advice -- specific data unavailable)"],
        disclaimer: DISCLAIMER
    };
};
