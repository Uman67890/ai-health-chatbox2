# 🏥 Wellness AI Chatbot

A premium, responsive AI-powered wellness companion built with **React**, **TypeScript**, and **Framer Motion**. This application provides general wellness advice, symptom information, and emergency alerts through a sleek, glassmorphic interface.

![AI Wellness Chatbot](https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1000)

### The Problem
Accessing quick, non-alarming health information is difficult. Users often face "information overload" when searching for simple symptoms, or worse, they miss critical warning signs of life-threatening emergencies.

### The Solution: Wellness AI
A **privacy-first**, **offline-ready** triage companion that prioritizes safety. By using local heuristic matching, it delivers instant guidance without sending sensitive health data to a server.

###  Key Value Propositions
- **Zero Latency**: Local processing ensures immediate responses even in low-connectivity areas.
- **Privacy by Design**: No backend, no cookies, no tracking. Your health queries are yours alone.
- **Calm UX**: Designed to reduce anxiety through a soothing Glassmorphic interface and clear, helpful language.
- **Emergency-First Logic**: Intelligent triage system that detects high-risk keywords before processing general wellness advice.

## ✨ Features

- 🧠 **Smart Keyword Matching**: Instant responses for symptoms, common diseases, and medication basics.
- 🏥 **Disease Knowledge Base**: Information on conditions like Diabetes, Hypertension, and Flu.
- 💊 **Medication Basics**: Simple usage guidelines for common over-the-counter meds like Paracetamol and Ibuprofen.
- 🚨 **Emergency Detection**: Scans for high-risk keywords (e.g., "heart attack") and provides immediate instructions.
- 🧘 **Wellness Tips**: Randomly generated health and wellness advice.
-  **Premium UI/UX**: 
  - Dynamic animations using Framer Motion.
  - Modern "Glassmorphism" design system.
  - Fully responsive for mobile and desktop.
  - Simulated "AI Thinking" delay for a natural feel.
-  **Safe & Secure**: Provides general information with medical disclaimers.

##  Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite

##  Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/wellness-ai-chatbot.git
   cd wellness-ai-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

##  Project Structure

- `src/useHealthAI.ts`: Custom hook containing the AI logic and state management.
- `src/types.ts`: TypeScript interfaces and the AI knowledge base.
- `src/App.tsx`: Main UI assembly with animations.
- `src/App.css`: Core design system and glassmorphic styles.

##  Future Roadmap

We are constantly looking to improve Wellness AI. Some planned features include:
-  **Enhanced Health Insights**: Integration with medical APIs for more detailed information.
- **Health Tracking**: Secure storage for users to track their wellness journey over time.
- **Voice Interaction**: Accessibility improvements through voice-to-text and text-to-voice.
-  **Multilingual Support**: Providing wellness assistance in multiple languages.
- **Wearable Integration**: Syncing with devices like Apple Health or Google Fit for real-time health data.
-  **Personalized Plans**: AI-generated nutrition and exercise recommendations based on user goals.

##  Disclaimer

This application is for informational purposes only and does not provide medical diagnoses or professional medical advice. Always consult with a qualified healthcare provider for medical concerns.

---
