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

export const DEFAULT_RESPONSE = "I'm here to help with general wellness and common symptoms. Can you tell me more about how you're feeling?";

export const EMERGENCY_KEYWORDS = ["chest pain", "can't breathe", "unconscious", "stroke", "severe bleeding"];

export const EMERGENCY_MESSAGE = "🚨 IMPORTANT: If you are experiencing a medical emergency, please call your local emergency services (like 911) immediately.";
