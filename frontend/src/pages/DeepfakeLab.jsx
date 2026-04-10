import React from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceButton from '../components/VoiceButton';
import { useLanguage } from '../context/LanguageContext';

export default function DeepfakeLab() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="module-container animate-fade-in" style={{ padding: '0 2rem', paddingBottom: '0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ background: '#064E3B', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
              <Video color="#6EE7B7" size={36} />
            </div>
            {t('deepfakeLabTitle')}
            <VoiceButton text={t('deepfakeLabTitle') + ". " + t('deepfakeLabDesc')} />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569' }}>
            {t('deepfakeLabDesc')}
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="btn-secondary"
        >
          {t('backToDashboard')}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          flex: 1, 
          width: '100%',
          marginTop: '1rem',
          height: '100vh' /* Huge space to avoid iframe sliders */
        }}
      >
        <iframe 
          src="https://deepfake-guard-seven.vercel.app/" 
          style={{ width: '100%', height: '100%', minHeight: '800px', border: 'none' }}
          title="Deepfake Guard Simulator"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
}
