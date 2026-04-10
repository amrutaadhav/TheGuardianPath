import React from 'react';
import { ShieldAlert, Heart, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{
      background: '#232946', /* Happy Hues Dark */
      color: '#fffffe',
      borderTop: '4px solid #121629', /* Deep Stroke */
      padding: '2rem', /* Matches navbar side padding */
      width: '100%',
      boxSizing: 'border-box',
      marginTop: 'auto',
      boxShadow: '0 -10px 40px rgba(18, 22, 41, 0.5)'
    }}>
      <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>

        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#fffffe' }}>
            <ShieldAlert size={24} color="#eebbc3" /> The Guardian Path
          </h3>
          <p style={{ fontSize: '1.2rem', color: '#b8c1ec', maxWidth: '400px', margin: 0 }}>
            {t('safeSpace')}
          </p>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fffffe' }}>{t('helpNow')}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li style={{ fontSize: '1.2rem', color: '#b8c1ec' }}>
              {t('panicText')}
            </li>
          </ul>
        </div>

      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px solid #121629', fontSize: '1rem', color: '#b8c1ec' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: 0 }}>
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
}
