import React from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceButton from '../components/VoiceButton';

export default function DeepfakeLab() {
  const navigate = useNavigate();

  return (
    <div className="module-container animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '4rem', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ background: '#064E3B', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
              <Video color="#6EE7B7" size={36} />
            </div>
            Deepfake Lab
            <VoiceButton text="Deepfake Lab. Interactive simulation to spot AI generated videos and voices." />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569' }}>
            Train your eyes to spot AI-generated videos and voices trying to impersonate family members.
          </p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="btn-secondary"
        >
          Back to Dashboard
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          flex: 1, 
          background: 'white', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '4px solid #F1F5F9'
        }}
      >
        <iframe 
          src="https://deepfake-guard-seven.vercel.app/" 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Deepfake Guard Simulator"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
}
