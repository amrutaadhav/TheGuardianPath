import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldAlert, Lock, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import VoiceButton from '../components/VoiceButton';
import { useLanguage } from '../context/LanguageContext';
import modulesData from '../data/modulesData.json';

const quizDataRaw = modulesData.securepin;

export default function SecurePasswordModule() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const { markScenarioComplete, completedScenarios } = useProgress();

  const currentQuiz = selectedQuizIndex !== null ? quizDataRaw[selectedQuizIndex] : null;

  const handleGuess = (guessIsSecure) => {
    if (showResult) return;
    const isCorrect = guessIsSecure === currentQuiz.isSecure;
    setFeedback({
      isCorrect,
      message: currentQuiz.explanation
    });
    setShowResult(true);
    markScenarioComplete('securepin', selectedQuizIndex);
  };

  const handleNext = () => {
    setFeedback(null);
    setShowResult(false);
    setSelectedQuizIndex(null);
  };

  const completedCount = (completedScenarios['securepin'] || []).length;

  if (selectedQuizIndex === null) {
    return (
      <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '3rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={24} /> {t('goBack')}
        </button>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Lock size={40} color="#3B82F6" /> 50 PIN Evaluation Scenarios
            <VoiceButton text="50 PIN Evaluation Scenarios" />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569' }}>Evaluate 50 different PIN codes to determine if they are safe for banking.</p>
          <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: completedCount === 50 ? '#D1FAE5' : '#DBEAFE', padding: '0.5rem 1.5rem', borderRadius: '20px', color: completedCount === 50 ? '#047857' : '#1D4ED8', fontWeight: 'bold', fontSize: '1.4rem', border: completedCount === 50 ? '2px solid #10B981' : 'none' }}>
            {completedCount} / 50 Scenarios Completed
            {completedCount === 50 && <span>🏆 - MODULE MASTERED</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {quizDataRaw.map((quiz, index) => {
            const isFinished = (completedScenarios['securepin'] || []).includes(index);
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

      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', background: '#F8FAFC' }}>
        <Lock size={60} className="text-warning" style={{ margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Analyze this PIN <VoiceButton text="Is this a secure PIN?" />
        </h2>
        <p style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
          A user wants to set their banking PIN to the number below. Your job is to approve or reject it based on security best practices.
        </p>

        {/* Fake Phone Screen */}
        <div style={{ 
          background: '#0F172A', 
          borderRadius: '36px', 
          padding: '1.5rem', 
          maxWidth: '350px', 
          margin: '0 auto 2rem auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          border: '8px solid #334155'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '3rem 1rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#64748B', marginBottom: '2rem' }}>Enter Passcode</h3>
            
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '3rem' }}>
              {currentQuiz.pin.split('').map((digit, i) => (
                <div key={i} style={{ width: '35px', height: '45px', borderBottom: '4px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                  {digit}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', padding: '0 1rem' }}>
               <button 
                 onClick={() => handleGuess(false)}
                 disabled={showResult}
                 style={{ flex: 1, padding: '1rem', background: '#FEE2E2', color: '#DC2626', border: '2px solid #FCA5A5', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', cursor: showResult ? 'not-allowed' : 'pointer' }}
               >
                 Unsafe PIN
               </button>
               <button 
                 onClick={() => handleGuess(true)}
                 disabled={showResult}
                 style={{ flex: 1, padding: '1rem', background: '#D1FAE5', color: '#059669', border: '2px solid #6EE7B7', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', cursor: showResult ? 'not-allowed' : 'pointer' }}
               >
                 Secure PIN
               </button>
            </div>
          </div>
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
                marginTop: '2rem'
              }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: feedback.isCorrect ? '#047857' : '#B91C1C' }}>
                  {feedback.isCorrect ? <CheckCircle size={32} /> : <ShieldAlert size={32} />}
                  {feedback.isCorrect ? 'Spot On!' : 'Careful...'}
                </h3>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#000', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {feedback?.message?.[lang]}
                  <VoiceButton text={feedback?.message?.[lang] || ''} />
                </p>

                <button 
                  className="btn-primary" 
                  style={{ marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.4rem', margin: '2rem auto 0 auto' }}
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
