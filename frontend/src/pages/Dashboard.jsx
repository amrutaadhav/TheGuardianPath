import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MailWarning, Lock, Play, Star, BookOpen, MessageSquareWarning, Verified, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import VoiceButton from '../components/VoiceButton';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { completedModules, isComplete } = useProgress();

  const totalModules = 4;

  const modules = [
    {
      id: 'phishing',
      title: t('phishingTitle'),
      description: t('phishingDesc'),
      icon: <MailWarning size={40} />,
      color: 'var(--accent-primary)',
      status: 'Ready',
      path: '/module/phishing'
    },
    {
      id: 'redflags',
      title: t('redflagsTitle'),
      description: t('redflagsDesc'),
      icon: <MessageSquareWarning size={40} />,
      color: 'var(--accent-danger)',
      status: 'Ready',
      path: '/module/redflags'
    },
    {
      id: 'securepin',
      title: t('securepinTitle'),
      description: t('securepinDesc'),
      icon: <Lock size={40} />,
      color: 'var(--accent-warning)',
      status: 'Ready',
      path: '/module/secure-pin'
    },
    {
      id: 'digitalid',
      title: t('digitalidTitle'),
      description: t('digitalidDesc'),
      icon: <Verified size={40} />,
      color: 'var(--accent-success)',
      status: 'Ready',
      path: '/module/digital-id'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center' }}>
          {t('welcome')}
          <VoiceButton text={t('welcome') + ". " + t('safeSpace')} />
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '900px', fontWeight: '500' }}>
          {t('safeSpace')}
        </p>
      </div>

      <motion.div 
        className="progress-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '50%', border: '4px solid #000', position: 'relative' }}>
          <Star size={48} color="var(--accent-primary)" />
          {completedModules.length === totalModules && (
            <div style={{ position: 'absolute', top: -10, right: -10, background: 'gold', borderRadius: '50%', padding: '0.2rem', border: '2px solid black' }}>
              <Award size={24} color="#000" />
            </div>
          )}
        </div>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            {t('score')}: {completedModules.length} / {totalModules} {completedModules.length === totalModules ? "🏆" : ""}
            <VoiceButton text={`${t('score')} is ${completedModules.length} out of ${totalModules}.`} />
          </h2>
          <p style={{ fontSize: '1.2rem' }}>
            {completedModules.length === totalModules ? "You have mastered all safety skills!" : t('startHere')}
          </p>
        </div>
      </motion.div>

      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '4px solid #E2E8F0', paddingBottom: '1rem' }}>
          <BookOpen className="text-secondary" size={32} /> {t('courses')}
        </h2>
        
        <div className="module-grid">
          {modules.map((mod, index) => {
            const completed = isComplete(mod.id);
            return (
              <motion.div 
                key={mod.id} 
                className="module-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ border: completed ? '3px solid var(--accent-success)' : '3px solid #CBD5E1' }}
              >
                {completed && (
                  <span className="badge" style={{ background: 'var(--accent-success)', color: 'white', border: 'none' }}>
                    <Verified size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                    Mastered
                  </span>
                )}
                <div className="module-icon-wrap" style={{ 
                  background: completed ? '#D1FAE5' : `${mod.color}15`, 
                  color: completed ? 'var(--accent-success)' : mod.color, 
                  border: `3px solid ${completed ? 'var(--accent-success)' : mod.color}` 
                }}>
                  {mod.icon}
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {mod.title}
                  <VoiceButton text={mod.title + ". " + mod.description} />
                </h3>
                <p style={{ flex: 1, fontSize: '1.2rem' }}>{mod.description}</p>
                
                <button 
                  className={completed ? 'btn-success' : (mod.status === 'Ready' ? 'btn-primary' : 'btn-secondary')}
                  style={{ width: '100%', marginTop: '2rem' }}
                  onClick={() => mod.status === 'Ready' && navigate(mod.path)}
                  disabled={mod.status !== 'Ready'}
                >
                  {mod.status === 'Ready' ? (
                    <>
                      <Play size={24} /> {completed ? "Review Module" : t('begin')}
                    </>
                  ) : (
                    t('comingSoon')
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
