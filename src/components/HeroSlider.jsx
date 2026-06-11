import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/photo3.png',
    eyebrow: 'Triam A+ TMT Rebars',
    headline: 'Lifelong Bari\nStrong.',
    sub: "Strong is everywhere. The A+ is what's rare.",
    badge: 'A+ STRENGTH · A+ FLEXIBILITY · A+ GRIP',
    cta1: { label: 'Find a Triam Dealer', to: '/contact' },
    cta2: { label: 'Download Brochure', href: '/TRIAM-Brochure-pdf.pdf' },
  },
  {
    image: '/photo4.png',
    eyebrow: "Powering India's Future",
    headline: "The Backbone of Tomorrow's India.",
    sub: 'From high-rise towers to critical infrastructure — Triam A+ powers every landmark that shapes tomorrow.',
    badge: 'A+ STRENGTH · A+ FLEXIBILITY · A+ GRIP',
    cta1: { label: 'Find a Triam Dealer', to: '/contact' },
    cta2: { label: 'Download Brochure', href: '/TRIAM-Brochure-pdf.pdf' },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setAnimKey(k => k + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
  };

  const slide = slides[current];

  return (
    <section className="tmt-hero">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="tmt-hero-slide"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 2 : 1,
          }}
        />
      ))}

      {/* Text content */}
      <div className="tmt-hero-content" style={{ zIndex: 10 }}>
        <div className="tmt-hero-inner">
          <div key={animKey}>
            <div className="tmt-hero-eyebrow">{slide.eyebrow}</div>
            <h1
              className="tmt-hero-headline"
              style={{ whiteSpace: 'pre-line' }}
            >
              {slide.headline}
            </h1>
            <p className="tmt-hero-sub">{slide.sub}</p>
            {slide.badge && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
                {slide.badge.split('·').map((item, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span style={{ color: 'rgba(228,137,21,0.5)', fontSize: '14px' }}>·</span>}
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e48915', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.25)', borderRadius: '50px', padding: '5px 14px' }}>
                      {item.trim()}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="tmt-hero-actions">
              <Link to={slide.cta1.to} className="tmt-btn-amber">{slide.cta1.label} →</Link>
              {slide.cta2.href
                ? <a href={slide.cta2.href} download className="tmt-btn-outline-white">{slide.cta2.label}</a>
                : <Link to={slide.cta2.to} className="tmt-btn-outline-white">{slide.cta2.label}</Link>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="tmt-hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`tmt-hero-indicator${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
