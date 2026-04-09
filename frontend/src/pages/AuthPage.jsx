import React, { useState } from 'react';
import { ShieldCheck, User, Lock, ArrowRightCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import VoiceButton from '../components/VoiceButton';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();
  const { t, lang } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let response;
    if (isLogin) {
      response = await login(username, password);
    } else {
      response = await register(username, password);
    }

    if (!response.success) {
      setError(response.error || (lang === 'en' ? 'Invalid username or password. Please try again.' : 'चुकीचे वापरकर्तानाव किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.'));
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%', 
          maxWidth: '1000px', 
          background: '#FFFFFF',
          borderRadius: '30px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #E2E8F0'
        }}
      >
        {/* Left Side: Branding / Banner */}
        <div style={{ 
          flex: '1 1 400px', 
          background: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)', 
          padding: '4rem 3rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background circle */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', filter: 'blur(40px)' }}></div>
          
          <ShieldCheck size={80} color="#60A5FA" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }} />
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {t('loginTitle')}
            <VoiceButton text={t('loginTitle')} />
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#BFDBFE', fontWeight: '500', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
            {t('safeSpace')} <VoiceButton text={t('safeSpace')} />
          </p>
        </div>

        {/* Right Side: Form */}
        <div style={{ 
          flex: '1 1 400px', 
          padding: '4rem 3rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isLogin ? t('loginBtn') : t('signUpBtn')}
              <VoiceButton text={isLogin ? t('loginBtn') : t('signUpBtn')} />
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t('loginSub')}
              <VoiceButton text={t('loginSub')} />
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                style={{ background: '#FEF2F2', color: '#DC2626', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', border: '2px solid #FCA5A5', fontWeight: '600', fontSize: '1.3rem', textAlign: 'center' }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <User size={18} color="#3B82F6" /> {t('username')} <VoiceButton text={t('username')} />
              </label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '1.25rem 1.5rem', fontSize: '1.5rem', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none', transition: 'border-color 0.2s', background: '#F8FAFC', color: '#0F172A' }} 
                placeholder="e.g. John123"
                onFocus={(e) => e.target.style.borderColor = '#2563EB'}
                onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
              />
            </div>

            <div>
              <label style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Lock size={18} color="#3B82F6" /> {t('password')} <VoiceButton text={t('password')} />
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '1.25rem 1.5rem', paddingRight: '4.5rem', fontSize: '1.5rem', borderRadius: '12px', border: '2px solid #CBD5E1', outline: 'none', transition: 'border-color 0.2s', background: '#F8FAFC', color: '#0F172A' }} 
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = '#2563EB'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ fontSize: '1.6rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', background: '#2563EB', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)' }}>
              <ArrowRightCircle size={24} /> {isLogin ? t('loginBtn') : t('signUpBtn')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '1.4rem', color: '#64748B', fontWeight: '500' }}>
            {isLogin ? t('noAccount') : t('hasAccount')}{' '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              style={{ background: 'none', border: 'none', fontSize: '1.4rem', fontWeight: '700', cursor: 'pointer', color: '#2563EB', transition: 'color 0.2s' }}
            >
              {isLogin ? t('signUpBtn') : t('loginBtn')}
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
