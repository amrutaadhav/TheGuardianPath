import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShieldCheck, User, Globe, LogOut, Phone } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PhishingModule from './pages/PhishingModule';
import RedFlagDetector from './pages/RedFlagDetector';
import SecurePasswordModule from './pages/SecurePasswordModule';
import DigitalIdModule from './pages/DigitalIdModule';
import AiScamSimulator from './pages/AiScamSimulator';
import DeepfakeLab from './pages/DeepfakeLab';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Award, MailWarning, MessageSquareWarning, Lock, Verified as VerifiedIcon } from 'lucide-react';

function MainApp() {
  const { t, toggleLanguage, lang } = useLanguage();
  const { token, logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);


  return (
    <Router>
      <div className="app-container">

        {/* Happy Hues Navbar */}
        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          width: '100%',
          boxSizing: 'border-box',
          background: '#232946', /* Happy Hues Dark */
          borderBottom: '4px solid #121629', 
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 10px 30px rgba(18, 22, 41, 0.5)'
        }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            fontSize: '2.5rem', fontWeight: '800', color: '#fffffe', textDecoration: 'none'
          }}>
            <img src="/logo.png" alt="Guardian Path Logo" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
            <span>The Guardian Path</span>
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={toggleLanguage}
              title="Change Language"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: '#eebbc3', border: '2px solid #121629', padding: '0.75rem 1.5rem', borderRadius: '12px',
                color: '#232946', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', boxSizing: 'border-box'
              }}
            >
              <Globe size={20} /> {lang === 'en' ? 'मराठी' : 'English'}
            </button>

            <a 
              href="tel:1930"
              title="National Cyber Crime Reporting Helpline"
              style={{
                display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent-danger)', border: '2px solid #121629', padding: '0.65rem 1.2rem', borderRadius: '12px',
                color: '#fffffe', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', boxSizing: 'border-box', textDecoration: 'none', whiteSpace: 'nowrap'
              }}
            >
              <Phone size={20} color="#fffffe" /> 1930
            </a>

            {token ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/" style={{
                  display: 'flex', alignItems: 'center', boxSizing: 'border-box',
                  fontSize: '1.4rem', fontWeight: 'bold', color: '#232946', textDecoration: 'none',
                  padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#b8c1ec',
                  border: '2px solid #121629'
                }}>
                  {t('dashboard')}
                </Link>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: showDropdown ? '#d4939d' : '#eebbc3',
                      padding: '0.75rem', borderRadius: '50%', border: '2px solid #121629',
                      cursor: 'pointer', transition: 'background 0.2s', width: '48px', height: '48px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#d4939d'}
                    onMouseLeave={(e) => e.currentTarget.style.background = showDropdown ? '#d4939d' : '#eebbc3'}
                    title="Profile Menu"
                  >
                    <User size={24} color="#232946" />
                  </button>

                  {showDropdown && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      background: '#fffffe', borderRadius: '16px', padding: '1.5rem',
                      boxShadow: '0 10px 40px rgba(18, 22, 41, 0.5)', minWidth: '220px',
                      display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 1000,
                      border: '2px solid #121629'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #121629' }}>
                        <div style={{ background: '#b8c1ec', borderRadius: '50%', padding: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <User size={24} color="#232946" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#232946', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logged in as</span>
                          <span style={{ color: '#232946', fontWeight: 'bold', fontSize: '1.6rem' }}>
                            {user?.username}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => { setShowDropdown(false); logout(); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%',
                          background: '#eebbc3', color: '#232946', padding: '1rem',
                          borderRadius: '12px', border: '2px solid #121629', fontWeight: 'bold',
                          fontSize: '1.4rem', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#d4939d'; e.currentTarget.style.color = '#fffffe'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#eebbc3'; e.currentTarget.style.color = '#232946'; }}
                        title={t('logoutBtn')}
                      >
                        <LogOut size={20} /> {t('logoutBtn')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eebbc3', color: '#232946', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '2px solid #121629', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', boxShadow: '0 4px 6px rgba(18, 22, 41, 0.3)', boxSizing: 'border-box', transition: 'transform 0.1s' }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} title={t('loginBtn')}>
                <User size={20} /> {t('loginBtn')}
              </button>
            )}
          </div>
        </nav>

        <main className="main-content">
          {!token ? (
            <AuthPage />
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/module/phishing" element={<PhishingModule />} />
              <Route path="/module/redflags" element={<RedFlagDetector />} />
              <Route path="/module/secure-pin" element={<SecurePasswordModule />} />
              <Route path="/module/digital-id" element={<DigitalIdModule />} />
              <Route path="/module/ai-scam-simulator" element={<AiScamSimulator />} />
              <Route path="/module/deepfake-lab" element={<DeepfakeLab />} />
            </Routes>
          )}
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <MainApp />
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
