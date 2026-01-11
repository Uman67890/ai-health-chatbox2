import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = {
    // --- RESPIRATORY ---
    "flu": {
        name: "Influenza (Flu)",
        causes: ["Influenza viruses (A, B, C)", "Airborne droplets", "Direct contact"],
        symptoms: ["Sudden high fever", "Dry cough", "Sore throat", "Severe muscle aches", "Fatigue"],
        precautions: ["Annual flu vaccine", "Frequent handwashing", "Masking in crowds", "Isolation"],
        medications: ["Oseltamivir (Tamiflu)", "Baloxavir (Xofluza)", "Acetaminophen", "Ibuprofen"],
        homeRemedies: ["Warm broth and excessive fluids", "Steam inhalation with eucalyptus", "Saltwater gargle", "Complete bed rest"]
    },
    "covid": {
        name: "COVID-19",
        causes: ["SARS-CoV-2 virus", "Airborne aerosols", "Close contact"],
        symptoms: ["Fever/Chills", "New loss of taste/smell", "Shortness of breath", "Fatigue", "Dry cough"],
        precautions: ["Vaccination & Boosters", "N95/KN95 Masking", "Ventilation", "Hand hygiene"],
        medications: ["Paxlovid (Nirmatrelvir/Ritonavir)", "Remdesivir", "Molnupiravir", "Dexamethasone (severe)"],
        homeRemedies: ["Prone positioning for breathing", "Honey and lemon for cough", "Hydration with electrolytes", "Zinc and Vitamin C/D supplements (supportive)"]
    },
    "cold": {
        name: "Common Cold",
        causes: ["Rhinovirus (most common)", "Coronavirus", "RSV"],
        symptoms: ["Runny/stuffy nose", "Sore throat", "Sneezing", "Mild cough", "Low-grade fever"],
        precautions: ["Hand washing", "Avoid touching face", "Disinfect surfaces"],
        medications: ["Decongestants (Pseudoephedrine)", "Antihistamines", "Cough suppressants (Dextromethorphan)"],
        homeRemedies: ["Chicken soup (anti-inflammatory)", "Ginger tea with honey", "Humidifier usage", "Saline nasal drops"]
    },
    "asthma": {
        name: "Bronchial Asthma",
        causes: ["Allergens (pollen, dust)", "Pollution", "Cold air", "Exercise", "Genetics"],
        symptoms: ["Wheezing", "Chest tightness", "Shortness of breath", "Night-time coughing"],
        precautions: ["Identify and avoid triggers", "Air purifiers", "Flu vaccination"],
        medications: ["Albuterol (Rescue Inhaler)", "Fluticasone (Steroid)", "Montelukast", "Salmeterol"],
        homeRemedies: ["Caffeine (mild bronchodilator)", "Steam inhalation", "Breathing exercises (Buteyko/Pranayama)", "Ginger/Turmeric tea"]
    },
    "pneumonia": {
        name: "Pneumonia",
        causes: ["Bacteria (Streptococcus)", "Viruses", "Fungi", "Aspiration"],
        symptoms: ["Productive cough (green/yellow mucus)", "Stabbing chest pain", "High fever with chills", "Shortness of breath"],
        precautions: ["Pneumococcal vaccine", "Quit smoking", "Good hygiene"],
        medications: ["Antibiotics (Azithromycin, Amoxicillin)", "Antivirals", "Fever reducers"],
        homeRemedies: ["Warm peppermint tea", "Chest percussion (physiotherapy)", "Elecampane root tea (expectorant)", "Hydration"]
    },
    "tuberculosis": {
        name: "Tuberculosis (TB)",
        causes: ["Mycobacterium tuberculosis bacteria", "Airborne transmission"],
        symptoms: ["Coughing up blood", "Weight loss", "Night sweats", "Fever", "Fatigue"],
        precautions: ["BCG Vaccine", "Well-ventilated spaces", "N95 masks for caregivers"],
        medications: ["Isoniazid", "Rifampicin", "Pyrazinamide", "Ethambutol (RIPE therapy)"],
        homeRemedies: ["High-protein diet", "Pineapple (bromelain for mucus)", "Garlic (antimicrobial support)", "Sunlight (Vitamin D)"]
    },
    "bronchitis": {
        name: "Bronchitis",
        causes: ["Viral Flu/Cold", "Smoking", "Pollution"],
        symptoms: ["Persistent cough with mucus", "Wheezing", "Low fever", "Chest discomfort"],
        precautions: ["Avoid smoke/fumes", "Mask wearing", "Hand hygiene"],
        medications: ["Cough suppressants", "Bronchodilators", "Anti-inflammatories"],
        homeRemedies: ["Honey and warm water", "Steam with thyme", "Hydration", "Avoid dairy (may thicken mucus)"]
    },

    // --- VECTOR-BORNE & TROPICAL ---
    "malaria": {
        name: "Malaria",
        causes: ["Plasmodium parasites", "Anopheles mosquito bite"],
        symptoms: ["Cyclical high fever", "Shaking chills", "Sweating", "Headache", "Nausea"],
        precautions: ["Mosquito bets", "DEET repellent", "Antimalarial prophylaxis", "Long sleeves"],
        medications: ["Artemether-lumefantrine (Coartem)", "Chloroquine", "Doxycycline", "Primaquine"],
        homeRemedies: ["Cinnamon and basil tea", "Grapefruit (Quinine content - *caution with meds*)", "Ginger water", "Tepid sponging"]
    },
    "dengue": {
        name: "Dengue Fever",
        causes: ["Dengue virus", "Aedes aegypti mosquito"],
        symptoms: ["Sudden high fever", "Severe joint/bone pain ('Breakbone fever')", "Pain behind eyes", "Rash"],
        precautions: ["Eliminate standing water", "Mosquito repellents", "Screening windows"],
        medications: ["Acetaminophen (Paracetamol) ONLY - Avoid Aspirin/Ibuprofen due to bleeding risk", "IV fluids"],
        homeRemedies: ["Papaya leaf juice (for platelets)", "Coconut water", "Neem leaf tea", "Kiwi fruit"]
    },
    "typhoid": {
        name: "Typhoid Fever",
        causes: ["Salmonella Typhi bacteria", "Contaminated food/water"],
        symptoms: ["Step-ladder rising fever", "Stomach pain", "Headache", "Rose spots rash", "Constipation/Diarrhea"],
        precautions: ["Typhoid vaccine", "Drink boiled/bottled water", "Avoid raw street food"],
        medications: ["Ciprofloxacin", "Azithromycin", "Ceftriaxone"],
        homeRemedies: ["Banana and yogurt", "Apple cider vinegar", "ORS (Oral Rehydration Solution)", "Honey and warm water"]
    },
    "cholera": {
        name: "Cholera",
        causes: ["Vibrio cholerae", "Unsafe water", "Poor sanitation"],
        symptoms: ["Profuse watery diarrhea ('Rice-water stool')", "Vomiting", "Severe dehydration", "Muscle cramps"],
        precautions: ["Water purification", "Safe sanitation", "Cholera vaccine"],
        medications: ["Doxycycline", "Azithromycin", "Zinc supplements"],
        homeRemedies: ["Homemade ORS (Water + Sugar + Salt)", "Lemon water", "Coconut water", "Rice water"]
    },
    "zika": {
        name: "Zika Virus",
        causes: ["Zika virus", "Aedes mosquito", "Sexual contact"],
        symptoms: ["Mild fever", "Rash", "Joint pain", "Red eyes"],
        precautions: ["Prevent mosquito bites", "Safe sex (can stay in fluids)"],
        medications: ["Rest", "Fluids", "Acetaminophen"],
        homeRemedies: ["Complete rest", "Oatmeal bath for rash", "Cold compress"]
    },
    "chikungunya": {
        name: "Chikungunya",
        causes: ["Chikungunya virus", "Mosquito bite"],
        symptoms: ["Severe joint pain", "Fever", "Rash", "Muscle pain"],
        precautions: ["Mosquito control", "Protective clothing"],
        medications: ["Naproxen", "Ibuprofen", "Paracetamol"],
        homeRemedies: ["Cold packs for joints", "Turmeric milk", "Ginger tea", "Epsom salt bath"]
    },

    // --- CHRONIC & LIFESTYLE ---
    "diabetes": {
        name: "Diabetes Mellitus (Type 2)",
        causes: ["Insulin resistance", "Obesity", "Genetics", "Sedentary lifestyle"],
        symptoms: ["Polyuria (frequent urination)", "Polydipsia (excess thirst)", "Blurred vision", "Slow healing sores"],
        precautions: ["Weight management", "Low-glycemic diet", "Regular exercise"],
        medications: ["Metformin", "Glipizide", "SGLT2 inhibitors (Jardiance)", "Insulin (if advanced)"],
        homeRemedies: ["Bitter melon juice", "Fenugreek seeds", "Cinnamon tea", "Apple cider vinegar"]
    },
    "hypertension": {
        name: "Hypertension (BP)",
        causes: ["High salt intake", "Stress", "Obesity", "Age", "Genetics"],
        symptoms: ["Often silent", "Morning headaches", "Nosebleeds", "Tinnitus (ear ringing)"],
        precautions: ["DASH diet", "Reduce sodium (<2.3g/day)", "Quit smoking"],
        medications: ["Lisinopril", "Amlodipine", "Losartan", "Hydrochlorothiazide"],
        homeRemedies: ["Hibiscus tea", "Garlic", "Beetroot juice", "Meditation/Yoga"]
    },
    "heart_disease": {
        name: "Coronary Artery Disease",
        causes: ["Plaque buildup (Cholesterol)", "Smoking", "High BP", "Diabetes"],
        symptoms: ["Chest pain (Angina)", "Shortness of breath", "Fatigue", "Heart palpitations"],
        precautions: ["Heart-healthy diet", "Regular cardio", "Stress management"],
        medications: ["Atorvastatin", "Aspirin", "Beta-blockers (Metoprolol)", "Nitroglycerin"],
        homeRemedies: ["Omega-3 rich foods (Fish/Flax)", "Garlic", "Green tea", "Arjuna bark powder"]
    },
    "kidney_stone": {
        name: "Kidney Stones (Renal Calculi)",
        causes: ["Dehydration", "High oxalate diet", "Obesity", "Family history"],
        symptoms: ["Severe side/back pain", "Blood in urine", "Nausea", "Frequent urination"],
        precautions: ["Drink 3L+ water/day", "Limit salt", "Limit animal protein"],
        medications: ["Tamsulosin (to relax ureter)", "Pain relievers (Ketorolac)", "Potassium citrate"],
        homeRemedies: ["Lemon juice + Olive oil", "Apple cider vinegar", "Kidney bean broth", "Basil juice"]
    },
    "gerd": {
        name: "GERD (Acid Reflux)",
        causes: ["Weak esophageal sphincter", "Obesity", "Spicy food", "Late eating"],
        symptoms: ["Heartburn", "Regurgitation", "Chest pain", "Lump in throat"],
        precautions: ["Eat small meals", "Don't lie down after eating", "Elevate head of bed"],
        medications: ["Omeprazole", "Famotidine", "Antacids (Tums/Gaviscon)"],
        homeRemedies: ["Aloe vera juice", "Ginger tea", "Chewing gum (increases saliva)", "Baking soda in water"]
    },

    // --- NEUROLOGICAL & MENTAL ---
    "migraine": {
        name: "Migraine",
        causes: ["Hormonal changes", "Triggers (wine, cheese)", "Stress", "Weather"],
        symptoms: ["Unilateral throbbing pain", "Aura (visual starts)", "Nausea", "Light sensitivity"],
        precautions: ["Regular sleep schedule", "Hydration", "Magnesium supplements"],
        medications: ["Sumatriptan", "Rizatriptan", "Topiramate (preventive)", "Excedrin"],
        homeRemedies: ["Lavender oil inhalation", "Ginger tea for nausea", "Cold compress on neck", "Dark room rest"]
    },
    "alzheimer": {
        name: "Alzheimer's Disease",
        causes: ["Amyloid plaques", "Tau tangles", "Genetics (APOE-e4)", "Age"],
        symptoms: ["Short-term memory loss", "Confusion about time/place", "Word-finding difficulty", "Mood changes"],
        precautions: ["Cognitive stimulation", "Mediterranean diet", "Social engagement"],
        medications: ["Donepezil", "Memantine", "Rivastigmine"],
        homeRemedies: ["Coconut oil (MCTs)", "Turmeric (Curcumin)", "Omega-3 fatty acids", "Music therapy"]
    },
    "depression": {
        name: "Major Depressive Disorder",
        causes: ["Neurotransmitter imbalance", "Trauma", "Chronic illness", "Genetics"],
        symptoms: ["Persistent sadness", "Loss of interest (Anhedonia)", "Changes in sleep/appetite", "Fatigue"],
        precautions: ["Regular routine", "Avoid isolation", "Exercise (natural endorphins)"],
        medications: ["Sertraline (Zoloft)", "Fluoxetine (Prozac)", "Escitalopram", "Bupropion"],
        homeRemedies: ["St. John's Wort (consult doctor)", "Saffron extract", "Omega-3s", "Light therapy"]
    },
    "anxiety": {
        name: "Generalized Anxiety Disorder",
        causes: ["Stress pickup", "Brain chemistry", "Genetics"],
        symptoms: ["Excessive worry", "Restlessness", "Rapid heart rate", "Insomnia"],
        precautions: ["Limit caffeine/alcohol", "Sleep hygiene", "Stress management"],
        medications: ["Buspirone", "Escitalopram", "Alprazolam (short-term)"],
        homeRemedies: ["Chamomile tea", "Ashwagandha", "Valerian root", "Box breathing technique"]
    },

    // --- SKIN & OTHERS ---
    "acne": {
        name: "Acne Vulgaris",
        causes: ["Clogged pores", "Bacteria (C. acnes)", "Hormones", "Diet"],
        symptoms: ["Pimples", "Blackheads", "Cysts", "Oily skin"],
        precautions: ["Don't touch face", "Non-comedogenic products", "Clean pillowcases"],
        medications: ["Benzoyl Peroxide", "Salicylic Acid", "Tretinoin", "Doxycycline"],
        homeRemedies: ["Tea tree oil (diluted)", "Honey mask", "Green tea extract application", "Zinc supplements"]
    },
    "eczema": {
        name: "Eczema (Atopic Dermatitis)",
        causes: ["Immune system overreaction", "Dry skin", "Irritants"],
        symptoms: ["Itchy, red, cracked skin", "Inflammation", "Patches"],
        precautions: ["Avoid harsh soaps", "Moisturize frequently", "Wear cotton"],
        medications: ["Hydrocortisone cream", "Tacrolimus ointment", "Antihistamines"],
        homeRemedies: ["Colloidal oatmeal bath", "Coconut oil", "Aloe vera", "Apple cider vinegar bath"]
    },
    "conjunctivitis": {
        name: "Conjunctivitis (Pink Eye)",
        causes: ["Viruses", "Bacteria", "Allergies"],
        symptoms: ["Redness", "Gritty feeling", "Discharge/Crusting", "Tearing"],
        precautions: ["Wash hands", "Don't share towels/makeup", "Discard old lenses"],
        medications: ["Antibiotic drops (Moxifloxacin)", "Antihistamine drops", "Artificial tears"],
        homeRemedies: ["Warm compress (for bacterial)", "Cold compress (for allergic)", "Honey water drops (traditional)", "Rose water"]
    },
    "anemia": {
        name: "Iron Deficiency Anemia",
        causes: ["Blood loss", "Poor diet", "Absorption issues"],
        symptoms: ["Fatigue", "Pale skin", "Cold hands", "Brittleness nails"],
        precautions: ["Dietary changes", "Treat underlying bleeding"],
        medications: ["Ferrous Sulfate", "Iron Dextran", "Vitamin C (aids absorption)"],
        homeRemedies: ["Spinach and legumes", "Jaggery", "Cooking in cast iron", "Beetroot juice"]
    },
    "uti": {
        name: "Urinary Tract Infection (UTI)",
        causes: ["E. coli bacteria", "Dehydration", "Holding urine"],
        symptoms: ["Burning urination", "Frequent urge", "Cloudy urine", "Pelvic pain"],
        precautions: ["Hydration", "Wipe front to back", "Urinate after sex"],
        medications: ["Nitrofurantoin", "Trimethoprim", "Ciprofloxacin"],
        homeRemedies: ["Cranberry juice (unsweetened)", "D-Mannose", "Probiotics", "Plenty of water"]
    }
};

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
