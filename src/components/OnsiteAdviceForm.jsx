import React, { useState, useEffect, useRef } from 'react';

/* ── Gear SVG ── */
const GearSvgPath = () => (
  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.67.07-1.08s-.03-.75-.07-1.08l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1.08s.03.75.07 1.08l-2.11 1.62c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.62z" />
);

/* ── GradientText — ReactBits-compatible ── */
function GradientText({
  children,
  colors        = ['#e48915', '#f5c842', '#c8401a', '#e48915'],
  animationSpeed = 7,
  showBorder    = false,
  className     = '',
  style         = {},
}) {
  return (
    <>
      <style>{`@keyframes oaf-grad { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }`}</style>
      <span
        className={className}
        style={{
          background: `linear-gradient(90deg, ${colors.join(', ')})`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: `oaf-grad ${animationSpeed}s linear infinite`,
          display: 'inline',
          ...style,
        }}
      >
        {children}
      </span>
    </>
  );
}

/* ── TextType cycling panel for benefits ── */
function BenefitsPanel({ benefits }) {
  const [idx,         setIdx]         = useState(0);
  const [phase,       setPhase]       = useState('typing');   // 'typing' | 'fading' | 'deleting'
  const [displayText, setDisplayText] = useState('');
  const [showDesc,    setShowDesc]    = useState(false);

  const TYPING_SPEED  = 90;
  const DELETING_SPEED = 42;
  const PAUSE_MS      = 3800;
  const FADE_MS       = 380;
  const amber = '#e48915';
  const cream = '#ffffff';

  useEffect(() => {
    const title = benefits[idx].title;
    let timer;
    if (phase === 'typing') {
      if (displayText.length < title.length) {
        timer = setTimeout(() => setDisplayText(title.slice(0, displayText.length + 1)), TYPING_SPEED);
      } else {
        setShowDesc(true);
        timer = setTimeout(() => setPhase('fading'), PAUSE_MS);
      }
    } else if (phase === 'fading') {
      setShowDesc(false);
      timer = setTimeout(() => setPhase('deleting'), FADE_MS);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timer = setTimeout(() => setDisplayText(t => t.slice(0, -1)), DELETING_SPEED);
      } else {
        setIdx(n => (n + 1) % benefits.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, displayText, idx, benefits]);

  const jumpTo = (k) => { setIdx(k); setPhase('typing'); setDisplayText(''); setShowDesc(false); };

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', overflow: 'hidden' }}>
      <style>{`
        @keyframes oaf-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes oaf-pulse  { 0%,100%{box-shadow:0 0 4px rgba(74,222,128,0.4)} 50%{box-shadow:0 0 12px rgba(74,222,128,0.85)} }
        .oaf-dot:hover { opacity:0.9 !important; }
      `}</style>

      {/* macOS chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57','#ffbd2e','#28c840'].map((c, k) => (
            <div key={k} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.32)', fontFamily: 'monospace' }}>
          benefits.system — live
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'oaf-pulse 2.5s ease-in-out infinite' }} />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)' }}>active</span>
        </div>
      </div>

      {/* Typed content */}
      <div style={{ padding: '26px 24px', minHeight: '172px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, marginBottom: '16px', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><GearSvgPath /></svg>
        </div>
        <div className="oaf-benefits-title" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '30px', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.5px', minHeight: '68px' }}>
          {displayText}
          <span style={{ display: 'inline-block', width: '2px', height: '1em', background: amber, marginLeft: '3px', verticalAlign: 'middle', animation: 'oaf-cursor 0.85s step-end infinite' }} />
        </div>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginTop: '10px', minHeight: '42px', opacity: showDesc ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}>
          {benefits[idx].desc}
        </div>
      </div>

      {/* Footer — dots + counter */}
      <div style={{ padding: '10px 24px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {benefits.map((_, k) => (
            <div key={k} onClick={() => jumpTo(k)} className="oaf-dot" style={{ width: k === idx ? '22px' : '8px', height: '8px', borderRadius: '4px', background: k === idx ? amber : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease', cursor: 'pointer' }} />
          ))}
        </div>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
          {String(idx + 1).padStart(2, '0')} / {String(benefits.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

/* ── Data ── */
const benefits = [
  { title: '100% Tested',                      desc: 'Resulting in controlled chemical composition of the TMT' },
  { title: 'Controlled Sulphur & Phosphorus',  desc: 'Leads to better corrosion control and a tougher, more ductile bar' },
  { title: 'Conversion Agent of SAIL',         desc: 'Proof of premium quality — authorised by Steel Authority of India Limited' },
  { title: 'Flexibility Higher than Standard', desc: 'Safeguards from earthquakes and other natural calamities' },
  { title: 'Greater AR (Area of Rib) Value',   desc: 'Resulting in superior bonding between steel and concrete' },
];

const badges = ['ISI Certified', 'IS 1786:2008', 'ISO 9001', 'FE 550D'];

/* ── Main component ── */
export default function OnsiteAdviceForm({ source = 'onsite-advice' }) {
  const [formData,     setFormData]     = useState({ fullName: '', email: '', phone: '', inquiry: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          name:    formData.fullName,
          phone:   formData.phone,
          email:   formData.email    || '',
          city:    '',
          message: formData.message  || '',
          product: formData.inquiry  || '',
          page:    window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', phone: '', inquiry: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const amber = '#e48915';
  const cream = '#ffffff';
  const ink   = '#1b2a3a';

  const iStyle = (name) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '14px 16px',
    background: focusedField === name ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
    border: `1.5px solid ${focusedField === name ? amber : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    fontSize: '14px', color: cream,
    outline: 'none', display: 'block',
    transition: 'all 0.2s',
    boxShadow: focusedField === name ? '0 0 0 3px rgba(228,137,21,0.1)' : 'none',
    marginBottom: '12px',
  });

  return (
    <section
      id="advice-form"
      style={{ background: '#060d14', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        #advice-form input::placeholder,
        #advice-form textarea::placeholder { color: rgba(255,255,255,0.32); }
        .oaf-submit:hover { background:#f5a520 !important; transform:translateY(-2px) !important; }

        @media (max-width: 768px) {
          #advice-form { padding: 64px 0 48px !important; margin-bottom: 40px; }

          .oaf-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .oaf-left-col { text-align: left; }
          .oaf-left-col p { max-width: 100% !important; }

          .oaf-form-card {
            border-radius: 16px !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
          }

          .oaf-field-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          .oaf-benefits-title {
            font-size: clamp(18px, 5.5vw, 26px) !important;
            white-space: normal !important;
            word-break: break-word;
            overflow-wrap: break-word;
            min-height: auto !important;
          }

          #advice-form input,
          #advice-form textarea {
            min-height: 48px;
            font-size: 16px !important;
          }

          #advice-form .oaf-submit {
            min-height: 52px !important;
          }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
      {/* Bottom-right amber glow */}
      <div style={{ position: 'absolute', bottom: '-80px', right: '-60px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(228,137,21,0.08) 0%, transparent 68%)', pointerEvents: 'none' }} />
      {/* Top-left red glow */}
      <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,64,26,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="oaf-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>

          {/* ── LEFT: Benefits ── */}
          <div className="oaf-left-col">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ width: '20px', height: '2px', background: amber, borderRadius: '1px', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: amber, fontFamily: "'DM Sans', sans-serif" }}>Why Choose Us</span>
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,4vw,50px)', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: '-0.5px', marginBottom: '12px' }}>
              The TRIAM A+<br /><span style={{ color: amber }}>Difference</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '28px', maxWidth: '380px' }}>
              Every bar that leaves our facility meets the gold standard — chemically controlled, mechanically superior, and structurally proven.
            </p>

            {/* TextType cycling panel */}
            <BenefitsPanel benefits={benefits} />

            {/* GradientText certification badges */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
              {badges.map((badge, i) => (
                <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(228,137,21,0.08)', border: '1px solid rgba(228,137,21,0.2)', borderRadius: '6px', padding: '6px 13px' }}>
                  <i className="fa-solid fa-certificate" style={{ color: amber, fontSize: '10px' }} />
                  <GradientText
                    colors={['#e48915', '#f5c842', '#ffa940', '#c8401a', '#e48915']}
                    animationSpeed={6}
                    style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}
                  >
                    {badge}
                  </GradientText>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form card ── */}
          <div className="oaf-form-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '20px', overflow: 'hidden' }}>

            {/* Card header */}
            <div style={{ background: `linear-gradient(135deg, ${ink} 0%, #0d1a27 100%)`, padding: '28px 32px', borderBottom: `3px solid ${amber}` }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '8px' }}>Free Consultation</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '26px', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 0.95, margin: 0 }}>
                Book Free Onsite Advice<br />From Our Experts
              </h3>
            </div>

            {/* Form body */}
            <div style={{ padding: '28px 32px' }}>
              {submitStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#4ade80', fontSize: '28px' }}>
                    <i className="fa-solid fa-check" />
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 900, color: cream, textTransform: 'uppercase', marginBottom: '8px' }}>Inquiry Sent!</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>We'll be in touch within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="oaf-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                    <input type="text"  name="fullName" placeholder="Full Name *"    value={formData.fullName} onChange={handleChange} required onFocus={() => setFocusedField('fullName')} onBlur={() => setFocusedField(null)} style={iStyle('fullName')} />
                    <input type="text"  name="phone"    placeholder="Phone Number *" value={formData.phone}    onChange={handleChange} required onFocus={() => setFocusedField('phone')}    onBlur={() => setFocusedField(null)} style={iStyle('phone')} />
                  </div>
                  <input type="email" name="email"   placeholder="Email Address"     value={formData.email}   onChange={handleChange} onFocus={() => setFocusedField('email')}   onBlur={() => setFocusedField(null)} style={iStyle('email')} />
                  <input type="text"  name="inquiry" placeholder="Your Inquiry Topic" value={formData.inquiry} onChange={handleChange} onFocus={() => setFocusedField('inquiry')} onBlur={() => setFocusedField(null)} style={iStyle('inquiry')} />
                  <textarea name="message" placeholder="Write Your Message" value={formData.message} onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} style={{ ...iStyle('message'), height: '108px', resize: 'none' }} />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="oaf-submit"
                    style={{ width: '100%', padding: '15px', background: isSubmitting ? 'rgba(228,137,21,0.6)' : amber, color: cream, border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 800, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 6px 20px rgba(228,137,21,0.3)', transition: 'all 0.25s ease', marginTop: '4px' }}
                  >
                    {isSubmitting ? 'Sending...' : <><i className="fa-solid fa-paper-plane" style={{ fontSize: '14px' }} /> Send Inquiry</>}
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
                    <i className="fa-solid fa-lock" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px' }} />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>Your information is private and never shared.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
