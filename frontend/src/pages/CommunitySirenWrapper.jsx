import React from 'react';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VoiceButton from '../components/VoiceButton';

export default function CommunitySirenWrapper() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '4rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={24} /> Back to Home
        </button>
      </div>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Megaphone size={40} color="#DC2626" /> Local Scam Alerts (Community Siren)
          <VoiceButton text="Local Scam Alerts" />
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#475569' }}>
          This integrated tool helps you report and view real-time scams in your neighborhood.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          flex: 1,
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '4px solid #1E293B'
        }}
      >
        <iframe 
          src="https://community-siren.vercel.app/" 
          width="100%" 
          height="100%" 
          style={{ border: 'none' }}
          title="Community Siren Scams Portal"
        />
      </motion.div>
    </div>
  );
}
