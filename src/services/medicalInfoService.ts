import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

import { GLOBAL_DISEASE_DATA } from '../data/diseaseData';

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = GLOBAL_DISEASE_DATA;

// --- ROBUST SENTENCE PARSER (Restored) ---
// This parser finds sentences containing keywords, which is more robust than looking for headers.
const extractSection = (text: string, keywords: string[]): string[] => {
    // 1. Split text into clean sentences
    const sentences = text.split(/[.!?]+(?=\s|$)/);

    // 2. Find relevant sentences containing key terms
    const matches = sentences
        .map(s => s.trim())
        .filter(s => s.length > 20 && s.length < 300) // Readable length
        .filter(s => {
            const lowerS = s.toLowerCase();
            return keywords.some(k => lowerS.includes(k.toLowerCase()));
        });

    // 3. Deduplicate and limit
    return [...new Set(matches)].slice(0, 6);
};

export const fetchMedicalInfo = async (query: string): Promise<MedicalInfo> => {
    const normalizedQuery = query.toLowerCase();

    // 1. Check Local Database (Primary Source for Details)
    let localData: MedicalCondition | undefined;
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            localData = data;
            break;
        }
    }

    // 2. Fetch Wikipedia Data (Image & Fallback Text)
    // We ALWAYS fetch this to get the image, even if we have local data.
    let wikiSummary = "";
    let wikiTitle = query;
    let wikiImage: string | undefined;

    // Heuristic Extracted Data (Backup if local is missing)
    let wikiSymptoms: string[] = [];
    let wikiPrecautions: string[] = [];
    let wikiMedications: string[] = [];
    let wikiCauses: string[] = [];
    let wikiRemedies: string[] = [];

    try {
        const searchQuery = localData ? localData.name : query;

        // A. Search for page
        const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`);
        const searchData = await searchRes.json();

        if (searchData.query?.search?.[0]) {
            wikiTitle = searchData.query.search[0].title;

            // B. Fetch Details & Image
            const contentRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodeURIComponent(wikiTitle)}&explaintext=1&piprop=original&format=json&origin=*`);
            const contentData = await contentRes.json();
            const pages = contentData.query.pages;
            const pageId = Object.keys(pages)[0];

            if (pageId !== "-1") {
                const page = pages[pageId];
                const fullText = page.extract || "";

                wikiSummary = fullText.split('\n')[0]; // First paragraph
                wikiImage = page.original?.source;

                // --- ROBUST PARSING (Refilled) ---
                if (!localData) {
                    console.log("Generating fallback data for:", wikiTitle);
                    wikiSymptoms = extractSection(fullText, ["symptom", "sign", "pain", "fever", "feel", "appear", "manifest"]);
                    wikiCauses = extractSection(fullText, ["cause", "result", "due to", "spread", "virus", "bacteria", "transmit"]);
                    wikiPrecautions = extractSection(fullText, ["prevent", "avoid", "protect", "vaccine", "risk", "hygiene", "wash"]);
                    wikiMedications = extractSection(fullText, ["treat", "medication", "drug", "prescribe", "therapy", "doctor", "manage"]);
                    wikiRemedies = extractSection(fullText, ["remedy", "home", "lifestyle", "diet", "water", "rest", "natural", "self-care"]);
                }
            }
        }
    } catch (e) {
        console.error("Wiki fetch failed:", e);
    }

    // 3. Construct Final Response
    // If we found NOTHING (No local, No wiki), return error
    if (!localData && !wikiSummary) {
        return {
            title: query,
            summary: "I couldn't find information on this specific condition. Please check the spelling or try a more common medical term.",
            disclaimer: DISCLAIMER
        };
    }

    // 4. Merge Logic:
    // - Title: Local Name > Wiki Title
    // - Image: Wiki Image (Always)
    // - Summary: Wiki Summary (More natural) > Local Summary
    // - Details: Local Details (Verified) > Wiki Heuristics (Generated)

    return {
        title: localData ? localData.name : wikiTitle,
        summary: wikiSummary ? (wikiSummary.slice(0, 350) + "...") : `Details regarding ${localData?.name}.`,
        imageUrl: wikiImage,

        causes: localData?.causes || (wikiCauses.length ? wikiCauses : undefined),
        symptoms: localData?.symptoms || (wikiSymptoms.length ? wikiSymptoms : undefined),
        precautions: localData?.precautions || (wikiPrecautions.length ? wikiPrecautions : undefined),
        medications: localData?.medications || (wikiMedications.length ? wikiMedications : undefined),
        homeRemedies: localData?.homeRemedies || (wikiRemedies.length ? wikiRemedies : ["Rest, hydration, and consulting a healthcare provider."]),

        disclaimer: DISCLAIMER
    };
};
