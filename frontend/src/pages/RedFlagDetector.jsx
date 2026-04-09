import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, Smartphone, Mail, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import VoiceButton from '../components/VoiceButton';
import { useLanguage } from '../context/LanguageContext';

// Dynamically import the 50 generated text scenarios!
import modulesData from '../data/modulesData.json';

const quizDataRaw = modulesData.redflags;

export default function RedFlagDetector() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const { markScenarioComplete, completedScenarios } = useProgress();

  const currentQuiz = selectedQuizIndex !== null ? quizDataRaw[selectedQuizIndex] : null;

  // We can mark the entire module complete if they do a few, but let's leave it manual for now
  // or we can mark it complete when they finish ANY quiz just as a demo.
  React.useEffect(() => {
    if (score > 0 && selectedQuizIndex !== null) {
      markScenarioComplete('redflags', selectedQuizIndex);
    }
  }, [score, selectedQuizIndex, markScenarioComplete]);

  const handleSelect = (option) => {
    if (isAnswerRevealed) return; // Prevent clicking again
    setSelectedAnswer(option);
    setIsAnswerRevealed(true);

    if (option.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setSelectedQuizIndex(null); // Return to grid
    setScore(0);
  };

  const completedCount = (completedScenarios['redflags'] || []).length;

  // Render the quiz grid if no quiz is selected
  if (selectedQuizIndex === null) {
    return (
      <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '3rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={24} /> {t('goBack')}
        </button>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <AlertTriangle size={40} color="#3B82F6" /> 50 Practice Scenarios
            <VoiceButton text="50 Practice Scenarios" />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#475569' }}>Select a scenario card below to test your social engineering defense skills.</p>
          <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: completedCount === 50 ? '#D1FAE5' : '#DBEAFE', padding: '0.5rem 1.5rem', borderRadius: '20px', color: completedCount === 50 ? '#047857' : '#1D4ED8', fontWeight: 'bold', fontSize: '1.4rem', border: completedCount === 50 ? '2px solid #10B981' : 'none' }}>
            {completedCount} / 50 Scenarios Completed
            {completedCount === 50 && <span>🏆 - MODULE MASTERED</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {quizDataRaw.map((quiz, index) => {
            const isFinished = (completedScenarios['redflags'] || []).includes(index);
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
      <button className="btn-secondary" onClick={() => setSelectedQuizIndex(null)} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={24} /> Go Back Home
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, display: 'flex', alignItems: 'center' }}>
          The "Red Flag" Quiz
          <VoiceButton text="The Red Flag Quiz" />
        </h1>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: '#E2E8F0', padding: '0.5rem 1rem', borderRadius: '12px' }}>
          Scenario {selectedQuizIndex + 1}
        </div>
      </div>

      <div className="glass-panel" style={{ border: '4px solid var(--accent-primary)', marginBottom: '3rem' }}>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
          {currentQuiz.type === 'sms' ? <Smartphone size={40} className="text-primary"/> : <Mail size={40} className="text-warning"/>}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              {currentQuiz?.scenario?.[lang]}
              <VoiceButton text={currentQuiz?.scenario?.[lang] || ''} />
            </h2>
            <div style={{ 
              background: currentQuiz.type === 'sms' ? '#DCF8C6' : '#F1F5F9', // Whatsapp green for SMS
              padding: '2rem',
              borderRadius: '16px',
              border: '2px solid #CBD5E1',
              fontSize: '1.8rem',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              "{currentQuiz?.message?.[lang]}"
              <VoiceButton text={currentQuiz?.message?.[lang] || ''} />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '4px solid #E2E8F0', paddingTop: '2rem' }}>
          <h3 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: '#B45309', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={32} /> {currentQuiz?.question?.[lang]}
            <VoiceButton text={currentQuiz?.question?.[lang] || ''} />
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentQuiz.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                disabled={isAnswerRevealed}
                style={{
                  background: isAnswerRevealed 
                    ? (option.isCorrect ? '#D1FAE5' : (selectedAnswer?.id === option.id ? '#FEE2E2' : '#F8FAFC'))
                    : (selectedAnswer?.id === option.id ? '#DBEAFE' : '#FFFFFF'),
                  border: isAnswerRevealed
                    ? (option.isCorrect ? '4px solid var(--accent-success)' : (selectedAnswer?.id === option.id ? '4px solid var(--accent-danger)' : '4px solid #E2E8F0'))
                    : '4px solid #CBD5E1',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  padding: '2rem',
                  fontSize: '1.6rem',
                  color: '#000',
                  opacity: isAnswerRevealed && !option.isCorrect && selectedAnswer?.id !== option.id ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                 {isAnswerRevealed && option.isCorrect && <CheckCircle size={32} className="text-success" />}
                 {isAnswerRevealed && !option.isCorrect && selectedAnswer?.id === option.id && <XCircle size={32} className="text-danger" />}
                 {option?.text?.[lang]}
                 <VoiceButton text={option?.text?.[lang] || ''} />
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isAnswerRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ 
                background: selectedAnswer.isCorrect ? '#D1FAE5' : '#FEE2E2',
                border: selectedAnswer.isCorrect ? '4px solid var(--accent-success)' : '4px solid var(--accent-danger)',
                padding: '2rem',
                borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '2rem', marginBottom: '1rem', color: selectedAnswer.isCorrect ? 'var(--accent-success-hover)' : 'var(--accent-danger-hover)' }}>
                  {selectedAnswer.isCorrect ? "You Got It Right! 🎉" : "Not Quite. Let's learn why:"}
                </h4>
                <p style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: 0, color: '#000', display: 'flex', alignItems: 'center' }}>
                  {currentQuiz?.options?.find(opt => opt.isCorrect)?.explanation?.[lang]}
                  <VoiceButton text={currentQuiz?.options?.find(opt => opt.isCorrect)?.explanation?.[lang] || ''} />
                </p>

                <button 
                  className="btn-primary" 
                  style={{ marginTop: '2rem', padding: '1.5rem 3rem', fontSize: '1.5rem' }}
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
