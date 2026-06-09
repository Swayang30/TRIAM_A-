import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import OnsiteAdviceForm from '../components/OnsiteAdviceForm';

/* ── SplitText — ReactBits-compatible (no motion dep) ── */
function SplitText({
  text       = '',
  delay      = 0.04,    // seconds between chars/words
  duration   = 0.55,    // seconds per element animation
  ease       = 'cubic-bezier(0.22,1,0.36,1)',
  splitType  = 'chars', // 'chars' | 'words'
  baseDelay  = 0,       // seconds before first element starts
  className  = '',
  style      = {},
  threshold  = 0.05,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const items = splitType === 'words'
    ? text.split(' ').filter(Boolean)
    : text.split('');

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', ...style }}>
      {items.map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity ${duration}s ${ease} ${(baseDelay + i * delay).toFixed(3)}s,
                       transform ${duration}s ${ease} ${(baseDelay + i * delay).toFixed(3)}s`,
          whiteSpace: 'pre',
        }}>
          {ch === ' ' ? ' ' : ch}
          {splitType === 'words' && i < items.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 80); return () => clearTimeout(t); }, []);

  const ink   = '#1b2a3a';
  const amber = '#e48915';
  const smoke = '#f4f3ee';
  const cream = '#ffffff';
  const muted = '#5a6a7a';

  return (
    <main style={{ background: smoke }}>
      <style>{`
        @keyframes c-pulse { 0%,100%{box-shadow:0 0 6px rgba(228,137,21,0.4)} 50%{box-shadow:0 0 18px rgba(228,137,21,0.9)} }
        .c-channel:hover { transform:translateY(-5px) !important; box-shadow:0 24px 56px rgba(27,42,58,0.13) !important; border-color:#d0c9be !important; }
        .c-channel:hover .c-ch-icon { background:rgba(228,137,21,0.15) !important; border-color:rgba(228,137,21,0.4) !important; }
        .c-map-btn:hover { background:#f5a520 !important; transform:translateY(-2px) !important; }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #080f18 0%, #0d1621 48%, #1b2a3a 100%)',
        position: 'relative', overflow: 'hidden', paddingTop: '90px',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* Top-right amber glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(228,137,21,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Bottom-left red glow */}
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(200,64,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Ghost watermark */}
        <div style={{ position: 'absolute', bottom: '-10px', right: '-20px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '240px', fontWeight: 900, color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-8px', textTransform: 'uppercase', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          CONTACT
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '52px' }}>
            <Link to="/" style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: amber }}>Contact Us</span>
          </div>

          {/* Main hero block */}
          <div className="contact-hero-grid" style={{ gap: '80px', alignItems: 'center', paddingBottom: '96px', opacity: heroIn ? 1 : 0, transform: heroIn ? 'none' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(228,137,21,0.12)', border: '1px solid rgba(228,137,21,0.25)', borderRadius: '50px', padding: '6px 16px 6px 12px', marginBottom: '28px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: amber, animation: 'c-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber }}>We're Ready to Help</span>
              </div>

              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(88px,12vw,136px)', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 0.82, letterSpacing: '-4px', textTransform: 'uppercase', marginBottom: '-14px', userSelect: 'none' }}>
                CONTACT
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(44px,6vw,76px)', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-2px', marginBottom: '20px' }}>
                GET IN<br /><span style={{ color: amber }}>TOUCH</span>
              </h1>
              <div style={{ width: '56px', height: '3px', background: `linear-gradient(90deg, #c8401a, ${amber})`, borderRadius: '2px', marginBottom: '22px' }} />
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.9, maxWidth: '420px', margin: '0 0 32px' }}>
                Our team is available Mon–Sat, 10 AM to 6 PM. Whether you're planning a major project, seeking technical advice, or looking to become a dealer — we'd love to hear from you.
              </p>

              {/* Quick actions */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href="tel:18008433333" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: amber, color: cream, padding: '12px 22px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(228,137,21,0.3)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f5a520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = amber; e.currentTarget.style.transform = 'none'; }}>
                  <i className="fa-solid fa-phone" style={{ fontSize: '12px' }} /> 1800 843 3333
                </a>
                <a href="#advice-form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '12px 22px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.15)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = cream; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
                  Book Free Advice
                </a>
              </div>
            </div>

            {/* Right — contact detail stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: 'fa-phone',        label: 'Phone',         value: '1800 843 3333',     href: 'tel:18008433333',                    sub: 'Toll-free · Mon–Sat' },
                { icon: 'fa-envelope',     label: 'Email',         value: 'info@triamtmt.com', href: 'mailto:info@triamtmt.com',           sub: 'Reply within 1 business day' },
                { icon: 'fa-clock',        label: 'Working Hours', value: 'Mon – Sat',         href: null,                                sub: '10:00 AM – 6:00 PM' },
                { icon: 'fa-location-dot', label: 'Address',       value: 'Bhowanipore, Kolkata', href: 'https://maps.google.com/?q=238+B,+AJC+Bose+Road,+Kolkata+700020', sub: '238 B, AJC Bose Road, 3rd Floor' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px 20px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '16px', flexShrink: 0 }}>
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '3px' }}>
                      <SplitText text={item.label} splitType="chars" delay={0.04} baseDelay={0.08 + i * 0.1} />
                    </div>
                    {item.href
                      ? <a href={item.href} target={i === 3 ? '_blank' : undefined} rel="noreferrer" style={{ fontSize: '15px', fontWeight: 700, color: cream, textDecoration: 'none', display: 'block' }}>
                          <SplitText text={item.value} splitType="chars" delay={0.032} baseDelay={0.18 + i * 0.1} />
                        </a>
                      : <div style={{ fontSize: '15px', fontWeight: 700, color: cream }}>
                          <SplitText text={item.value} splitType="chars" delay={0.032} baseDelay={0.18 + i * 0.1} />
                        </div>
                    }
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '1px' }}>
                      <SplitText text={item.sub} splitType="words" delay={0.07} baseDelay={0.32 + i * 0.1} />
                    </div>
                  </div>
                  {item.href && <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          THREE CHANNEL CARDS
      ══════════════════════════════════ */}
      <section style={{ background: smoke, padding: '0' }}>
        <div className="container" style={{ transform: 'translateY(-52px)', position: 'relative', zIndex: 10 }}>
          <div className="contact-channel-grid" style={{ gap: '16px' }}>
            {[
              { icon: 'fa-phone',         eyebrow: 'Call Us Anytime',    headline: '1800 843 3333',       sub: 'Toll-free · Mon–Sat · 10 AM – 6 PM', href: 'tel:18008433333',          cta: 'Call Now'        },
              { icon: 'fa-envelope',      eyebrow: 'Write to Us',        headline: 'info@triamtmt.com',   sub: 'We respond within 1 business day',   href: 'mailto:info@triamtmt.com', cta: 'Send Email'      },
              { icon: 'fa-location-dot',  eyebrow: 'Visit Our Office',   headline: 'Kolkata, West Bengal', sub: '238 B, AJC Bose Road, 3rd Floor',   href: 'https://maps.google.com/?q=238+B,+AJC+Bose+Road,+Kolkata+700020', cta: 'Get Directions' },
            ].map((ch, i) => (
              <a key={i} href={ch.href} target={i === 2 ? '_blank' : undefined} rel="noreferrer" className="c-channel" style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: cream, border: '1px solid #ddd8cf', borderRadius: '18px', padding: '28px 26px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(27,42,58,0.07)', transition: 'all 0.25s ease' }}>
                <div className="c-ch-icon" style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(228,137,21,0.09)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '22px', transition: 'all 0.25s ease' }}>
                  <i className={`fa-solid ${ch.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a9a9a', marginBottom: '5px' }}>{ch.eyebrow}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: ink, lineHeight: 1.2, marginBottom: '4px' }}>{ch.headline}</div>
                  <div style={{ fontSize: '12px', color: muted }}>{ch.sub}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: amber, borderTop: '1px solid #f0ebe3', paddingTop: '14px', marginTop: 'auto' }}>
                  {ch.cta} <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MAP + OFFICE DETAILS
      ══════════════════════════════════ */}
      <section style={{ padding: '0 0 88px', background: smoke }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ width: '22px', height: '2px', background: amber, borderRadius: '1px' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: amber, fontFamily: "'DM Sans', sans-serif" }}>Corporate Office</span>
              <span style={{ width: '22px', height: '2px', background: amber, borderRadius: '1px' }} />
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 900, color: ink, textTransform: 'uppercase', lineHeight: 0.95, margin: 0 }}>
              Find Us on the Map
            </h2>
          </div>

          <div className="contact-map-grid" style={{ gap: '20px', alignItems: 'stretch' }}>

            {/* Left: office card */}
            <div style={{ background: ink, borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '30px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '8px' }}>Triam Amit Metaliks</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 0.92, margin: 0 }}>
                  Corporate<br />Office
                </h3>
              </div>

              <div style={{ padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: 'fa-phone',        label: 'Phone',    value: '1800 843 3333',     href: 'tel:18008433333'  },
                  { icon: 'fa-envelope',     label: 'Email',    value: 'info@triamtmt.com', href: 'mailto:info@triamtmt.com' },
                  { icon: 'fa-clock',        label: 'Hours',    value: 'Mon–Sat · 10 AM – 6 PM', href: null },
                  { icon: 'fa-location-dot', label: 'Address',  value: '238 B, AJC Bose Road, 3rd Floor, Bhowanipore, Kolkata – 700020, WB', href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>
                      <i className={`fa-solid ${item.icon}`} />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '4px' }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: '14px', fontWeight: 700, color: cream, textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, margin: 0 }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '0 32px 28px' }}>
                <a
                  href="https://maps.google.com/?q=238+B,+AJC+Bose+Road,+Kolkata+700020"
                  target="_blank" rel="noreferrer" className="c-map-btn"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', background: amber, color: cream, borderRadius: '10px', padding: '13px 20px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, boxShadow: '0 6px 20px rgba(228,137,21,0.28)', transition: 'all 0.25s ease' }}
                >
                  <i className="fa-solid fa-map-location-dot" style={{ fontSize: '14px' }} />
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Right: map iframe */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid #ddd8cf', boxShadow: '0 8px 32px rgba(27,42,58,0.08)', minHeight: '480px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7370.0374129429065!2d88.348565!3d22.540972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277160eba3e0d%3A0x1814953910ade550!2s238B%2C%20Acharya%20Jagdish%20Chandra%20Bose%20Rd%2C%20Sreepally%2C%20Bhowanipore%2C%20Kolkata%2C%20West%20Bengal%20700020%2C%20India!5e0!3m2!1sen!2sus!4v1772177549487!5m2!1sen!2sus"
                width="100%" height="100%"
                style={{ border: 0, minHeight: '480px', display: 'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Triam TMT Office Location Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ Inquiry Form ══ */}
      <OnsiteAdviceForm source="contact" />

    </main>
  );
}
