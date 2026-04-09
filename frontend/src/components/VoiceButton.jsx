import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VoiceButton({ text, lang = 'en-US' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Stop speaking if component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleVoice = (e) => {
    e.stopPropagation(); // Prevent triggering parent clicks
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Kill any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language logic. Basic heuristic for Marathi
      if (text && text.match(/[\u0900-\u097F]/)) {
        utterance.lang = 'mr-IN';
      } else {
        utterance.lang = 'en-US';
      }
      
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      onClick={toggleVoice}
      title="Read instructions aloud"
      style={{ 
        padding: '0.5rem', 
        borderRadius: '50%', 
        marginLeft: '0.5rem', 
        background: isPlaying ? '#DBEAFE' : 'rgba(0,0,0,0.05)',
        border: `2px solid ${isPlaying ? '#3B82F6' : 'transparent'}`,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        minHeight: 'auto',
        height: '40px',
        width: '40px'
      }}
      aria-label="Read text aloud"
    >
      {isPlaying ? <VolumeX size={24} color="#1D4ED8" /> : <Volume2 size={24} color="#1E293B" />}
    </button>
  );
}
