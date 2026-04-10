import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Play, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VoiceButton from './VoiceButton';

export default function OnboardingPopup() {
  const { t, lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show only once per visit/session for now, or use localStorage to show only once ever
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      // Small delay so it animates in smoothly after dashboard loads
      setTimeout(() => setIsVisible(true), 800);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
          zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '1rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              background: '#1E293B', /* Dark theme pane */
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '2px solid #3B82F6',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ background: '#0F172A', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid #3B82F6' }}>
                <Info size={48} color="#60A5FA" />
              </div>
              
              {/* English Section */}
              <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', color: '#F8FAFC', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  How to use this website
                  <VoiceButton text="How to use this website. We want to help you stay safe. You can change the language to Marathi using the 'Globe' button at the top. Listen to instructions by clicking the 'Play' buttons." lang="en-US" />
                </h2>
                <p style={{ fontSize: '1.3rem', color: '#94A3B8', lineHeight: '1.6' }}>
                  We want to help you stay safe. You can change the language to Marathi using the 'Globe' button at the top. Click on any course to start. Listen to instructions by clicking the 'Play' buttons.
                </p>
              </div>

              {/* Marathi Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.2rem', color: '#F8FAFC', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  ही वेबसाइट कशी वापरावी
                  <VoiceButton text="ही वेबसाइट कशी वापरावी. आम्ही तुम्हाला सुरक्षित राहण्यास मदत करू इच्छितो. भाषा बदलण्यासाठी वरच्या 'ग्लोब' बटणावर क्लिक करा. आवाज ऐकण्यासाठी 'प्ले' बटणावर क्लिक करा." lang="mr-IN" />
                </h2>
                <p style={{ fontSize: '1.3rem', color: '#94A3B8', lineHeight: '1.6' }}>
                  आम्ही तुम्हाला सुरक्षित राहण्यास मदत करू इच्छितो. भाषा बदलण्यासाठी वरच्या <strong>'ग्लोब'</strong> बटणावर क्लिक करा. कोणताही कोर्स सुरू करण्यासाठी त्यावर क्लिक करा. आवाज ऐकण्यासाठी <strong>'स्पीकर'</strong> बटणावर क्लिक करा.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                <button 
                  onClick={closePopup}
                  style={{ 
                    background: '#059669', color: 'white', border: 'none', padding: '1.25rem 2rem', 
                    borderRadius: '12px', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer',
                    width: '100%', marginTop: '0.5rem', boxShadow: '0 4px 6px rgba(5, 150, 105, 0.3)'
                  }}
                >
                  {lang === 'en' ? "I Understand, Get Started" : "मला समजले, सुरू करा"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
