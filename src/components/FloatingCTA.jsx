import React, { useState } from 'react';

const amber = '#e48915';
const ink   = '#1b2a3a';
const cream = '#ffffff';

export default function FloatingCTA() {
  const [open,         setOpen]         = useState(false);
  const [name,         setName]         = useState('');
  const [phone,        setPhone]        = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"

  const reset = () => {
    setName(''); setPhone('');
    setSubmitStatus(null); setIsSubmitting(false);
  };

  const close = () => { setOpen(false); reset(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source:  'floating-cta',
          name:    name.trim(),
          phone:   phone.trim(),
          email:   '',
          city:    '',
          message: '',
          product: '',
          page:    window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Floating bar ── */}
      <div className="floating-cta-bar" id="floating-cta-bar">
        <a href="tel:18008433333" className="floating-cta-btn floating-cta-call" aria-label="Call Now">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Call Now</span>
        </a>

        <button onClick={() => setOpen(true)} className="floating-cta-btn floating-cta-enquire" aria-label="Enquire Now">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Enquire Now</span>
        </button>
      </div>

      {/* ── Modal overlay ── */}
      {open && (
        <div
          onClick={close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(8,15,24,0.72)', zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 80px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: ink, borderRadius: '20px', padding: '32px 28px 28px', width: '100%', maxWidth: '400px', boxShadow: '0 32px 80px rgba(0,0,0,0.45)', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Close */}
            <button
              onClick={close}
              style={{ position: 'absolute', top: '14px', right: '16px', background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ×
            </button>

            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(74,222,128,0.12)', border: '2px solid rgba(74,222,128,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4ade80', fontSize: '24px' }}>
                  <i className="fa-solid fa-check" />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 900, color: cream, textTransform: 'uppercase', marginBottom: '8px' }}>Got it!</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '0 0 20px' }}>Our team will call you shortly.</p>
                <button onClick={close} style={{ background: amber, color: cream, border: 'none', borderRadius: '8px', padding: '11px 28px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '6px' }}>Quick Enquiry</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 22px' }}>
                  We'll Call You Back
                </h3>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ width: '100%', boxSizing: 'border-box', padding: '13px 15px', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '9px', fontSize: '14px', color: cream, outline: 'none', marginBottom: '10px', display: 'block' }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{ width: '100%', boxSizing: 'border-box', padding: '13px 15px', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '9px', fontSize: '14px', color: cream, outline: 'none', marginBottom: error ? '10px' : '16px', display: 'block' }}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    style={{ width: '100%', padding: '14px', background: isSubmitting ? 'rgba(228,137,21,0.55)' : amber, color: cream, border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 800, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', boxShadow: '0 6px 20px rgba(228,137,21,0.28)' }}
                  >
                    {isSubmitting ? 'Sending...' : <><i className="fa-solid fa-phone" /> Request a Callback</>}
                  </button>
                  {submitStatus === 'success' && (
                    <p style={{ color: '#22c55e', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      ✅ Thank you! Our team will contact you shortly.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#ef4444', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      ❌ Something went wrong. Please call us directly.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
