import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, MailWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import VoiceButton from '../components/VoiceButton';
import modulesData from '../data/modulesData.json';

const quizDataRaw = modulesData.phishing;

export default function PhishingModule() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [foundStatus, setFoundStatus] = useState({});
  const [activeInfo, setActiveInfo] = useState(null);
  const { markScenarioComplete, completedScenarios } = useProgress();

  const currentQuiz = selectedQuizIndex !== null ? quizDataRaw[selectedQuizIndex] : null;
  const risks = currentQuiz ? currentQuiz.risks : [];

  const handleRiskClick = (id) => {
    setFoundStatus(prev => ({ ...prev, [id]: true }));
    const risk = risks.find(r => r.id === id);
    setActiveInfo(risk);
    setTimeout(() => {
      document.getElementById('learning-insights')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const foundCount = Object.values(foundStatus).filter(Boolean).length;
  const isComplete = risks.length > 0 && foundCount === risks.length;

  React.useEffect(() => {
    if (isComplete && selectedQuizIndex !== null) {
      markScenarioComplete('phishing', selectedQuizIndex);
    }
  }, [isComplete, selectedQuizIndex, markScenarioComplete]);

  const resetAndReturn = () => {
    setFoundStatus({});
    setActiveInfo(null);
    setSelectedQuizIndex(null);
  };

  const completedCount = (completedScenarios['phishing'] || []).length;

  if (selectedQuizIndex === null) {
    return (
      <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '3rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={24} /> {t('goBack')}
        </button>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <MailWarning size={40} color="#3B82F6" /> {t('scenarioTitle')}
            <VoiceButton text={t('scenarioTitle')} />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {t('scenarioDesc')}
            <VoiceButton text={t('scenarioDesc')} />
          </p>
          <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: completedCount === 50 ? '#D1FAE5' : '#DBEAFE', padding: '0.5rem 1.5rem', borderRadius: '20px', color: completedCount === 50 ? '#047857' : '#1D4ED8', fontWeight: 'bold', fontSize: '1.4rem', border: completedCount === 50 ? '2px solid #10B981' : 'none' }}>
            {completedCount} / 50 Scenarios Completed
            {completedCount === 50 && <span>🏆 - MODULE MASTERED</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {quizDataRaw.map((quiz, index) => {
            const isFinished = (completedScenarios['phishing'] || []).includes(index);
            return (
              <motion.div
                key={quiz.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedQuizIndex(index)}
                style={{
                  background: isFinished ? '#D1FAE5' : '#FFFFFF',
                  border: isFinished ? '2px solid #10B981' : '2px solid #CBD5E1',
                  borderRadius: '16px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: isFinished ? '#047857' : '#1E293B',
                  transition: 'border-color 0.2s',
                  position: 'relative'
                }}
              >
                {isFinished && <CheckCircle size={20} color="#059669" style={{ position: 'absolute', top: '10px', right: '10px' }} />}
                Scenario {index + 1}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem' }}>
      <button className="btn-secondary" onClick={resetAndReturn} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={24} /> {t('goBack')}
      </button>

      <div className="glass-panel" style={{ marginBottom: '3rem', border: '4px solid var(--accent-warning)', background: '#FEF3C7' }}>
        <h2 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#B45309' }}>
          <AlertTriangle size={40} /> {t('instructionsTitle')}
          <VoiceButton text={t('instructionsTitle')} />
        </h2>
        <p style={{ fontSize: '1.5rem', color: '#000', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {t('instructionsDesc')}
          <VoiceButton text={t('instructionsDesc')} />
        </p>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(foundCount / risks.length) * 100}%` }}></div>
        </div>
        <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
          You have found: {foundCount} out of {risks.length} mistakes
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Email Simulator */}
        <div className="sandbox-environment">
          <div className="sandbox-header">
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{t('inbox')}</span>
          </div>
          
          <div className="sandbox-content">
            <div className="mock-email">
              <div className="mock-email-header">
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Subject: {currentQuiz?.subject?.[lang]}
                  <VoiceButton text={currentQuiz?.subject?.[lang] || ''} />
                </div>
                <div style={{ fontSize: '1.4rem', color: '#000', marginBottom: '1rem' }}>
                  <strong>From: </strong> Security Support &lt;
                  <span 
                    className={`clickable-risk ${foundStatus['sender'] ? 'identified' : ''}`}
                    onClick={() => handleRiskClick('sender')}
                  >
                    {risks.find(r => r.id === 'sender')?.text}
                  </span>&gt;
                  <VoiceButton text={`From Security Support ${risks.find(r => r.id === 'sender')?.text}`} />
                </div>
                <div style={{ fontSize: '1.2rem', color: '#555' }}>Sent Today at 10:23 AM</div>
              </div>

              <div style={{ lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span 
                    className={`clickable-risk ${foundStatus['greeting'] ? 'identified' : ''}`}
                    onClick={() => handleRiskClick('greeting')}
                  >
                    {risks.find(r => r.id === 'greeting')?.text?.[lang]}
                  </span>
                  <VoiceButton text={risks.find(r => r.id === 'greeting')?.text?.[lang]} />
                </p>
                
                <p style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {currentQuiz?.body?.[lang]}
                  <VoiceButton text={currentQuiz?.body?.[lang] || ''} />
                </p>

                <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem' }}>
                  <span 
                    className={`clickable-risk ${foundStatus['link'] ? 'identified' : ''}`}
                    onClick={() => handleRiskClick('link')}
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#1D4ED8', 
                      color: 'white', 
                      padding: '1.5rem 3rem', 
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '1.8rem',
                      border: '4px dashed white',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    {risks.find(r => r.id === 'link')?.text?.[lang]}
                    <VoiceButton text={risks.find(r => r.id === 'link')?.text?.[lang] || ''} />
                  </span>
                </div>

                <p style={{ color: '#555', fontSize: '1.2rem' }}>
                  Thank you,<br/>
                  The Security Department
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div id="learning-insights" className="glass-panel" style={{ background: '#F8FAFC' }}>
          {isComplete ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <CheckCircle size={80} className="text-success" style={{ margin: '0 auto 1.5rem auto' }} />
              <h3 style={{ fontSize: '3rem', color: 'var(--accent-success)', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                {t('greatJob')} <VoiceButton text={t('greatJob')} />
              </h3>
              <p style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                {t('greatJobDesc')} <VoiceButton text={t('greatJobDesc')} />
              </p>
              <button className="btn-success" style={{ width: '100%', maxWidth: '400px' }} onClick={resetAndReturn}>
                {t('reviewMore')}
              </button>
            </motion.div>
          ) : (
            <div>
              <h3 style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '4px solid #CBD5E1', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <Info size={36} className="text-primary" /> {t('whatFound')} <VoiceButton text={t('whatFound')} />
              </h3>
              
              {activeInfo ? (
                <motion.div key={activeInfo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#D1FAE5', padding: '1.5rem', borderRadius: '12px', border: '4px solid var(--accent-success)' }}>
                  <h4 style={{ color: 'var(--accent-success-hover)', fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t('correct')} <VoiceButton text={t('correct')} />
                  </h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#000', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {activeInfo?.explanation?.[lang]}
                    <VoiceButton text={activeInfo?.explanation?.[lang] || ''} />
                  </p>
                </motion.div>
              ) : (
                <p style={{ fontSize: '1.5rem', color: '#555', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {t('clickMistakesInfo')} <VoiceButton text={t('clickMistakesInfo')} />
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
