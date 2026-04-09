import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShieldCheck, User, Globe, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PhishingModule from './pages/PhishingModule';
import RedFlagDetector from './pages/RedFlagDetector';
import SecurePasswordModule from './pages/SecurePasswordModule';
import DigitalIdModule from './pages/DigitalIdModule';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

function MainApp() {
  const { t, toggleLanguage, lang } = useLanguage();
  const { token, logout, user } = useAuth();

  return (
    <Router>
      <div className="app-container">
        
        {/* Beautiful Deep Navy Navbar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 3rem',
          background: '#0F172A', /* Deep Slate/Navy */
          borderBottom: '4px solid #3B82F6', /* Vibrant Blue Accent */
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <Link to="/" style={{ 
            display: 'flex', alignItems: 'center', gap: '1rem', 
            fontSize: '2.5rem', fontWeight: '800', color: '#FFFFFF', textDecoration: 'none' 
          }}>
            <ShieldCheck size={48} color="#60A5FA" />
            <span>The Guardian Path</span>
          </Link>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={toggleLanguage}
              title="Change Language"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '12px',
                color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer'
              }}
            >
              <Globe size={24} /> {lang === 'en' ? 'मराठी' : 'English'}
            </button>
            
            {token && (
              <>
                <Link to="/" style={{ 
                  fontSize: '1.4rem', fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'none',
                  padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  {t('dashboard')}
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <User size={24} color="#FFFFFF" />
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>{user?.username}</span>
                  <button onClick={logout} style={{ background: 'none', border: 'none', color: '#FCA5A5', cursor: 'pointer', marginLeft: '0.5rem' }} title="Log out">
                    <LogOut size={24} />
                  </button>
                </div>
              </>
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
