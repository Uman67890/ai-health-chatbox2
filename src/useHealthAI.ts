import { useState, useCallback } from 'react';
import { type Message, SYMPTOM_RESPONSES, WELLNESS_ADVICE, DEFAULT_RESPONSE, EMERGENCY_KEYWORDS, EMERGENCY_MESSAGE } from './types';

export const useHealthAI = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your AI Wellness Assistant. How can I help you feel better today? (Reminder: I provide general information, not medical diagnoses.)",
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

        // Check for wellness/advice requests
        if (lowerInput.includes('wellness') || lowerInput.includes('advice') || lowerInput.includes('tip')) {
            return WELLNESS_ADVICE[Math.floor(Math.random() * WELLNESS_ADVICE.length)];
        }

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello! I can provide wellness tips or information about common symptoms like headaches, fever, or fatigue. What's on your mind?";
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
