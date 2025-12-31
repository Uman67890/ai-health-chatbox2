import React, { useState, useRef, useEffect } from 'react';
import { Send, HeartPulse, Sparkles, User, Bot, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealthAI } from './useHealthAI';
import './App.css';

function App() {
  const { messages, sendMessage, isTyping } = useHealthAI();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="app-container">
      <header className="header glass">
        <div className="logo-container">
          <HeartPulse size={32} />
        </div>
        <div className="header-content">
          <h1>Wellness AI</h1>
          <p>Your personal health and wellness companion</p>
        </div>
      </header>

      <main className="chat-window glass">
        <div className="messages-area">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`message-wrapper ${msg.type}`}
              >
                <div className="icon-wrapper" style={{ marginRight: msg.type === 'bot' ? '10px' : '0', marginLeft: msg.type === 'user' ? '10px' : '0' }}>
                  {msg.type === 'bot' ? <Bot size={20} color="var(--primary)" /> : <User size={20} color="var(--text-muted)" />}
                </div>
                <div className={`message ${msg.type}`}>
                  {msg.text}
                  <small className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="typing-indicator"
            >
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about wellness or symptoms..."
              className="chat-input"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
            <button
              type="button"
              className="glass"
              style={{ padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}
              onClick={() => sendMessage("Give me a wellness tip")}
            >
              <Sparkles size={14} color="var(--accent)" /> Wellness Tip
            </button>
            <button
              type="button"
              className="glass"
              style={{ padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}
              onClick={() => sendMessage("I have a headache")}
            >
              <RefreshCcw size={14} color="var(--primary)" /> Symptom Help
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
