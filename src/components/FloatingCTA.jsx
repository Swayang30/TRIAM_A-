import React, { useState, useEffect, useRef } from 'react';

const amber = '#e48915';
const ink   = '#1b2a3a';
const cream = '#ffffff';

export default function FloatingCTA() {
  const [callMenuOpen, setCallMenuOpen] = useState(false);
  const callMenuRef = useRef(null);

  useEffect(() => {
    if (!callMenuOpen) return;
    const handler = (e) => {
      if (callMenuRef.current && !callMenuRef.current.contains(e.target)) {
        setCallMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [callMenuOpen]);

  return (
    <>
      {/* ── Bottom-right floating call button ── */}
      <div
        ref={callMenuRef}
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}
      >
        {callMenuOpen && (
          <div style={{
            background: ink,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '14px 16px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
            minWidth: '220px',
            animation: 'callPopIn 0.2s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: amber, marginBottom: '10px' }}>
              Call Us Directly
            </div>
            <a
              href="tel:18008433333"
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)',
                color: '#4ade80', textDecoration: 'none', marginBottom: '8px',
                fontSize: '14px', fontWeight: 700, fontFamily: "'Rajdhani', sans-serif",
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.12)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              1800 843 3333
            </a>
            <a
              href="tel:03340063942"
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.25)',
                color: amber, textDecoration: 'none',
                fontSize: '14px', fontWeight: 700, fontFamily: "'Rajdhani', sans-serif",
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(228,137,21,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(228,137,21,0.1)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              (033) 4006 3942
            </a>
          </div>
        )}

        <div style={{ position: 'relative', width: '56px', height: '56px' }}>
          {/* Ripple rings — only animate when menu is closed */}
          {!callMenuOpen && (
            <>
              <span className="call-fab-ring call-fab-ring-1" />
              <span className="call-fab-ring call-fab-ring-2" />
              <span className="call-fab-ring call-fab-ring-3" />
            </>
          )}
          <button
            onClick={() => setCallMenuOpen(v => !v)}
            aria-label="Call us"
            className={callMenuOpen ? 'call-fab call-fab--open' : 'call-fab'}
          >
            <svg
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              className={callMenuOpen ? '' : 'call-fab-icon'}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes callPopIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Ripple rings */
        .call-fab-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(22, 163, 74, 0.35);
          pointer-events: none;
        }
        .call-fab-ring-1 { animation: fabRipple 2.4s ease-out infinite; }
        .call-fab-ring-2 { animation: fabRipple 2.4s ease-out infinite 0.8s; }
        .call-fab-ring-3 { animation: fabRipple 2.4s ease-out infinite 1.6s; }

        @keyframes fabRipple {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0;   }
        }

        /* FAB button base */
        .call-fab {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #15803d);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(22,163,74,0.45);
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: fabFloat 3s ease-in-out infinite;
        }
        .call-fab:hover {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 10px 30px rgba(22,163,74,0.6);
          transform: scale(1.1);
          animation: none;
        }
        .call-fab--open {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 8px 28px rgba(22,163,74,0.55) !important;
          transform: scale(1.08) rotate(15deg) !important;
          animation: none !important;
        }

        /* Gentle float */
        @keyframes fabFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-4px) scale(1.03); }
        }

        /* Phone shake / ring */
        .call-fab-icon {
          animation: phoneRing 4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes phoneRing {
          0%, 60%, 100% { transform: rotate(0deg); }
          62%  { transform: rotate(-18deg); }
          64%  { transform: rotate(18deg); }
          66%  { transform: rotate(-14deg); }
          68%  { transform: rotate(14deg); }
          70%  { transform: rotate(-8deg); }
          72%  { transform: rotate(8deg); }
          74%  { transform: rotate(0deg); }
        }
      `}</style>
    </>
  );
}
