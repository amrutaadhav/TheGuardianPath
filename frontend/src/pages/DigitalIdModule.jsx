import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Verified, ShieldAlert, FileText, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import VoiceButton from '../components/VoiceButton';
import { useLanguage } from '../context/LanguageContext';
import modulesData from '../data/modulesData.json';

const quizDataRaw = modulesData.digitalid;

export default function DigitalIdModule() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const { markScenarioComplete, completedScenarios } = useProgress();

  const currentQuiz = selectedQuizIndex !== null ? quizDataRaw[selectedQuizIndex] : null;

  const handleGuess = (guess) => {
    if (showResult) return;
    const chosenOption = currentQuiz.options.find(opt => opt.id === guess);
    setFeedback({
      isCorrect: chosenOption.isCorrect,
      message: chosenOption.explanation
    });
    setShowResult(true);
    markScenarioComplete('digitalid', selectedQuizIndex);
  };

  const handleNext = () => {
    setFeedback(null);
    setShowResult(false);
    setSelectedQuizIndex(null);
  };

  const completedCount = (completedScenarios['digitalid'] || []).length;

  if (selectedQuizIndex === null) {
    return (
      <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '3rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={24} /> {t('goBack')}
        </button>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Verified size={40} color="#3B82F6" /> 50 Identity Scenarios
            <VoiceButton text="50 Identity Scenarios" />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569' }}>Practice recognizing when it is safe to upload or share your Government ID.</p>
          <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: completedCount === 50 ? '#D1FAE5' : '#DBEAFE', padding: '0.5rem 1.5rem', borderRadius: '20px', color: completedCount === 50 ? '#047857' : '#1D4ED8', fontWeight: 'bold', fontSize: '1.4rem', border: completedCount === 50 ? '2px solid #10B981' : 'none' }}>
            {completedCount} / 50 Scenarios Completed
            {completedCount === 50 && <span>🏆 - MODULE MASTERED</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {quizDataRaw.map((quiz, index) => {
            const isFinished = (completedScenarios['digitalid'] || []).includes(index);
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
    <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '3rem' }}>
      <button className="btn-secondary" onClick={handleNext} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={24} /> Return to Scenario Grid
      </button>

      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', background: '#F8FAFC' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', borderBottom: '3px solid #E2E8F0', paddingBottom: '2rem' }}>
          <div style={{ background: '#DBEAFE', padding: '1.5rem', borderRadius: '50%' }}>
            <FileText size={48} color="#1D4ED8" />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              {currentQuiz?.question?.[lang]} <VoiceButton text={currentQuiz?.question?.[lang] || ''} />
            </h2>
            <p style={{ fontSize: '1.4rem', color: '#475569', fontWeight: 'bold' }}>
              {currentQuiz?.scenario?.[lang]}
              <VoiceButton text={currentQuiz?.scenario?.[lang] || ''} />
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
           <button 
             onClick={() => handleGuess('safe')}
             disabled={showResult}
             className="btn-success"
             style={{ flex: 1, padding: '2rem', fontSize: '1.8rem', justifyContent: 'center', cursor: showResult ? 'not-allowed' : 'pointer' }}
           >
             <Verified size={32} /> Safe to Share
           </button>
           <button 
             onClick={() => handleGuess('unsafe')}
             disabled={showResult}
             className="btn-danger"
             style={{ flex: 1, padding: '2rem', fontSize: '1.8rem', justifyContent: 'center', cursor: showResult ? 'not-allowed' : 'pointer' }}
           >
             <ShieldAlert size={32} /> Unsafe Upload
           </button>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ 
                background: feedback.isCorrect ? '#D1FAE5' : '#FEE2E2',
                border: feedback.isCorrect ? '4px solid #059669' : '4px solid #DC2626',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: feedback.isCorrect ? '#047857' : '#B91C1C' }}>
                  {feedback.isCorrect ? <CheckCircle size={36} /> : <ShieldAlert size={36} />}
                  {feedback.isCorrect ? 'Excellent Judgment!' : 'Warning!'}
                </h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {feedback?.message?.[lang]}
                  <VoiceButton text={feedback?.message?.[lang] || ''} />
                </p>

                <button 
                  className="btn-primary" 
                  style={{ marginTop: '2rem', padding: '1.5rem 3rem', fontSize: '1.5rem', margin: '2rem auto 0 auto' }}
                  onClick={handleNext}
                >
                  Return to Scenario Grid
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
