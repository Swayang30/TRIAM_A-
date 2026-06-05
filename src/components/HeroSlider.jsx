import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/photo1.png',
    eyebrow: 'Triam A+ TMT Rebars',
    headline: 'Forged\nfor Forever.',
    sub: 'German-engineered precision. Uncompromising quality. Built into every rebar we make.',
    cta1: { label: 'Explore Products', to: '/Fe-550D-Grade-TMT-16mm-20mm' },
    cta2: { label: 'Get a Quote', to: '/contact' },
  },
  {
    image: '/photo2.png',
    eyebrow: 'Fe 500D · Fe 550D Grade',
    headline: 'Steel That Never Bends to Mediocrity.',
    sub: '8mm to 32mm — exceeding IS:1786:2008 at every diameter, every single time.',
    cta1: { label: 'View Products', to: '/Fe-500D-Grade-TMT-8mm-12mm' },
    cta2: { label: 'Our Quality', to: '/quality' },
  },
  {
    image: '/photo3.png',
    eyebrow: '5,25,000 MT Yearly Capacity',
    headline: 'Where Strength Meets Precision.',
    sub: '450+ trusted dealers. ₹1,000 Cr+ turnover. A SAIL-authorised conversion agent you can count on.',
    cta1: { label: 'About Triam', to: '/about' },
    cta2: { label: 'Become a Dealer', to: '/contact' },
  },
  {
    image: '/photo4.png',
    eyebrow: "Powering India's Future",
    headline: "The Backbone of Tomorrow's India.",
    sub: 'From high-rise towers to critical infrastructure — Triam A+ powers every landmark that shapes tomorrow.',
    cta1: { label: 'Our Projects', to: '/about' },
    cta2: { label: 'Contact Us', to: '/contact' },
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
            <div className="tmt-hero-actions">
              <Link to={slide.cta1.to} className="tmt-btn-amber">{slide.cta1.label} →</Link>
              <Link to={slide.cta2.to} className="tmt-btn-outline-white">{slide.cta2.label}</Link>
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
