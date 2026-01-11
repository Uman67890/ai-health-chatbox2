import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

import { GLOBAL_DISEASE_DATA } from '../data/diseaseData';

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = GLOBAL_DISEASE_DATA;

// --- BULLETPROOF SENTENCE PARSER ---
const extractSection = (text: string, primaryKeywords: string[], secondaryKeywords: string[] = []): string[] => {
    // 1. Split text into clean sentences
    const sentences = text.split(/[.!?]+(?=\s|$)/);

    // 2. Main Search: Look for strong matches
    let matches = sentences
        .map(s => s.trim())
        .filter(s => s.length > 20 && s.length < 350)
        .filter(s => {
            const lowerS = s.toLowerCase();
            return primaryKeywords.some(k => lowerS.includes(k.toLowerCase()));
        });

    // 3. Fallback: If minimal matches, use secondary broader keywords
    if (matches.length < 2 && secondaryKeywords.length > 0) {
        const secondaryMatches = sentences
            .map(s => s.trim())
            .filter(s => s.length > 20 && s.length < 350)
            .filter(s => {
                const lowerS = s.toLowerCase();
                return secondaryKeywords.some(k => lowerS.includes(k.toLowerCase()));
            });
        matches = [...matches, ...secondaryMatches];
    }

    // 4. Deduplicate and limit
    return [...new Set(matches)].slice(0, 5);
};

export const fetchMedicalInfo = async (query: string): Promise<MedicalInfo> => {
    const normalizedQuery = query.toLowerCase();

    // 1. Check Local Database (Primary Source)
    let localData: MedicalCondition | undefined;
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            localData = data;
            break;
        }
    }

    // 2. Fetch Wikipedia Data (Global Fallback + Image Source)
    let wikiSummary = "";
    let wikiTitle = query;
    let wikiImage: string | undefined;

    // Fallback Data Containers
    let wikiSymptoms: string[] = [];
    let wikiPrecautions: string[] = [];
    let wikiMedications: string[] = [];
    let wikiCauses: string[] = [];
    let wikiRemedies: string[] = [];

    try {
        const searchQuery = localData ? localData.name : query;

        // A. Aggressive Search: Get the specific Page Title
        const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`);
        const searchData = await searchRes.json();

        if (searchData.query?.search?.[0]) {
            wikiTitle = searchData.query.search[0].title;

            // B. Fetch FULL Content + Images for that Title
            const contentRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodeURIComponent(wikiTitle)}&explaintext=1&pithumbsize=600&format=json&origin=*`);
            const contentData = await contentRes.json();
            const pages = contentData.query.pages;
            const pageId = Object.keys(pages)[0];

            if (pageId !== "-1") {
                const page = pages[pageId];
                const fullText = page.extract || "";

                wikiSummary = fullText.split('\n')[0];
                // Grabbing image: Try original, then thumbnail
                wikiImage = page.original?.source || page.thumbnail?.source;

                // --- GENERATIVE PARSING (Only if local data is missing) ---
                if (!localData) {
                    console.log("Generating global data for:", wikiTitle);

                    wikiSymptoms = extractSection(fullText,
                        ["symptom", "sign", "present with", "characterized by", "pain", "fever", "rash"],
                        ["feel", "appear", "suffer", "experience", "manifest"]
                    );

                    wikiCauses = extractSection(fullText,
                        ["cause", "caused by", "due to", "result of", "trasmission", "spread", "virus", "bacteria"],
                        ["genetic", "risk factor", "origin", "etiology", "infect"]
                    );

                    wikiPrecautions = extractSection(fullText,
                        ["prevention", "prevent", "avoid", "vaccine", "prophylaxis", "screen", "hygiene"],
                        ["protect", "reduce risk", "control", "stop", "mask"]
                    );

                    wikiMedications = extractSection(fullText,
                        ["treatment", "treat", "medication", "drug", "antibiotic", "therapy", "prescribe", "surgery"],
                        ["manage", "heal", "cure", "intervention", "doctor"]
                    );

                    wikiRemedies = extractSection(fullText,
                        ["home remedy", "lifestyle", "diet", "nutrition", "self-care", "management"],
                        ["water", "rest", "exercise", "avoid", "sleep", "food", "natural"]
                    );
                }
            }
        }
    } catch (e) {
        console.error("Global search failed:", e);
    }

    // 3. Failure State Handler
    if (!localData && !wikiSummary) {
        return {
            title: query,
            summary: "I searched the global database but found no match. Please try ensuring the spelling is correct (e.g., 'Pneumonia' instead of 'numonia').",
            disclaimer: DISCLAIMER
        };
    }

    // 4. Intelligent Merge (The "All World" Logic)
    return {
        title: localData ? localData.name : wikiTitle,
        summary: wikiSummary ? (wikiSummary.slice(0, 350) + "...") : `Clinical details for ${localData?.name || wikiTitle}.`,
        imageUrl: wikiImage, // Guaranteed from Wiki if available

        // Use Local if exists, otherwise Wiki, otherwise Generic Fallback
        causes: (localData?.causes) || (wikiCauses.length ? wikiCauses : undefined),
        symptoms: (localData?.symptoms) || (wikiSymptoms.length ? wikiSymptoms : ["General symptoms may vary. Consult a professional."]),
        precautions: (localData?.precautions) || (wikiPrecautions.length ? wikiPrecautions : undefined),
        medications: (localData?.medications) || (wikiMedications.length ? wikiMedications : undefined),
        homeRemedies: (localData?.homeRemedies) || (wikiRemedies.length ? wikiRemedies : ["Rest, hydration, and healthy diet are generally recommended. Consult a doctor."]),

        disclaimer: DISCLAIMER
    };
};
