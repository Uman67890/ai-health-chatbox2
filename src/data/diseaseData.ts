import type { MedicalCondition } from '../types';

export const GLOBAL_DISEASE_DATA: Record<string, MedicalCondition> = {
    // --- RESPIRATORY & LUNG ---
    "flu": {
        name: "Influenza (Flu)",
        causes: ["Influenza viruses (A, B, C)", "Airborne droplets"],
        symptoms: ["Sudden high fever", "Dry cough", "Sore throat", "Muscle aches"],
        precautions: ["Annual flu vaccine", "Handwashing"],
        medications: ["Oseltamivir (Tamiflu)", "Baloxavir", "Analgesics"],
        homeRemedies: ["Warm broth", "Steam inhalation", "Saltwater gargle", "Rest"]
    },
    "covid": {
        name: "COVID-19",
        causes: ["SARS-CoV-2", "Aerosol transmission"],
        symptoms: ["Fever", "Loss of taste/smell", "Shortness of breath", "Fatigue"],
        precautions: ["Vaccination", "Masking", "Ventilation"],
        medications: ["Paxlovid", "Remdesivir", "Dexamethasone"],
        homeRemedies: ["Prone breathing", "Honey for cough", "Hydration", "Vitamin C/D"]
    },
    "asthma": {
        name: "Asthma",
        causes: ["Allergens", "Pollution", "Cold air", "Genetics"],
        symptoms: ["Wheezing", "Chest tightness", "Shortness of breath"],
        precautions: ["Avoid triggers", "Air purifiers"],
        medications: ["Albuterol", "Fluticasone", "Montelukast"],
        homeRemedies: ["Coffee (caffeine)", "Steam inhalation", "Breathing exercises"]
    },
    "pneumonia": {
        name: "Pneumonia",
        causes: ["Bacteria", "Viruses", "Fungi"],
        symptoms: ["Productive cough", "Stabbing chest pain", "High fever", "Breathlessness"],
        precautions: ["Pneumococcal vaccine", "No smoking"],
        medications: ["Azithromycin", "Amoxicillin", "Antivirals"],
        homeRemedies: ["Peppermint tea", "Chest physiotherapy", "Hydration"]
    },
    "tuberculosis": {
        name: "Tuberculosis (TB)",
        causes: ["Mycobacterium tuberculosis", "Airborne"],
        symptoms: ["Coughing blood", "Night sweats", "Weight loss", "Fever"],
        precautions: ["BCG Vaccine", "Masks"],
        medications: ["Isoniazid", "Rifampicin", "Ethambutol"],
        homeRemedies: ["High-protein diet", "Pineapple (bromelain)", "Garlic"]
    },
    "bronchitis": {
        name: "Bronchitis",
        causes: ["Viruses", "Smoking", "Pollution"],
        symptoms: ["Persistent mucus cough", "Wheezing", "Low fever"],
        precautions: ["Avoid smoke", "Masks"],
        medications: ["Bronchodilators", "Cough suppressants"],
        homeRemedies: ["Honey", "Thyme steam", "Hydration"]
    },
    "copd": {
        name: "COPD (Chronic Obstructive Pulmonary Disease)",
        causes: ["Smoking", "Long-term pollution exposure"],
        symptoms: ["Chronic cough", "Wheezing", "Tight chest", "Fatigue"],
        precautions: ["Quit smoking", "Avoid lung irritants"],
        medications: ["Bronchodilators", "Inhaled steroids"],
        homeRemedies: ["Pursed-lip breathing", "Aerobic exercise", "Healthy weight"]
    },

    // --- INFECTIOUS & TROPICAL ---
    "malaria": {
        name: "Malaria",
        causes: ["Plasmodium parasites", "Anopheles mosquito"],
        symptoms: ["Cyclical fever", "Chills", "Sweating", "Headache"],
        precautions: ["Mosquito nets", "DEET"],
        medications: ["Artemether", "Chloroquine", "Doxycycline"],
        homeRemedies: ["Cinnamon tea", "Ginger water", "Tepid sponging"]
    },
    "dengue": {
        name: "Dengue Fever",
        causes: ["Dengue virus", "Aedes mosquito"],
        symptoms: ["High fever", "Severe bone pain", "Eye pain", "Rash"],
        precautions: ["Mosquito control", "Repellents"],
        medications: ["Paracetamol ONLY"],
        homeRemedies: ["Papaya leaf juice", "Coconut water", "Kiwi"]
    },
    "typhoid": {
        name: "Typhoid Fever",
        causes: ["Salmonella Typhi", "Contaminated food"],
        symptoms: ["Stepladder fever", "Stomach pain", "Rose spots"],
        precautions: ["Vaccine", "Safe water"],
        medications: ["Ciprofloxacin", "Azithromycin"],
        homeRemedies: ["Banana", "Apple cider vinegar", "ORS"]
    },
    "cholera": {
        name: "Cholera",
        causes: ["Vibrio cholerae", "Dirty water"],
        symptoms: ["Watery diarrhea", "Vomiting", "Dehydration"],
        precautions: ["Safe water", "Sanitation"],
        medications: ["Doxycycline", "Zinc"],
        homeRemedies: ["Homemade ORS", "Lemon water", "Rice water"]
    },
    "hiv": {
        name: "HIV/AIDS",
        causes: ["Human Immunodeficiency Virus", "Bodily fluids"],
        symptoms: ["Recurrent infections", "Weight loss", "Night sweats"],
        precautions: ["Safe sex", "Clean needles", "PrEP"],
        medications: ["Antiretroviral Therapy (ART)", "Tenofovir"],
        homeRemedies: ["Healthy diet", "Stress reduction", "Avoid raw foods"]
    },
    "measles": {
        name: "Measles",
        causes: ["Measles virus", "Airborne"],
        symptoms: ["High fever", "Koplik spots", "Rash"],
        precautions: ["MMR Vaccine"],
        medications: ["Vitamin A", "Acetaminophen"],
        homeRemedies: ["Rest", "Humidifier", "Fluids"]
    },
    "chickenpox": {
        name: "Chickenpox",
        causes: ["Varicella-zoster virus", "Contact"],
        symptoms: ["Itchy blister rash", "Fever", "Fatigue"],
        precautions: ["Varicella vaccine"],
        medications: ["Acyclovir", "Antihistamines"],
        homeRemedies: ["Oatmeal bath", "Calamine lotion", "Neem bath"]
    },
    "rabies": {
        name: "Rabies",
        causes: ["Rabies virus", "Animal bites"],
        symptoms: ["Hydrophobia (fear of water)", "Agitation", "Paralysis"],
        precautions: ["Vaccinate pets", "Avoid wild animals"],
        medications: ["Rabies Immunoglobulin", "Rabies Vaccine (PEP)"],
        homeRemedies: ["IMMEDIATE wound washing (15 mins)", "Seen doctor instantly"]
    },
    "tetanus": {
        name: "Tetanus (Lockjaw)",
        causes: ["Clostridium tetani", "Deep cuts/rust"],
        symptoms: ["Jaw cramping", "Muscle spasms", "Stiffness"],
        precautions: ["Tetanus shot (Tdap)"],
        medications: ["Antitoxin", "Antibiotics", "Muscle relaxers"],
        homeRemedies: ["Wound cleaning", "Quiet environment"]
    },
    "lyme": {
        name: "Lyme Disease",
        causes: ["Borrelia bacteria", "Tick bites"],
        symptoms: ["Bullseye rash", "Joint pain", "Fatigue"],
        precautions: ["Tick checks", "Long pants in woods"],
        medications: ["Doxycycline", "Amoxicillin"],
        homeRemedies: ["Immune boosting foods", "Rest"]
    },

    // --- AUTOIMMUNE & CHRONIC ---
    "diabetes": {
        name: "Diabetes (Type 2)",
        causes: ["Insulin resistance", "Obesity"],
        symptoms: ["Excess thirst", "Frequent urination", "Blurred vision"],
        precautions: ["Diet", "Exercise", "Weight loss"],
        medications: ["Metformin", "Insulin", "Glipizide"],
        homeRemedies: ["Bitter melon", "Fenugreek", "Cinnamon"]
    },
    "hypertension": {
        name: "Hypertension",
        causes: ["Salt", "Stress", "Age"],
        symptoms: ["Headaches", "Nosebleeds", "Vision changes"],
        precautions: ["Low sodium", "Exercise"],
        medications: ["Lisinopril", "Amlodipine"],
        homeRemedies: ["Hibiscus tea", "Garlic", "Beetroot"]
    },
    "lupus": {
        name: "Lupus (SLE)",
        causes: ["Autoimmune", "Genetics", "Sunlight"],
        symptoms: ["Butterfly rash", "Joint pain", "Fatigue"],
        precautions: ["Sun protection", "Stress management"],
        medications: ["Hydroxychloroquine", "Prednisone"],
        homeRemedies: ["Anti-inflammatory diet", "Turmeric", "Rest"]
    },
    "rheumatoid": {
        name: "Rheumatoid Arthritis",
        causes: ["Autoimmune", "Genetics"],
        symptoms: ["Joint swelling", "Morning stiffness", "Deformity"],
        precautions: ["Healthy weight", "No smoking"],
        medications: ["Methotrexate", "Humira", "NSAIDs"],
        homeRemedies: ["Fish oil", "Hot/Cold packs", "Ginger"]
    },
    "ms": {
        name: "Multiple Sclerosis (MS)",
        causes: ["Myelin damage", "Autoimmune"],
        symptoms: ["Numbness", "Vision loss", "Balance issues"],
        precautions: ["Vitamin D", "No smoking"],
        medications: ["Ocrelizumab", "Interferons"],
        homeRemedies: ["Cooling vest", "Yoga", "Vitamin D supplements"]
    },
    "celiac": {
        name: "Celiac Disease",
        causes: ["Gluten intolerance", "Genetics"],
        symptoms: ["Diarrhea", "Bloating", "Weight loss"],
        precautions: ["Strict Gluten-Free Diet"],
        medications: ["Vitamins (for deficiency)", "Steroids (rare)"],
        homeRemedies: ["Aloe vera juice", "Probiotics", "Ginger"]
    },

    // --- CANCER & SEVERE ---
    "cancer": {
        name: "Cancer (General)",
        causes: ["Mutations", "Carcinogens", "Radiation"],
        symptoms: ["Lumps", "Unexplained weight loss", "Fatigue"],
        precautions: ["Screenings", "Healthy lifestyle"],
        medications: ["Chemotherapy", "Immunotherapy"],
        homeRemedies: ["Ginger (nausea)", "Meditation", "Support"]
    },
    "breast_cancer": {
        name: "Breast Cancer",
        causes: ["BRCA genes", "Age", "Hormones"],
        symptoms: ["Breast lump", "Shape change", "Discharge"],
        precautions: ["Self-exams", "Mammograms"],
        medications: ["Tamoxifen", "Trastuzumab"],
        homeRemedies: ["Plant-based diet", "Exercise", "Flaxseed"]
    },
    "prostate": {
        name: "Prostate Cancer",
        causes: ["Age", "Race", "Family history"],
        symptoms: ["Urinary difficulty", "Pelvic discomfort"],
        precautions: ["PSA testing"],
        medications: ["Leuprolide", "Bicalutamide"],
        homeRemedies: ["Tomatoes (Lycopene)", "Green tea", "Soy"]
    },
    "leukemia": {
        name: "Leukemia",
        causes: ["Bone marrow mutations", "Chemicals"],
        symptoms: ["Easy bruising", "Bleeding", "Infections"],
        precautions: ["Avoid benzene", "No smoking"],
        medications: ["Imatinib", "Chemotherapy"],
        homeRemedies: ["Cooked food (neutropenic diet)", "Hygiene"]
    },

    // --- ORGANS & GUT ---
    "gerd": {
        name: "GERD (Acid Reflux)",
        causes: ["Weak sphincter", "Obesity"],
        symptoms: ["Heartburn", "Regurgitation"],
        precautions: ["Small meals", "Elevate head"],
        medications: ["Omeprazole", "Antacids"],
        homeRemedies: ["Aloe vera", "Ginger", "Gum"]
    },
    "ibs": {
        name: "IBS (Irritable Bowel)",
        causes: ["Gut sensitivity", "Stress"],
        symptoms: ["Cramping", "Diarrhea/Constipation"],
        precautions: ["FODMAP diet", "Stress control"],
        medications: ["Dicyclomine", "Loperamide"],
        homeRemedies: ["Peppermint oil", "Probiotics", "Fibre"]
    },
    "kidney_stone": {
        name: "Kidney Stones",
        causes: ["Dehydration", "Oxalates"],
        symptoms: ["Severe back pain", "Blood in urine"],
        precautions: ["Water (3L+)", "Low salt"],
        medications: ["Tamsulosin", "Painkillers"],
        homeRemedies: ["Lemon juice", "Apple cider vinegar", "Basil"]
    },
    "cirrhosis": {
        name: "Liver Cirrhosis",
        causes: ["Alcohol", "Hepatitis", "Fatty liver"],
        symptoms: ["Jaundice", "Swollen belly (ascites)"],
        precautions: ["No alcohol", "Hepatitis vaccine"],
        medications: ["Diuretics", "Lactulose"],
        homeRemedies: ["Milk thistle (consult doc)", "Low salt"]
    },

    // --- MENTAL HEALTH ---
    "depression": {
        name: "Depression",
        causes: ["Chemistry", "Trauma"],
        symptoms: ["Sadness", "Anhedonia", "Sleep issues"],
        precautions: ["Therapy", "Connection"],
        medications: ["SSRIs (Prozac)", "SNRIs"],
        homeRemedies: ["Sunlight", "Exercise", "Omega-3"]
    },
    "anxiety": {
        name: "Anxiety",
        causes: ["Stress", "Chemistry"],
        symptoms: ["Worry", "Restlessness", "Panic"],
        precautions: ["Limit caffeine", "Sleep"],
        medications: ["Buspirone", "SSRIs"],
        homeRemedies: ["Chamomile", "Meditation", "Ashwagandha"]
    },
    "insomnia": {
        name: "Insomnia",
        causes: ["Stress", "Screens", "Caffeine"],
        symptoms: ["Difficulty falling asleep", "Waking up tired"],
        precautions: ["Sleep hygiene", "Dark room"],
        medications: ["Melatonin", "Zolpidem"],
        homeRemedies: ["Warm milk", "Lavender", "Valerian root"]
    },
    "schizo": {
        name: "Schizophrenia",
        causes: ["Genetics", "Brain structure"],
        symptoms: ["Delusions", "Hallucinations", "Disordered thinking"],
        precautions: ["Early intervention", "Avoid drugs"],
        medications: ["Antipsychotics (Risperidone)", "Clozapine"],
        homeRemedies: ["Routine", "Omega-3", "Social skills training"]
    },

    // --- SKIN & EYES ---
    "acne": {
        name: "Acne",
        causes: ["Oil", "Bacteria", "Hormones"],
        symptoms: ["Pimples", "Cysts"],
        precautions: ["Clean face", "Non-comedogenic"],
        medications: ["Benzoyl peroxide", "Tretinoin"],
        homeRemedies: ["Tea tree oil", "Honey", "Zinc"]
    },
    "eczema": {
        name: "Eczema",
        causes: ["Immune system", "Dryness"],
        symptoms: ["Itchy red patches"],
        precautions: ["Moisturize", "Gentle soaps"],
        medications: ["Steroid creams", "Tacrolimus"],
        homeRemedies: ["Oatmeal bath", "Coconut oil", "Aloe"]
    },
    "psoriasis": {
        name: "Psoriasis",
        causes: ["Autoimmune", "Stress"],
        symptoms: ["Silver scales", "Red patches"],
        precautions: ["Avoid triggers", "Sunlight (moderate)"],
        medications: ["Biologics", "Methotrexate"],
        homeRemedies: ["Turmeric", "Apple cider vinegar dip", "Aloe"]
    },
    "conjunctivitis": {
        name: "Pink Eye",
        causes: ["Bacteria", "Virus", "Allergy"],
        symptoms: ["Redness", "Crusting", "Itch"],
        precautions: ["Wash hands", "No sharing towels"],
        medications: ["Antibiotic drops", "Antihistamines"],
        homeRemedies: ["Warm compress", "Honey water drops"]
    },
    "cataract": {
        name: "Cataract",
        causes: ["Aging", "UV light"],
        symptoms: ["Cloudy vision", "Glare sensitivity"],
        precautions: ["Sunglasses", "Quit smoking"],
        medications: ["Surgery (replacement)"],
        homeRemedies: ["Vitamin C/E rich diet (prevention)", "Bright lights"]
    },

    // --- OTHER ---
    "anemia": {
        name: "Anemia",
        causes: ["Iron deficiency", "Blood loss"],
        symptoms: ["Fatigue", "Pale skin", "Cold hands"],
        precautions: ["Iron rich diet"],
        medications: ["Iron supplements", "B12"],
        homeRemedies: ["Spinach", "Beetroot", "Citrus"]
    },
    "arthritis": {
        name: "Osteoarthritis",
        causes: ["Wear and tear", "Age"],
        symptoms: ["Joint pain", "Stiffness"],
        precautions: ["Weight control", "Exercise"],
        medications: ["NSAIDs", "Steroid injections"],
        homeRemedies: ["Turmeric", "Hot/Cold therapy", "Epsom salt"]
    }
};
