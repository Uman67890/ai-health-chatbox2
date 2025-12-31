import { useState, useCallback } from 'react';
import { type Message, SYMPTOM_RESPONSES, WELLNESS_ADVICE, DEFAULT_RESPONSE, EMERGENCY_KEYWORDS, EMERGENCY_MESSAGE, DISEASE_INFO, MEDICATION_INFO } from './types';

export const useHealthAI = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your AI Wellness Assistant. I can help with wellness tips, symptom info, diseases, or medication basics. (Reminder: I provide general information, not medical diagnoses.)",
            type: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const generateResponse = useCallback((input: string): string => {
        const lowerInput = input.toLowerCase();

        // Check for emergencies first
        if (EMERGENCY_KEYWORDS.some(keyword => lowerInput.includes(keyword))) {
            return EMERGENCY_MESSAGE;
        }

        // Check for symptoms
        for (const [symptom, response] of Object.entries(SYMPTOM_RESPONSES)) {
            if (lowerInput.includes(symptom)) {
                return response;
            }
        }

        // Check for diseases
        for (const [disease, info] of Object.entries(DISEASE_INFO)) {
            if (lowerInput.includes(disease)) {
                return info;
            }
        }

        // Check for medication
        for (const [med, info] of Object.entries(MEDICATION_INFO)) {
            if (lowerInput.includes(med)) {
                return info;
            }
        }

        // Check for wellness/advice requests
        if (lowerInput.includes('wellness') || lowerInput.includes('advice') || lowerInput.includes('tip')) {
            return WELLNESS_ADVICE[Math.floor(Math.random() * WELLNESS_ADVICE.length)];
        }

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello! I can provide info about symptoms, diseases like diabetes/flu, medications like ibuprofen, or wellness tips. What would you like to know?";
        }

        return DEFAULT_RESPONSE;
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            type: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const responseText = generateResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                type: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    }, [generateResponse]);

    return { messages, sendMessage, isTyping };
};
