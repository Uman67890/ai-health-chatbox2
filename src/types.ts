export type MessageType = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

export const WELLNESS_ADVICE = [
  "Stay hydrated! Aim for 8 glasses of water a day.",
  "A 15-minute walk can significantly boost your mood and energy.",
  "Quality sleep is crucial. Try to get 7-9 hours each night.",
  "Practice mindful breathing for 5 minutes to reduce stress.",
  "Include more leafy greens in your diet for essential vitamins.",
  "Don't forget to take regular breaks if you work at a desk.",
];

export const SYMPTOM_RESPONSES: Record<string, string> = {
  "headache": "For a mild headache, rest in a quiet room and stay hydrated. If it's severe or persistent, please consult a doctor.",
  "fever": "A fever often indicates your body is fighting an infection. Rest and drink fluids. If it exceeds 103°F (39.4°C), seek medical attention.",
  "cough": "Common coughs can be relieved with honey or warm fluids. If you have chest pain or difficulty breathing, contact emergency services.",
  "sore throat": "Gargling with warm salt water can help. Stay hydrated and rest your voice.",
  "tired": "Fatigue can be caused by stress, poor sleep, or diet. Try consistent sleep patterns, but see a professional if it persists.",
};

export const DISEASE_INFO: Record<string, string> = {
  "diabetes": "Diabetes is a chronic condition that affects how your body turns food into energy. It requires careful management of blood sugar through diet, exercise, and sometimes medication. Please consult an endocrinologist for a personalized plan.",
  "hypertension": "Hypertension (high blood pressure) is when the force of your blood against artery walls is too high. It often has no symptoms but increases risk for heart disease. Lifestyle changes and medication can manage it.",
  "flu": "The flu is a viral infection that attacks your respiratory system. Rest, fluids, and over-the-counter pain relievers usually help. If symptoms are severe, see a doctor within 48 hours for potential antiviral meds.",
  "asthma": "Asthma is a condition where your airways narrow and swell, producing extra mucus. It can make breathing difficult and trigger coughing or wheezing. It is typically managed with rescue and maintenance inhalers.",
  "cold": "The common cold is a viral infection of your nose and throat. It's usually harmless, though it may not feel that way. Rest and fluids are key; most people recover in 7-10 days.",
};

export const MEDICATION_INFO: Record<string, string> = {
  "ibuprofen": "Ibuprofen is a Non-Steroidal Anti-Inflammatory Drug (NSAID) used to treat pain, fever, and inflammation. Take with food to avoid stomach upset. Do not exceed recommended doses.",
  "paracetamol": "Paracetamol (Acetaminophen) is used to treat pain and fever. It is generally gentle on the stomach but can cause liver damage if taken in excess. Never exceed 4g in 24 hours.",
  "aspirin": "Aspirin is used to reduce pain, fever, or inflammation. It is also sometimes used as a blood thinner. Not recommended for children under 16 due to Reye's syndrome risk.",
  "antihistamine": "Antihistamines are used to relieve allergy symptoms like sneezing or itching. Some can cause drowsiness. Check the label if you need to drive or operate machinery.",
  "antibiotics": "Antibiotics treat bacterial infections, not viruses (like colds/flu). Always finish the entire prescribed course even if you feel better, to prevent antibiotic resistance.",
};

export const DEFAULT_RESPONSE = "I'm here to help with wellness tips, common symptoms, disease information, or medication basics. Can you tell me more about what's on your mind?";

export const EMERGENCY_KEYWORDS = ["chest pain", "can't breathe", "unconscious", "stroke", "severe bleeding", "heart attack", "seizure"];

export const EMERGENCY_MESSAGE = "🚨 IMPORTANT: If you are experiencing a medical emergency, please call your local emergency services (like 911) immediately.";
