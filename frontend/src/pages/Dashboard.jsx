import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MailWarning, Lock, Play, Star, BookOpen, MessageSquareWarning, Verified, Award, Bot, Megaphone, Video, Eye, Target, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import VoiceButton from '../components/VoiceButton';
import OnboardingPopup from '../components/OnboardingPopup';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { completedModules, completedScenarios, isComplete } = useProgress();

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
      <OnboardingPopup />

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', color: 'var(--accent-primary)' }}>
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
        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '50%', border: '4px solid var(--card-text)', position: 'relative' }}>
          <Star size={48} color="var(--accent-primary)" />
          {completedModules.length === totalModules && (
            <div style={{ position: 'absolute', top: -10, right: -10, background: 'var(--accent-primary)', borderRadius: '50%', padding: '0.2rem', border: '2px solid var(--card-text)' }}>
              <Award size={24} color="var(--card-text)" />
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

      {/* New Upcoming Labs Section */}
      <div style={{ marginBottom: '4rem', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '4px solid var(--accent-secondary)', paddingBottom: '1rem', color: 'var(--text-main)' }}>
          <Star className="text-warning" size={32} /> {t('innovationLabs')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', padding: '2.5rem', borderRadius: '24px', color: 'white', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }} whileHover={{ scale: 1.02 }} onClick={() => navigate('/module/ai-scam-simulator')}>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '16px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <Bot size={40} color="#818CF8" />
             </div>
             <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>{t('aiScamTitle')}</h3>
             <p style={{ fontSize: '1.4rem', color: '#C7D2FE', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>{t('aiScamDesc')}</p>
             <button style={{ background: '#4F46E5', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={(e) => { e.stopPropagation(); navigate('/module/ai-scam-simulator'); }}><Play size={18} /> {t('launchSimulator')}</button>
             <div style={{ position: 'absolute', top: '-5px', right: '-5px', opacity: 0.1, zIndex: 0 }}><Bot size={180} /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: '#232946', padding: '3rem', borderRadius: '24px', color: '#fffffe', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s', gridColumn: '1 / -1', border: '4px solid #121629' }} whileHover={{ scale: 1.01 }} onClick={() => navigate('/module/community-siren')}>
             <div style={{ background: '#eebbc3', padding: '1.5rem', borderRadius: '16px', width: 'fit-content', marginBottom: '1.5rem', zIndex: 1 }}>
                <Megaphone size={48} color="#232946" />
             </div>
             <h3 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 'bold', color: '#fffffe', zIndex: 1 }}>{t('communitySirenTitle')}</h3>
             <p style={{ fontSize: '1.6rem', color: '#b8c1ec', lineHeight: '1.6', marginBottom: '2rem', flex: 1, zIndex: 1, maxWidth: '800px' }}>{t('communitySirenDesc')}</p>
             <button style={{ background: '#eebbc3', color: '#232946', padding: '1.25rem 2rem', borderRadius: '12px', border: '2px solid #121629', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: 'fit-content', boxShadow: '0 4px 6px rgba(18, 22, 41, 0.3)' }} onClick={(e) => { e.stopPropagation(); navigate('/module/community-siren'); }}><Play size={20} /> Enter Alert Network</button>
             <div style={{ position: 'absolute', bottom: '-20px', right: '20px', opacity: 0.05, zIndex: 0 }}><Megaphone size={250} /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', padding: '2.5rem', borderRadius: '24px', color: 'white', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }} whileHover={{ scale: 1.02 }} onClick={() => navigate('/module/deepfake-lab')}>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '16px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <Video size={40} color="#6EE7B7" />
             </div>
             <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>{t('deepfakeLabTitle')}</h3>
             <p style={{ fontSize: '1.4rem', color: '#A7F3D0', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>{t('deepfakeLabDesc')}</p>
             <button style={{ background: '#059669', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={(e) => { e.stopPropagation(); navigate('/module/deepfake-lab'); }}><Play size={18} /> {t('launchSimulator')}</button>
             <div style={{ position: 'absolute', top: '-5px', right: '-5px', opacity: 0.1, zIndex: 0 }}><Video size={180} /></div>
          </motion.div>

        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '4px solid var(--accent-secondary)', paddingBottom: '1rem', color: 'var(--text-main)', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Eye className="text-secondary" size={32} /> {t('courses')}
          </div>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Swipe horizontally ➔)</span>
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
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(18, 22, 41, 0.3)' }}
                style={{ border: completed ? '4px solid var(--accent-success)' : '4px solid #121629', position: 'relative', overflow: 'hidden' }}
              >
                {/* Background Watermark Symbol */}
                <div style={{ position: 'absolute', right: '-10px', top: '10px', opacity: 0.05, zIndex: 0, pointerEvents: 'none', transform: 'rotate(15deg)' }}>
                   {React.cloneElement(mod.icon, { size: 150 })}
                </div>

                {completed && (
                  <span className="badge" style={{ background: 'var(--accent-success)', color: 'white', border: '2px solid #121629', zIndex: 1 }}>
                    <Verified size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                    Mastered
                  </span>
                )}

                <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start', zIndex: 1 }}>
                   <div style={{ 
                     flex: '0 0 90px', 
                     height: '90px', 
                     background: completed ? 'var(--accent-success)' : mod.color, 
                     borderRadius: '20px', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     border: '3px solid #121629',
                     boxShadow: '0 8px 0px rgba(18,22,41,1)'
                   }}>
                     {React.cloneElement(mod.icon, { size: 45, color: '#fffffe', strokeWidth: 1.5 })}
                   </div>
                   
                   <div style={{ flex: 1 }}>
                     <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--card-text)', fontWeight: '800', lineHeight: '1.2' }}>
                       {mod.title}
                       <VoiceButton text={mod.title + ". " + mod.description} />
                     </h3>
                     <p style={{ fontSize: '1.3rem', color: 'var(--card-text)', margin: 0, lineHeight: '1.4' }}>{mod.description}</p>
                   </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'var(--bg-color-main)', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '700', border: '2px solid #121629', zIndex: 1 }}>
                  <Target size={20} color="var(--accent-primary)" />
                  <span style={{ background: 'var(--accent-primary)', color: 'var(--card-text)', padding: '0.4rem 1rem', borderRadius: '8px', border: '2px solid #121629' }}>
                    {completedScenarios[mod.id]?.length || 0} / 20
                  </span> 
                  {t('practiceScenariosLabel')}
                </div>

                <button 
                  className={completed ? 'btn-success' : (mod.status === 'Ready' ? 'btn-primary' : 'btn-secondary')}
                  style={{ width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', zIndex: 1, border: '2px solid #121629' }}
                  onClick={() => mod.status === 'Ready' && navigate(mod.path)}
                  disabled={mod.status !== 'Ready'}
                >
                  {mod.status === 'Ready' ? (
                    <>
                      {completed ? <Sparkles size={24} /> : <Play size={24} />} 
                      {completed ? t('reviewModule') : t('begin')}
                      <ChevronRight size={20} />
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
