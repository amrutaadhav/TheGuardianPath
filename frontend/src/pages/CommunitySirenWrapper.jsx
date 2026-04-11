import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommunitySirenWrapper() {
  const navigate = useNavigate();

  return (
    <div style={{ height: 'calc(100vh - 85px)', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      
      {/* Floating Back Button */}
      <div style={{ background: '#232946', padding: '1rem', borderBottom: '2px solid #121629', display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: '#eebbc3',
            color: '#232946',
            border: '2px solid #121629',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          <ArrowLeft size={18} /> Exit Integration Mode
        </button>
        <span style={{ marginLeft: '1.5rem', color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>
          Secure Bridge: Active
        </span>
      </div>

      {/* Flush iFrame */}
      <div style={{ flex: 1, width: '100%', background: '#fff' }}>
        <iframe 
          src="https://community-siren.vercel.app/" 
          width="100%" 
          height="100%" 
          style={{ border: 'none', display: 'block' }}
          title="Community Siren Scams Portal"
        />
      </div>

    </div>
  );
}
