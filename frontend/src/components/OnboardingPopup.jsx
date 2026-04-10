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
              background: 'var(--card-bg)',
              borderRadius: '24px',
              padding: '3.5rem 3rem',
              maxWidth: '800px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(18, 22, 41, 0.5)',
              border: '4px solid #121629',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ background: 'var(--accent-primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '2px solid #121629' }}>
                <Info size={56} color="#121629" />
              </div>
              
              {lang === 'en' ? (
                <div style={{ marginBottom: '3rem', paddingBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--card-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    Welcome to The Guardian Path
                    <VoiceButton text="Welcome to The Guardian Path. We want to help you stay safe online. Click on any course below to start learning. You can learn about Phishing, Red Flags, Secure Passwords, and Digital IDs." lang="en-US" />
                  </h2>
                  <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    We want to help you spot scams and stay completely safe online. Here are a few tips:
                    <br/><br/>
                    <strong>1. Change Language:</strong> Use the 'Globe' button at the top to switch to Marathi. <br/>
                    <strong>2. Hear Instructions:</strong> Click the 'Play' buttons anytime to hear the text out loud. <br/>
                    <strong>3. Start Learning:</strong> Click on any module below to begin your training.
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '3rem', paddingBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--card-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    द गार्डियन पाथ मध्ये आपले स्वागत आहे
                    <VoiceButton text="द गार्डियन पाथ मध्ये आपले स्वागत आहे. आम्ही तुम्हाला ऑनलाइन सुरक्षित राहण्यास मदत करू इच्छितो. खालीलपैकी कोणताही कोर्स सुरू करण्यासाठी त्यावर क्लिक करा." lang="mr-IN" />
                  </h2>
                  <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    आम्ही तुम्हाला ऑनलाइन फसवणूक ओळखण्यास आणि सुरक्षित राहण्यास मदत करू इच्छितो:
                    <br/><br/>
                    <strong>१. भाषा बदला:</strong> इंग्रजीमध्ये बदलण्यासाठी वरच्या 'ग्लोब' बटणाचा वापर करा. <br/>
                    <strong>२. सूचना ऐका:</strong> मोठ्याने आवाज ऐकण्यासाठी 'स्पीकर' बटणावर क्लिक करा. <br/>
                    <strong>३. शिकण्यास सुरुवात करा:</strong> खालील कोणत्याही कोर्सवर क्लिक करा आणि सुरुवात करा.
                  </p>
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                <button 
                  onClick={closePopup}
                  style={{ 
                    background: 'var(--accent-primary)', color: 'var(--card-text)', border: '2px solid #121629', padding: '1.5rem 3rem', 
                    borderRadius: '100px', fontSize: '1.6rem', fontWeight: 'bold', cursor: 'pointer',
                    width: '80%', marginTop: '0.5rem', boxShadow: '0 4px 6px rgba(18, 22, 41, 0.3)'
                  }}
                >
                  {lang === 'en' ? "I Understand, Get Started ➔" : "मला समजले, सुरू करा ➔"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
