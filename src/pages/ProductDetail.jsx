import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

function useCountUp(target, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const num = parseFloat(target);
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const prog = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.floor(ease * num));
      if (prog < 1) requestAnimationFrame(step);
      else setVal(num);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AboutTerminal({ grade }) {
  const para1 = `For close to two decades, Amit Metaliks Ltd. has built its name in the metallurgical sector on one principle: no shortcuts. Every TRIAM A+ ${grade} rebar is forged on the patented Thermax technology from HSE, Germany, then carried through a refined process that pairs high strength with high ductility at every stage.`;
  const para2 = `Pick up an ISI-certified bar and the A+ quality shows along its full length — in every millimetre of steel, in every test certificate, in every structure it supports.`;
  const fullText = para1 + '\n\n' + para2;

  const [ref, visible] = useInView(0.2);
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (visible && !started) setStarted(true);
  }, [visible, started]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= fullText.length) return;
    const t = setTimeout(() => {
      setDisplayed(fullText.slice(0, displayed.length + 1));
    }, 18);
    return () => clearTimeout(t);
  }, [started, displayed, fullText]);

  const chunks = displayed.split('\n\n');

  return (
    <div ref={ref} className="about-terminal" style={{
      borderRadius: '14px', overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(21,41,77,0.18)',
      marginBottom: '28px',
      aspectRatio: '1 / 1',
      maxWidth: '480px',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ background: '#0a1520', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57','#ffbe2e','#28c840'].map((c, i) => (
            <div key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          about.txt — TRIAM A+
        </div>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840', boxShadow: '0 0 5px #28c840' }} />
      </div>
      <div style={{ background: '#0d1621', padding: '22px 26px', flex: 1, overflow: 'hidden' }}>
        {chunks.map((chunk, i) => (
          <p key={i} style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: 1.8, margin: i < chunks.length - 1 ? '0 0 14px' : '0' }}>
            {chunk}
            {i === chunks.length - 1 && (
              <span style={{ animation: 'pd-cursor-blink 0.65s step-end infinite', color: '#F47C20' }}>|</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const currentSlug = slug || window.location.pathname.replace('/', '') || 'Fe-550D-Grade-TMT-6mm-32mm';

  const products = {
    'Fe-500D-Grade-TMT-8mm-12mm': {
      title: 'Fe 500D Grade TMT',
      size: '8mm – 12mm',
      grade: 'Fe 500D',
      yieldStrength: '500',
      tensile: '565',
      desc: 'Ideal for stirrups, slabs, staircases, beams & columns in residential & low-rise buildings. Balances cost with long-term longevity.',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['Stirrups', 'Slabs', 'Staircases', 'Beams', 'Columns', 'Residential'],
      accentGradient: 'linear-gradient(135deg, #718096 0%, #4a5568 100%)',
    },
    'Fe-550D-Grade-TMT-6mm-32mm': {
      title: 'Fe 550D Grade TMT',
      size: '6mm – 32mm',
      grade: 'Fe 550D',
      yieldStrength: '550',
      tensile: '600',
      desc: 'The structural backbone of a building — beams, columns and high-load slabs. Higher ductility and a tighter rib pattern mean real crack resistance and endurance under continuous load, from high-density housing to major infrastructure.',
      image: '/product1.png',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['Beams', 'Columns', 'High-Load Slabs', 'Residential Towers', 'Infrastructure', 'Industrial Frames'],
      accentGradient: 'linear-gradient(135deg, #F47C20 0%, #d4621a 100%)',
    },
    'Fe-550D-Grade-TMT-25mm-32mm': {
      title: 'Fe 550D Grade TMT',
      size: '25mm – 32mm',
      grade: 'Fe 550D',
      yieldStrength: '550',
      tensile: '600',
      desc: 'Suited for high-rise buildings, bridges, dams & heavy industrial structures. Withstands wind, seismic forces and sustained vertical stress under the most demanding environments.',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['High-Rise', 'Bridges', 'Dams', 'Power Plants', 'Heavy Industry', 'Seismic Zones'],
      accentGradient: 'linear-gradient(135deg, #ecc94b 0%, #b7791f 100%)',
    },
  };

  const p = products[currentSlug] || products['Fe-550D-Grade-TMT-6mm-32mm'];
  const [activeFaq, setActiveFaq] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Reliably load Montserrat (an @import inside an injected <style> is often ignored by the browser)
  useEffect(() => {
    const id = 'pd-montserrat-font';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  const yieldVal  = useCountUp(p.yieldStrength, 1000, heroVisible);
  const tensileVal = useCountUp(p.tensile, 1100, heroVisible);

  const faqs = [
    { q: 'What makes Triam A+ different from an ordinary TMT bar?', a: "A TMT bar has a tough outer shell and a ductile core. Triam A+ FE 550D goes further — it's graded A+ on three things, not one: strength, flexibility and grip. Rolled on German Thermex technology for the right balance of all three." },
    { q: 'Which sizes and grade does Triam A+ come in?', a: 'FE 550D, in diameters from 8 mm to 32 mm, supplied in fixed 12-metre lengths and section-wise bundles. Smaller bars for slabs and stirrups; 16–32 mm for beams, columns and heavy structures.' },
    { q: 'How is Triam A+ manufactured?', a: 'From sponge iron in our own Steel Melting Shop, through in-house casting, rolling and Thermex quenching — every bar made on one integrated line. Nothing outsourced, 100% of billets tested.' },
    { q: 'Is Triam A+ certified and tested?', a: 'Yes — ISI-certified and conforming to IS:1786:2008, backed by ISO 9001, 14001 and OHSAS 45001 systems. Every heat is checked in our NABL-accredited labs before it ships.' },
    { q: 'How does Triam A+ handle earthquakes, fire and corrosion?', a: 'Tested under simulated seismic loading, holds strength up to 600°C, and resists corrosion thanks to clean low-alloy chemistry with no torsional residual stress.' },
    { q: 'Where can I buy Triam A+ and get a price?', a: 'Through our 450+ dealers across the region. Call 1800 843 3333 or request a quote at triamtmt.com for the current rate on your size and quantity.' },
  ];

  const sidebarLinks = [
    { name: 'Future Ready Technology', id: 'future' },
    { name: 'Physical Properties', id: 'physical' },
    { name: 'Chemical Properties', id: 'chemical' },
    { name: 'Dimensional Tolerance', id: 'tolerance' },
    { name: 'Seismic Resistance', id: 'seismic' },
    { name: 'Corrosion Resistance', id: 'corrosion' },
    { name: 'Application Areas', id: 'application' },
    { name: 'Product Packaging', id: 'packaging' },
    { name: 'Quality Checks', id: 'quality' },
    { name: 'Advantages', id: 'advantages' },
  ];

  const physicalRows = [
    { label: '0.2% Proof Stress', unit: 'N/mm²', std: p.grade === 'Fe 500D' ? '500' : '550', triam: p.grade === 'Fe 500D' ? '500+' : '550+' },
    { label: 'Tensile Strength',  unit: 'N/mm²', std: p.grade === 'Fe 500D' ? '565' : '600', triam: p.grade === 'Fe 500D' ? '565+' : '600+' },
    { label: 'Elongation',        unit: '%',      std: '14.5',  triam: '17+' },
    { label: 'Elongation at Max. Force', unit: '%', std: '5',  triam: '7+' },
    { label: 'TS / YS Ratio',    unit: '',        std: '1.08',  triam: '1.15' },
    { label: 'Bend', unit: '', subRows: [
      { cond: '≤ 20 mm', std: '4D', triam: '3D' },
      { cond: '> 20 mm', std: '5D', triam: '4D' },
    ] },
    { label: 'Rebend', unit: '', subRows: [
      { cond: '≤ 10 mm', std: '6D', triam: '4D' },
      { cond: '> 10 mm', std: '7D', triam: '6D' },
    ] },
  ];

  const chemRows = [
    { label: 'Carbon',      unit: '% Max', std: '0.250', triam: '0.200', triamLA: '0.150' },
    { label: 'Sulphur',     unit: '% Max', std: '0.040', triam: '0.040', triamLA: '0.040' },
    { label: 'Phosphorous', unit: '% Max', std: '0.040', triam: '0.040', triamLA: '0.090' },
    { label: 'S + P',       unit: '% Max', std: '0.075', triam: '0.075', triamLA: '0.130' },
  ];

  return (
    <main className="pd-page">
      <style>{`
        @keyframes pd-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ═══ BASE ═══ */
        .pd-page {
          --navy:       #15294D;
          --navy-dk:    #0d1e38;
          --navy-dkst:  #0a1222;
          --orange:     #F47C20;
          --orange-dk:  #d4621a;
          --orange-lt:  #FF9240;
          --off-white:  #F7F8FA;
          --border:     #E4E7EC;
          --border-lt:  #F0F2F5;
          --text:       #4B5563;
          --text-mid:   #6B7280;
          --text-muted: #9CA3AF;
          background: var(--off-white);
          min-height: 100vh;
        }

        /* ═══ HERO ═══ */
        .pd-hero {
          position: relative;
          background: linear-gradient(155deg, #0a1222 0%, #0d1e38 45%, #15294D 100%);
          overflow: hidden;
          padding-top: 88px;
        }
        .pd-hero-accent-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #F47C20, #d4621a, #F47C20);
        }
        .pd-hero-grid {
          position: relative; z-index: 3;
          max-width: 1240px; margin: 0 auto; padding: 0 24px 80px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px; align-items: start;
        }
        .pd-hero-left {
          padding-top: 24px;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .pd-hero-left.in  { opacity: 1; transform: translateY(0); }
        .pd-hero-left.out { opacity: 0; transform: translateY(32px); }
        .pd-hero-right {
          display: flex; flex-direction: column; gap: 14px;
          padding-top: 24px; flex-shrink: 0;
          transition: opacity 0.8s 0.18s ease, transform 0.8s 0.18s ease;
        }
        .pd-hero-right.in  { opacity: 1; transform: translateX(0); }
        .pd-hero-right.out { opacity: 0; transform: translateX(24px); }
        .pd-hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(244,124,32,0.12); border: 1px solid rgba(244,124,32,0.28);
          border-radius: 50px; padding: 5px 14px 5px 10px; margin-bottom: 20px;
        }
        .pd-hero-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #F47C20; }
        .pd-hero-pill-txt {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #F47C20;
        }
        .pd-grade-badge {
          display: inline-block; color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 4px; margin-bottom: 16px;
        }
        .pd-hero-h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900; color: #fff; text-transform: uppercase;
          line-height: 0.88; letter-spacing: -2px; margin-bottom: 10px;
        }
        .pd-hero-size {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(32px, 5vw, 68px);
          font-weight: 700; color: #F47C20;
          letter-spacing: -1px; line-height: 1.05; margin-bottom: 22px;
        }
        .pd-hero-desc {
          color: rgba(255,255,255,0.55); font-size: 14px;
          line-height: 1.85; max-width: 500px; margin-bottom: 28px;
        }
        .pd-breadcrumb {
          display: flex; gap: 8px; align-items: center;
          list-style: none; padding: 0; margin: 0;
        }
        .pd-stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 20px 26px;
          backdrop-filter: blur(12px); min-width: 168px;
          position: relative; overflow: hidden;
          transition: border-color 0.2s;
        }
        .pd-stat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #F47C20, #d4621a);
        }
        .pd-stat-card:hover { border-color: rgba(244,124,32,0.3); }
        .pd-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px;
        }
        .pd-stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 48px; font-weight: 900; color: #F47C20; line-height: 1;
        }
        .pd-stat-unit { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 5px; }
        .pd-hero-cut {
          position: absolute; bottom: -2px; left: 0; right: 0; height: 80px;
          background: #F7F8FA; clip-path: polygon(0 100%, 100% 100%, 100% 0); z-index: 4;
        }

        /* ═══ SPECS STRIP ═══ */
        .pd-strip {
          background: #fff;
          border-bottom: 1px solid #E4E7EC;
          position: relative; z-index: 2; overflow: hidden;
          box-shadow: 0 2px 8px rgba(21,41,77,0.05);
        }
        .pd-strip-inner {
          max-width: 1240px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: stretch; overflow-x: auto; scrollbar-width: none;
        }
        .pd-strip-inner::-webkit-scrollbar { display: none; }
        .pd-strip-item {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 24px; border-right: 1px solid #E4E7EC;
          white-space: nowrap; flex-shrink: 0;
          transition: background 0.18s;
        }
        .pd-strip-item:hover { background: rgba(244,124,32,0.03); }
        .pd-strip-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(244,124,32,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .pd-strip-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; font-weight: 700; color: #15294D;
        }
        .pd-strip-sub { font-size: 11px; color: #6B7280; }

        /* ═══ BODY LAYOUT ═══ */
        .pd-body { padding: 64px 0 96px; }
        .pd-layout {
          display: grid;
          grid-template-columns: 1fr 356px;
          gap: 52px; align-items: start;
        }
        /* Grid tracks default to min-width:auto, which lets the widest non-shrinkable
           child (e.g. the min-width:500px tables) blow the whole column past the viewport.
           Forcing min-width:0 lets the column shrink and the overflow-x wrappers do their job. */
        .pd-layout > * { min-width: 0; }
        .pd-sidebar {
          position: sticky; top: 96px;
          display: flex; flex-direction: column; gap: 20px;
          min-width: 0;
        }

        /* ═══ SECTION PRIMITIVES ═══ */
        .pd-sec { margin-bottom: 64px; }
        .pd-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #F47C20; margin-bottom: 14px;
        }
        .pd-eline { width: 28px; height: 2px; background: #F47C20; border-radius: 1px; flex-shrink: 0; }
        .pd-h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 900; color: #15294D; text-transform: uppercase;
          line-height: 0.95; margin-bottom: 16px; letter-spacing: -0.5px;
          position: relative; padding-bottom: 16px;
        }
        .pd-h2::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 40px; height: 3px; background: #F47C20; border-radius: 2px;
        }
        .pd-txt  { color: #4B5563; font-size: 15px; line-height: 1.82; }
        .pd-muted{ color: #6B7280; font-size: 14px; line-height: 1.8; }

        /* ═══ IMAGE CARD ═══ */
        .pd-img-card {
          position: relative; border-radius: 16px; overflow: hidden;
          margin-bottom: 52px;
          box-shadow: 0 12px 40px rgba(21,41,77,0.14), 0 0 0 1px rgba(21,41,77,0.06);
        }
        .pd-img-card img { width: 100%; max-width: 100%; height: 400px; object-fit: cover; display: block; }
        .pd-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,18,34,0.92) 0%, rgba(10,18,34,0.18) 55%, transparent 100%);
        }
        .pd-img-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 28px;
          display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 10px;
        }
        .pd-img-tag {
          background: rgba(244,124,32,0.18); border: 1px solid rgba(244,124,32,0.38);
          color: #F47C20; font-size: 10px; font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          padding: 4px 11px; border-radius: 4px; letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* ═══ APPLICATION TAGS ═══ */
        .pd-page img { max-width: 100%; }
        .pd-tags { display: flex; flex-wrap: wrap; gap: 10px; margin: 14px 0 0; min-width: 0; }
        .pd-tag {
          background: #fff; border: 1.5px solid #E4E7EC; border-radius: 50px;
          max-width: 100%;
          padding: 8px 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; font-weight: 700; color: #15294D;
          cursor: default; transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .pd-tag:hover { border-color: #F47C20; color: #F47C20; background: rgba(244,124,32,0.04); }

        /* ═══ A+ FEATURES GRID ═══ */
        .pd-feat-card {
          position: relative;
          background: #15294D;
          border: 1px solid rgba(244,124,32,0.18);
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 16px 12px; text-align: center;
          transition: all 0.25s ease; cursor: default;
        }
        .pd-feat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #F47C20, #d4621a);
        }
        .pd-feat-card:hover {
          border-color: rgba(244,124,32,0.45);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(21,41,77,0.28), 0 0 0 1px rgba(244,124,32,0.2);
        }
        .pd-feat-img-wrap {
          width: 70px; height: 70px; margin: 0 auto 12px;
          background: rgba(244,124,32,0.08);
          border: 1.5px solid rgba(244,124,32,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .pd-feat-img-wrap img { width: 82%; height: 82%; object-fit: contain; }
        .pd-feat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 800;
          color: #fff; text-transform: uppercase;
          letter-spacing: 0.04em; line-height: 1.25;
        }

        @media (max-width: 768px) {
          .pd-feat-img-wrap { width: 52px; height: 52px; margin-bottom: 8px; }
          .pd-feat-label { font-size: 10px; }
          .pd-feat-card { padding: 10px 8px; }
        }
        @media (max-width: 480px) {
          .pd-feat-img-wrap { width: 44px; height: 44px; margin-bottom: 6px; }
          .pd-feat-label { font-size: 9px; letter-spacing: 0; }
          .pd-feat-card { padding: 8px 6px; border-radius: 12px; }
        }

        /* ═══ METRIC CARDS ═══ */
        .pd-metrics {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px;
        }
        .pd-metric {
          background: #15294D; border-radius: 14px; padding: 24px 20px;
          position: relative; overflow: hidden;
          box-shadow: 0 8px 28px rgba(21,41,77,0.2);
          border-top: 3px solid #F47C20;
        }
        .pd-metric-bg { position: absolute; bottom: -16px; right: -14px; font-size: 72px; opacity: 0.04; line-height: 1; user-select: none; }
        .pd-metric-note {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 8px;
        }
        .pd-metric-val  { font-family: 'Barlow Condensed', sans-serif; font-size: 52px; font-weight: 900; color: #F47C20; line-height: 1; }
        .pd-metric-unit { font-size: 10px; color: rgba(255,255,255,0.3); margin: 4px 0 10px; }
        .pd-metric-lbl  {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.55);
        }

        /* ═══ TABLES ═══ */
        .pd-tbl-wrap {
          overflow-x: auto; -webkit-overflow-scrolling: touch;
          border-radius: 14px; box-shadow: 0 4px 16px rgba(21,41,77,0.07);
          margin-bottom: 0; max-width: 100%;
        }
        .pd-tbl {
          width: 100%; min-width: 500px; border-collapse: collapse;
          background: #fff; border: 1px solid #E4E7EC;
        }
        .pd-tbl thead { background: #15294D; }
        .pd-th {
          padding: 14px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); text-align: left;
        }
        .pd-th-acc { color: #F47C20 !important; text-align: center !important; }
        .pd-td      { padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #15294D; border-bottom: 1px solid #F0F2F5; }
        .pd-td-mid  { padding: 12px 16px; font-size: 13.5px; color: #9CA3AF; text-align: center; font-weight: 500; border-bottom: 1px solid #F0F2F5; }
        .pd-td-acc  { padding: 10px 16px; text-align: center; border-bottom: 1px solid #F0F2F5; }
        .pd-badge   {
          display: inline-block; background: rgba(244,124,32,0.08); border: 1px solid rgba(244,124,32,0.22);
          border-radius: 6px; padding: 3px 13px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 700; color: #d4621a;
        }
        tr:last-child .pd-td, tr:last-child .pd-td-mid, tr:last-child .pd-td-acc { border-bottom: none; }

        /* ═══ CHEM GRID ═══ */
        .pd-chem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px; }
        .pd-chem-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #E4E7EC; box-shadow: 0 4px 16px rgba(21,41,77,0.06); }
        .pd-chem-note { padding: 16px 20px; background: #FFFBF7; border-radius: 12px; border: 1px solid rgba(244,124,32,0.18); display: flex; gap: 13px; align-items: flex-start; }
        .pd-chem-note p { margin: 0; font-size: 13px; color: #78350F; line-height: 1.75; }

        /* ═══ INFO CARDS ═══ */
        .pd-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pd-grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .pd-icard {
          background: #fff; border: 1px solid #E4E7EC; border-radius: 12px;
          padding: 22px; display: flex; gap: 16px; align-items: flex-start;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .pd-icard:hover {
          box-shadow: 0 8px 24px rgba(21,41,77,0.1);
          border-color: rgba(244,124,32,0.3);
          transform: translateY(-2px);
        }
        .pd-icard-icon { font-size: 22px; flex-shrink: 0; }
        .pd-icard-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px; font-weight: 700; color: #15294D; margin-bottom: 6px;
        }
        .pd-icard-text { font-size: 13px; color: #4B5563; line-height: 1.7; }

        /* ═══ VIDEO ═══ */
        .pd-video {
          margin-bottom: 52px; border-radius: 16px; overflow: hidden;
          position: relative; height: 320px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.22);
        }

        /* ═══ QUALITY TABLE ═══ */
        .pd-qtbl { background: #15294D; border-radius: 14px; overflow: hidden; }
        .pd-qrow {
          padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.07);
          display: grid; grid-template-columns: 1.2fr 0.8fr 2fr; gap: 16px; align-items: center;
        }
        .pd-qrow:last-child { border-bottom: none; }

        /* ═══ ADVANTAGES ═══ */
        .pd-adv-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 24px; }
        .pd-adv-item {
          display: flex; gap: 12px; align-items: flex-start;
          background: #fff; border: 1px solid #E4E7EC; border-radius: 10px; padding: 14px 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pd-adv-item:hover { border-color: rgba(244,124,32,0.35); box-shadow: 0 4px 12px rgba(21,41,77,0.08); }

        /* ═══ FAQ ═══ */
        .pd-faq  { background: #fff; border-radius: 12px; overflow: hidden; border: 1.5px solid #E4E7EC; margin-bottom: 8px; transition: border-color 0.25s, box-shadow 0.25s; }
        .pd-faq.open { border-color: #F47C20; box-shadow: 0 4px 22px rgba(244,124,32,0.1); }
        .pd-faq-btn { width: 100%; padding: 20px 24px; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; }
        .pd-faq-num {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 800; transition: all 0.25s;
        }
        .pd-faq-ico { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.25s; }
        .pd-faq-body { padding: 0 24px 20px 68px; font-size: 14px; color: #4B5563; line-height: 1.82; border-top: 1px solid #F0F2F5; }

        /* ═══ BOTTOM CTA ═══ */
        .pd-cta-wrap { border-radius: 16px; overflow: hidden; position: relative; display: flex; min-height: 220px; box-shadow: 0 20px 60px rgba(21,41,77,0.25); }
        .pd-cta-left { flex: 1; padding: 48px 40px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 2; }
        .pd-cta-right { width: 38%; position: relative; flex-shrink: 0; }

        /* ═══ SIDEBAR CARDS ═══ */
        .pd-specs-card { background: #15294D; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 36px rgba(21,41,77,0.22); }
        .pd-specs-grid { padding: 20px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .pd-nav-card { background: #fff; border: 1px solid #E4E7EC; border-radius: 14px; overflow: hidden; }
        .pd-nav-link { display: flex; justify-content: space-between; align-items: center; padding: 10px 24px; font-size: 13px; font-weight: 600; color: #374151; text-decoration: none; border-left: 3px solid transparent; transition: all 0.18s; }
        .pd-nav-link:hover { color: #F47C20; border-left-color: #F47C20; padding-left: 28px; background: rgba(244,124,32,0.04); }
        .pd-cta-card { border-radius: 14px; overflow: hidden; position: relative; text-align: center; padding: 44px 28px; }
        .pd-dl-card  { background: #fff; border: 1px solid #E4E7EC; border-radius: 14px; overflow: hidden; }
        .pd-dl-item  { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 16px; background: #F7F8FA; border: 1px solid #E4E7EC; border-radius: 10px; text-decoration: none; transition: all 0.2s; }
        .pd-dl-item:hover { border-color: #F47C20; background: #FFFBF7; }
        .pd-card-hdr { padding: 16px 24px; border-bottom: 1px solid #E4E7EC; display: flex; align-items: center; gap: 12px; }
        .pd-card-hdr-bar { width: 3px; height: 18px; background: #F47C20; border-radius: 2px; }
        .pd-card-hdr-title {
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 700; color: #15294D;
        }
        .pd-quote-btn {
          display: block; text-align: center; background: #F47C20; color: #fff;
          padding: 12px; border-radius: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 700; text-decoration: none; transition: background 0.2s;
        }
        .pd-quote-btn:hover { background: #FF9240; }

        /* ═══ ABOUT GRID: terminal + features side-by-side on desktop ═══ */
        .pd-about-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 24px; align-items: start; min-width: 0;
        }
        .pd-about-grid > * { min-width: 0; }
        .pd-feat-wrap { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .pd-feat-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; min-width: 0; }
        .pd-feat-card { min-width: 0; }
        @media (min-width: 1200px) {
          .pd-about-grid { grid-template-columns: 1fr 300px; gap: 32px; }
        }

        /* ══════════════════════ RESPONSIVE ══════════════════════ */

        .pd-faq-q-wrap { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0; }
        .pd-faq-q-wrap > span:last-child { min-width: 0; word-break: break-word; }
        .pd-corrosion-box { padding: 28px; }

        /* Tablet ≤ 1024px */
        @media (max-width: 1024px) {
          .pd-layout { grid-template-columns: 1fr 300px; gap: 36px; }
        }

        /* Tablet ≤ 991px — sidebar goes below */
        @media (max-width: 991px) {
          .pd-layout { grid-template-columns: 1fr; }
          .pd-sidebar { position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .pd-nav-card { display: none; }
        }

        /* Mobile ≤ 768px */
        @media (max-width: 768px) {
          .pd-hero { padding-top: 72px; }
          .pd-hero-grid { grid-template-columns: 1fr; padding: 0 16px 100px; gap: 24px; }
          .pd-hero-right { flex-direction: row; flex-wrap: wrap; overflow-x: visible; gap: 12px; max-width: 100%; }
          .pd-stat-card { min-width: 0; flex: 1 1 calc(50% - 6px); padding: 16px 18px; }
          .pd-stat-value { font-size: 36px; }
          .pd-hero-pill-txt { font-size: 9px; letter-spacing: 0.08em; }
          .pd-hero-desc { font-size: 13px; margin-bottom: 20px; }

          .pd-body { padding: 36px 0 60px; }
          .pd-img-card img { height: 220px; }
          .pd-img-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
          .pd-img-bottom > div:last-child { justify-content: flex-start; }

          .pd-metrics { grid-template-columns: 1fr; gap: 12px; }
          .pd-metric { padding: 20px 16px; }
          .pd-chem-grid { grid-template-columns: 1fr; }
          .pd-chem-note { padding: 14px 16px; }
          .pd-grid2 { grid-template-columns: 1fr; }
          .pd-grid3 { grid-template-columns: 1fr; }
          .pd-adv-grid { grid-template-columns: 1fr; }

          .pd-qrow { grid-template-columns: 1fr; gap: 4px; padding: 14px 16px; }

          .pd-cta-left { padding: 28px 20px; }
          .pd-cta-right { display: none; }
          .pd-cta-wrap { min-height: auto; }

          .pd-faq-body { padding: 0 16px 18px 16px; }
          .pd-faq-btn  { padding: 16px; }
          .pd-faq-q-wrap { gap: 10px; }

          .pd-sidebar { grid-template-columns: 1fr; }
          .pd-specs-grid { grid-template-columns: 1fr 1fr; gap: 14px; }

          /* Strip: wrap badges onto multiple rows instead of a row that runs off-screen */
          .pd-strip-inner { flex-wrap: wrap; overflow-x: visible; padding: 0 12px; }
          .pd-strip-item {
            flex: 1 1 calc(50% - 1px); min-width: 0; padding: 12px 14px;
            border-right: 1px solid #E4E7EC; border-bottom: 1px solid #E4E7EC;
          }
          .pd-strip-item:nth-child(even) { border-right: none; }

          /* Feature cards: auto-fit so they stay compact and never get cut off */
          .pd-feat-row { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
          .pd-about-grid { grid-template-columns: 1fr; }

          /* Tables: fit the viewport (fixed layout + colgroup %) instead of forcing a
             500px min-width that would overflow the scroll wrapper on a phone */
          .pd-tbl { min-width: 0; }
          .pd-th, .pd-td, .pd-td-mid, .pd-td-acc { padding-left: 12px; padding-right: 12px; word-break: break-word; }

          .pd-corrosion-box { padding: 20px 16px; }
          .pd-sec { margin-bottom: 44px; }
          .pd-txt { font-size: 14px; line-height: 1.75; }
          .about-terminal { aspect-ratio: unset !important; min-height: 280px !important; max-width: 100% !important; }
          .pd-feat-wrap { max-width: 100% !important; }
          .pd-h2 { padding-bottom: 14px; }
        }

        /* Small mobile ≤ 480px */
        @media (max-width: 480px) {
          .pd-hero-grid { padding: 0 12px 100px; }
          .pd-hero-h1 { font-size: clamp(36px, 9vw, 60px); }
          .pd-hero-size { font-size: clamp(22px, 5.5vw, 44px); }
          .pd-hero-desc { font-size: 12px; }
          .pd-stat-card { min-width: 118px; padding: 14px 14px; }
          .pd-stat-value { font-size: 30px; }
          .pd-stat-label { font-size: 8px; }
          .pd-metric-val { font-size: 38px; }
          .pd-h2 { font-size: clamp(24px, 7vw, 36px); }
          .pd-corrosion-box { padding: 16px 12px; }
          .pd-cta-left { padding: 24px 16px; }
          .pd-faq-body { padding: 0 12px 16px; }
          .pd-faq-btn { padding: 12px; gap: 8px; }
          .pd-faq-q-wrap { gap: 8px; }
          .pd-faq-num { width: 24px; height: 24px; font-size: 11px; }
          .pd-qrow { padding: 12px 12px; }
          .pd-metric { padding: 16px 14px; }
          .pd-strip-item { padding: 10px 12px; gap: 8px; }
          .pd-strip-icon { width: 30px; height: 30px; font-size: 14px; }
          .pd-strip-name { font-size: 11px; }
          .pd-strip-sub { font-size: 10px; }
          .pd-icard { padding: 18px; gap: 12px; }
          .pd-sec { margin-bottom: 36px; }
          .pd-txt { font-size: 13.5px; }
        }

        /* Extra small ≤ 360px */
        @media (max-width: 360px) {
          .pd-hero-grid { padding: 0 10px 100px; }
          .pd-stat-card { min-width: 104px; padding: 12px 12px; }
          .pd-stat-value { font-size: 26px; }
          .pd-stat-label { font-size: 7.5px; }
          .pd-h2 { font-size: clamp(20px, 6.5vw, 28px); }
          .pd-metric-val { font-size: 34px; }
          .pd-faq-btn { padding: 10px; }
          .pd-qrow { padding: 10px 10px; }
          .pd-cta-left { padding: 20px 14px; }
          .pd-corrosion-box { padding: 14px 10px; }
          .pd-icard { padding: 14px 12px; gap: 10px; }
          .pd-adv-item { padding: 12px 14px; }
          .pd-specs-grid { grid-template-columns: 1fr 1fr; }
          .pd-strip-item { padding: 10px; gap: 6px; }
          .pd-sec { margin-bottom: 30px; }
          .pd-txt { font-size: 13px; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section className="pd-hero" ref={heroRef}>
        <div className="pd-hero-accent-bar" />
        <div style={{ position:'absolute',inset:0, backgroundImage:`url(${p.breadcrumbBg})`, backgroundSize:'cover', backgroundPosition:'center', opacity:0.05 }} />
        <div style={{ position:'absolute', top:'-120px', right:'0', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(244,124,32,0.11) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:'-80px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(244,124,32,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />
        <div className="pd-hero-cut" />

        <div className="pd-hero-grid">
          {/* LEFT */}
          <div className={`pd-hero-left ${heroVisible ? 'in' : 'out'}`}>
            <div className="pd-hero-pill">
              <div className="pd-hero-pill-dot" />
              <span className="pd-hero-pill-txt">Premium Grade Product · {p.grade}</span>
            </div>
            <div className="pd-grade-badge" style={{ background: p.accentGradient }}>{p.grade}</div>
            <h1 className="pd-hero-h1">{p.title}</h1>
            <div className="pd-hero-size">{p.size}</div>
            <p className="pd-hero-desc">{p.desc}</p>
            <nav>
              <ol className="pd-breadcrumb">
                <li><Link to="/" style={{ color:'rgba(255,255,255,0.35)', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>Home</Link></li>
                <li style={{ color:'rgba(255,255,255,0.18)', fontSize:'12px', padding:'0 4px' }}>/</li>
                <li style={{ color:'#F47C20', fontSize:'12px', fontWeight:600 }}>{p.grade} · {p.size}</li>
              </ol>
            </nav>
          </div>

          {/* RIGHT: stat cards */}
          <div className={`pd-hero-right ${heroVisible ? 'in' : 'out'}`}>
            {[
              { label:'Yield Strength',   value: yieldVal + '+',   unit:'N/mm²' },
              { label:'Tensile Strength', value: tensileVal + '+', unit:'N/mm²' },
              { label:'Elongation',       value: '17+',            unit:'%' },
            ].map((s, i) => (
              <div key={i} className="pd-stat-card">
                <div className="pd-stat-label">{s.label}</div>
                <div className="pd-stat-value">{s.value}</div>
                <div className="pd-stat-unit">{s.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SPECS STRIP ══════════ */}
      <div className="pd-strip">
        <div className="pd-strip-inner">
          {[
            { icon:'🏆', name:'ISI Certified',       sub:'IS 1786:2008' },
            { icon:'⚙️', name:'German Thermax',       sub:'HSE Technology' },
            { icon:'🔬', name:'NABL Tested',          sub:'In-house Lab' },
            { icon:'🏗️', name:'SAIL Authorised',      sub:'Conversion Agent' },
            { icon:'✅', name:'ISO 9001:2015',         sub:'Quality Certified' },
            { icon:'🌡️', name:`${p.grade} Grade`,     sub:'Premium Strength' },
          ].map((item, i) => (
            <div key={i} className="pd-strip-item">
              <div className="pd-strip-icon">{item.icon}</div>
              <div>
                <div className="pd-strip-name">{item.name}</div>
                <div className="pd-strip-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ BODY ══════════ */}
      <div className="pd-body">
        <div className="container">
          <div className="pd-layout">

            {/* ── MAIN CONTENT ── */}
            <div>

              {/* Product Image */}
              <div className="pd-img-card">
                <img src={p.image} alt={p.title} />
                <div className="pd-img-overlay" />
                <div className="pd-img-bottom">
                  <div>
                    <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#F47C20', marginBottom:'5px', fontFamily:"'Montserrat', sans-serif" }}>TRIAM A+</div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'26px', fontWeight:800, color:'#fff', textTransform:'uppercase' }}>{p.grade} · {p.size}</div>
                  </div>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'flex-end' }}>
                    <span className="pd-img-tag">ISI Certified</span>
                    <span className="pd-img-tag">IS 1786:2008</span>
                    <span className="pd-img-tag">ISO 9001</span>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="pd-sec" id="application">
                <div className="pd-eyebrow"><span className="pd-eline" />Application Areas</div>
                <div className="pd-tags">
                  {p.applications.map((a, i) => <span key={i} className="pd-tag">{a}</span>)}
                </div>
              </div>

              {/* About + Features */}
              <div className="pd-sec" id="future">
                <div className="pd-eyebrow"><span className="pd-eline" />About this Product</div>
                <h2 className="pd-h2">A+ All the Way</h2>
                <div className="pd-about-grid">
                  <AboutTerminal grade={p.grade} />
                  {(() => {
                    const features = [
                      { label: 'A+ Physical Strength',        image: '/A+Physical.png' },
                      { label: 'A+ High Dimension Tolerance', image: '/HighDimensionTolerance.png' },
                      { label: 'A+ Bonding Strength',         image: '/bonding_Strength.png' },
                      { label: 'A+ Corrosion Resistance',     image: '/Corrosion_Resistance.png' },
                      { label: 'A+ Weldability',              image: '/A+weldibility.png' },
                      { label: 'A+ Bendability',              image: '/A+Bendability.png' },
                      { label: 'A+ Fire Resistance',          image: '/fire_resistance.png' },
                      { label: 'A+ Earthquake Resistance',    image: '/icon_04_Eathquake.png' },
                    ];
                    const grid2x2 = (items, keyOffset) => (
                      <div className="pd-feat-row">
                        {items.map((f, i) => (
                          <div key={keyOffset + i} className="pd-feat-card">
                            <div className="pd-feat-img-wrap">
                              <img src={f.image} alt={f.label} />
                            </div>
                            <div className="pd-feat-label">{f.label}</div>
                          </div>
                        ))}
                      </div>
                    );
                    return (
                      <div className="pd-feat-wrap">
                        {grid2x2(features.slice(0, 4), 0)}
                        {grid2x2(features.slice(4, 8), 4)}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Physical Properties */}
              <div className="pd-sec" id="physical">
                <div className="pd-eyebrow"><span className="pd-eline" />Performance Data</div>
                <h2 className="pd-h2">Physical Properties</h2>
                <p className="pd-muted" style={{ marginBottom:'28px' }}>
                  TRIAM A+ {p.grade} doesn't just meet IS 1786:2008 — it comfortably exceeds the minimum limits and conforms to ISO 9001, ISO 14001, and ISO 45001.
                </p>
                <div className="pd-metrics">
                  {[
                    { note:'Proof Stress',   value: p.yieldStrength+'+', unit:'N/mm²', label:'Yield Strength',   icon:'⚙' },
                    { note:'Ultimate Load',  value: p.tensile+'+',       unit:'N/mm²', label:'Tensile Strength', icon:'⚡' },
                    { note:'Ductility',      value: '17+',               unit:'%',     label:'Elongation',       icon:'↔' },
                  ].map((m, i) => (
                    <div key={i} className="pd-metric">
                      <div className="pd-metric-bg">{m.icon}</div>
                      <div className="pd-metric-note">{m.note}</div>
                      <div className="pd-metric-val">{m.value}</div>
                      <div className="pd-metric-unit">{m.unit}</div>
                      <div className="pd-metric-lbl">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="pd-tbl-wrap">
                  <table className="pd-tbl" style={{ tableLayout:'fixed' }}>
                    <colgroup>
                      <col style={{ width:'44%' }} />
                      <col style={{ width:'28%' }} />
                      <col style={{ width:'28%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="pd-th">Property</th>
                        <th className="pd-th" style={{ textAlign:'center' }}>IS Standard</th>
                        <th className="pd-th pd-th-acc">Triam A+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {physicalRows.map((row, i) => {
                        const zebra = i%2===0 ? '#fff' : '#FAFAFA';
                        if (row.subRows) {
                          return row.subRows.map((s, j) => (
                            <tr key={`${i}-${j}`} style={{ background: zebra }}>
                              <td className="pd-td">
                                {j===0 && <span style={{ display:'block' }}>{row.label}{row.unit && <span style={{ fontSize:'11px', color:'#9CA3AF', fontWeight:400, marginLeft:'4px' }}>{row.unit}</span>}</span>}
                                <span style={{ display:'block', fontSize:'13px', color:'#6B7280', fontWeight:600, marginTop: j===0 ? '3px' : 0 }}>{s.cond}</span>
                              </td>
                              <td className="pd-td-mid">{s.std}</td>
                              <td className="pd-td-acc"><span className="pd-badge">{s.triam}</span></td>
                            </tr>
                          ));
                        }
                        return (
                          <tr key={i} style={{ background: zebra }}>
                            <td className="pd-td">
                              {row.label}
                              {row.unit && <span style={{ fontSize:'11px', color:'#9CA3AF', fontWeight:400, marginLeft:'4px' }}>{row.unit}</span>}
                            </td>
                            <td className="pd-td-mid">{row.std}</td>
                            <td className="pd-td-acc"><span className="pd-badge">{row.triam}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chemical Properties */}
              <div className="pd-sec" id="chemical">
                <div className="pd-eyebrow"><span className="pd-eline" />Composition Data</div>
                <h2 className="pd-h2">Chemical Properties</h2>
                <p className="pd-muted" style={{ marginBottom:'28px' }}>
                  Built on controlled chemistry — clean steel, lean composition. A low-alloy variant is also available with carbon controlled at 0.15% max for enhanced corrosion resistance.
                </p>
                <div className="pd-chem-grid">
                  {[
                    { dark:false, sub:'Standard Grade',    title:`TRIAM A+ ${p.grade}`,    vals: chemRows.map(c=>c.triam) },
                    { dark:true,  sub:'Low Alloy Variant', title:`TRIAM A+ ${p.grade} LA`, vals: chemRows.map(c=>c.triamLA) },
                  ].map((card, ci) => (
                    <div key={ci} className="pd-chem-card">
                      <div style={{ background: card.dark ? '#0a1222' : '#15294D', padding:'18px 20px' }}>
                        <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#F47C20', marginBottom:'4px', fontFamily:"'Montserrat', sans-serif" }}>{card.sub}</div>
                        <div style={{ fontSize:'14px', fontWeight:700, color:'#fff' }}>{card.title}</div>
                      </div>
                      {chemRows.map((c, i) => (
                        <div key={i} style={{ padding:'12px 18px', borderBottom: i<3?'1px solid #F0F2F5':'none', background: i%2===0?'#fff':'#FAFAFA', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:'12px', fontWeight:700, color:'#15294D', marginBottom:'1px' }}>{c.label}</div>
                            <div style={{ fontSize:'10px', color:'#9CA3AF' }}>{c.unit}</div>
                          </div>
                          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                            <span style={{ fontSize:'12px', color:'#9CA3AF' }}>{c.std}</span>
                            <span style={{ fontSize:'11px', color:'#E4E7EC' }}>→</span>
                            <span style={{ fontSize:'13px', fontWeight:700, color:'#d4621a', background:'rgba(212,98,26,0.07)', padding:'2px 9px', borderRadius:'5px' }}>{card.vals[i]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pd-chem-note">
                  <span style={{ fontSize:'18px', flexShrink:0, marginTop:'1px' }}>ℹ</span>
                  <p>Every ISI-certified TRIAM A+ {p.grade} bar delivers a combination of strength, ductility, and corrosion resistance that few rebars can match. The A+ quality shows in every inch of metal.</p>
                </div>
              </div>

              {/* Dimensional Tolerance */}
              <div className="pd-sec" id="tolerance">
                <div className="pd-eyebrow"><span className="pd-eline" />Dimensional Standards</div>
                <h2 className="pd-h2">Dimensional Tolerance</h2>
                <p className="pd-muted" style={{ marginBottom:'28px' }}>
                  Produced within tight dimensional tolerances per IS 1786:2008, ensuring consistent cross-sections, rib geometry, and weight per metre across every batch.
                </p>
                <div className="pd-tbl-wrap">
                  <table className="pd-tbl" style={{ tableLayout:'fixed' }}>
                    <colgroup>
                      <col style={{ width:'44%' }} />
                      <col style={{ width:'28%' }} />
                      <col style={{ width:'28%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="pd-th">Parameter</th>
                        <th className="pd-th" style={{ textAlign:'center' }}>IS 1786 Limit</th>
                        <th className="pd-th pd-th-acc">Triam A+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { param:'Mass (Weight/metre)', subRows:[
                          { cond:'≤ 10 mm',            limit:'±7%', triam:'±4%' },
                          { cond:'> 10 mm to ≤ 16 mm', limit:'±5%', triam:'±4%' },
                          { cond:'> 16 mm',            limit:'±3%', triam:'±3%' },
                        ] },
                        { param:'Rib Height',          limit:'≥ 0.05d',triam:'Exceeds' },
                        { param:'Rib Spacing',         limit:'≤ 0.7d', triam:'Compliant' },
                      ].map((row, i) => {
                        const zebra = i%2===0?'#fff':'#FAFAFA';
                        if (row.subRows) {
                          return row.subRows.map((s, j) => (
                            <tr key={`${i}-${j}`} style={{ background: zebra }}>
                              <td className="pd-td">
                                {j===0 && <span style={{ display:'block' }}>{row.param}</span>}
                                <span style={{ display:'block', fontSize:'13px', color:'#6B7280', fontWeight:600, marginTop: j===0 ? '3px' : 0 }}>{s.cond}</span>
                              </td>
                              <td className="pd-td-mid">{s.limit}</td>
                              <td className="pd-td-acc"><span className="pd-badge">{s.triam}</span></td>
                            </tr>
                          ));
                        }
                        return (
                          <tr key={i} style={{ background: zebra }}>
                            <td className="pd-td">{row.param}</td>
                            <td className="pd-td-mid">{row.limit}</td>
                            <td className="pd-td-acc"><span className="pd-badge">{row.triam}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Seismic Resistance */}
              <div className="pd-sec" id="seismic">
                <div className="pd-eyebrow"><span className="pd-eline" />Earthquake Safety</div>
                <h2 className="pd-h2">Seismic Resistance</h2>
                <p className="pd-muted" style={{ marginBottom:'24px' }}>
                  Structures in seismic zones need strength with more ductility. TRIAM A+ {p.grade} delivers both.
                </p>
                <div className="pd-grid2">
                  {[
                    { icon:'🔁', title:'High Elongation',     text:'17%+ elongation ensures the bar stretches before it breaks — critical for seismic shock absorption.' },
                    { icon:'⚖',  title:'TS/YS Ratio 1.15',   text:'A higher tensile-to-yield ratio provides a safety margin against sudden overload during earthquakes.' },
                    { icon:'🔩', title:'Superior Bendability', text:'Bend & rebend test with lower mandrel diameter then as specified in BIS confirm resistance cracking under cyclic stress.' },
                    { icon:'🛡', title:'No Residual Stress',   text:'Unlike cold-twisted bars, TMT bars carry no locked-in stress — stable under repeated seismic loading.' },
                  ].map((item, i) => (
                    <div key={i} className="pd-icard">
                      <span className="pd-icard-icon">{item.icon}</span>
                      <div><div className="pd-icard-title">{item.title}</div><div className="pd-icard-text">{item.text}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corrosion Resistance */}
              <div className="pd-sec" id="corrosion">
                <div className="pd-eyebrow"><span className="pd-eline" />Durability</div>
                <h2 className="pd-h2">Corrosion Resistance</h2>
                <p className="pd-muted" style={{ marginBottom:'24px' }}>
                  Controlled carbon, sulphur, and phosphorus levels — combined with Thermax quenching — produce a bar with naturally superior corrosion resistance.
                </p>
                <div className="pd-corrosion-box" style={{ background:'#fff', border:'1px solid #E4E7EC', borderRadius:'14px' }}>
                  <div className="pd-grid3">
                    {[
                      { label:'Carbon ≤ 0.20%',  sub:'Low carbon minimises carbide precipitation at grain boundaries — a primary corrosion trigger.' },
                      { label:'S + P ≤ 0.075%', sub:'Combined sulphur and phosphorus content is tightly controlled to reduce micro-galvanic corrosion.' },
                      { label:'Low Alloy Variant',sub:'Our LA grade holds carbon at ≤ 0.15%, offering enhanced resistance for coastal and humid environments.' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'17px', fontWeight:700, color:'#d4621a', marginBottom:'6px' }}>{item.label}</div>
                        <div style={{ fontSize:'13px', color:'#4B5563', lineHeight:1.7 }}>{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="pd-video">
                <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://enquiry.triamtmt.com/images/tab-img6.jpg)', backgroundSize:'cover', backgroundPosition:'center' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,18,34,0.9) 0%, rgba(10,18,34,0.5) 100%)' }} />
                <div style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'22px' }}>Watch the manufacturing process</div>
                  <a
                    href="https://www.youtube.com/watch?v=BNEq6JcQK0M"
                    target="_blank" rel="noreferrer"
                    onMouseEnter={() => setVideoHover(true)}
                    onMouseLeave={() => setVideoHover(false)}
                    style={{ width:'80px', height:'80px', background: videoHover?'#FF9240':'#F47C20', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', color:'#fff', textDecoration:'none', boxShadow: videoHover?'0 0 0 14px rgba(244,124,32,0.22),0 0 0 28px rgba(244,124,32,0.1)':'0 0 0 10px rgba(244,124,32,0.15),0 0 0 22px rgba(244,124,32,0.07)', transition:'all 0.3s ease', marginBottom:'22px', transform: videoHover?'scale(1.08)':'scale(1)' }}
                  >
                    <i className="fa-solid fa-play" style={{ marginLeft:'4px' }} />
                  </a>
                  <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'22px', fontWeight:800, color:'#fff', textTransform:'uppercase' }}>See Thermax Technology in Action</div>
                </div>
              </div>

              {/* Packaging */}
              <div className="pd-sec" id="packaging">
                <div className="pd-eyebrow"><span className="pd-eline" />Delivery & Handling</div>
                <h2 className="pd-h2">Product Packaging</h2>
                <p className="pd-muted" style={{ marginBottom:'24px' }}>
                  Every bundle of TRIAM A+ {p.grade} is prepared with standard norms of packaging — tagged, bound, and traceable from mill to site.
                </p>
                <div className="pd-grid2">
                  {[
                    { icon:'📦', title:'Bundle Weight',        text:'Standard bundle: approx. 2 MT, adjustable to customer requirement.' },
                    { icon:'🏷', title:'IS Tag',               text:'Each bundle carries an IS-compliant tag — grade, heat number, size, weight, and manufacturer details.' },
                    { icon:'🔗', title:'Wire Binding',         text:'Secured with MS binding wire at regular intervals to prevent damage during transit and handling.' },
                    { icon:'📋', title:'Mill Test Certificate', text:'MTC available for every heat — physical, chemical, and dimensional test data on record.' },
                  ].map((item, i) => (
                    <div key={i} className="pd-icard">
                      <span className="pd-icard-icon">{item.icon}</span>
                      <div><div className="pd-icard-title">{item.title}</div><div className="pd-icard-text">{item.text}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div className="pd-sec" id="quality">
                <div className="pd-eyebrow"><span className="pd-eline" />Testing & Certification</div>
                <h2 className="pd-h2">Quality Checks</h2>
                <p className="pd-muted" style={{ marginBottom:'24px' }}>
                  Every heat of TRIAM A+ undergoes rigorous in-house testing before dispatch. Our laboratory is equipped for full IS 1786:2008 verification.
                </p>
                <div className="pd-qtbl">
                  {[
                    { test:'Tensile Test',      freq:'Every Heat', detail:'Yield strength, tensile strength, and elongation measured as per IS 1786.' },
                    { test:'Bend Test',         freq:'Every Heat', detail:'Bar bent through 180° around a mandrel of specified diameter without cracking.' },
                    { test:'Rebend Test',       freq:'Every Heat', detail:'Bar bent, aged at 100°C, then rebent — verifies ductility after strain ageing.' },
                    { test:'Chemical Analysis', freq:'Every Heat', detail:'Spectrometer analysis for C, S, P, Mn, Si — full ladle and product analysis.' },
                    { test:'Dimensional Check', freq:'Continuous', detail:'Mass per metre, diameter, rib height, and spacing checked during rolling.' },
                  ].map((row, i) => (
                    <div key={i} className="pd-qrow">
                      <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'15px', fontWeight:700, color:'#fff' }}>{row.test}</div>
                      <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'10px', fontWeight:700, color:'#F47C20', textTransform:'uppercase', letterSpacing:'0.08em' }}>{row.freq}</div>
                      <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>{row.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div className="pd-sec" id="advantages">
                <div className="pd-eyebrow"><span className="pd-eline" />Why Choose Triam A+</div>
                <h2 className="pd-h2">Advantages at a Glance</h2>
                <div className="pd-adv-grid">
                  {[
                    'Higher yield and tensile strength than IS 1786:2008 minimums',
                    'Superior elongation (17%+) for seismic and ductility requirements',
                    'Better weldability — low carbon equivalent reduces heat-affected zone brittleness',
                    'No residual stress — unlike cold-twisted bars',
                    'ISI Mark certified — IS 1786:2008 compliant every batch',
                    'ISO 9001:2015, ISO 14001, and ISO 45001 certified facility',
                    'Thermax technology from HSE, Germany — patented quenching process',
                    'Low alloy (LA) variant available for coastal and humid environments',
                  ].map((text, i) => (
                    <div key={i} className="pd-adv-item">
                      <span style={{ color:'#F47C20', fontSize:'16px', flexShrink:0, marginTop:'1px' }}>✓</span>
                      <span style={{ fontSize:'13.5px', fontWeight:600, color:'#15294D', lineHeight:1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="pd-sec">
                <div className="pd-eyebrow"><span className="pd-eline" />Common Questions</div>
                <h2 className="pd-h2">FAQ</h2>
                <div style={{ marginTop:'24px' }}>
                  {faqs.map((faq, idx) => {
                    const open = activeFaq === idx;
                    return (
                      <div key={idx} className={`pd-faq${open?' open':''}`}>
                        <button className="pd-faq-btn" onClick={() => setActiveFaq(open ? -1 : idx)}>
                          <div className="pd-faq-q-wrap">
                            <span className="pd-faq-num" style={{ background: open?'#F47C20':'#F0F2F5', color: open?'#fff':'#6B7280' }}>
                              {String(idx+1).padStart(2,'0')}
                            </span>
                            <span style={{ fontSize:'15px', fontWeight:700, color: open?'#15294D':'#374151' }}>{faq.q}</span>
                          </div>
                          <span className="pd-faq-ico" style={{ background: open?'rgba(244,124,32,0.1)':'#F0F2F5', color: open?'#F47C20':'#9CA3AF', transform: open?'rotate(45deg)':'none' }}>
                            <i className="fa-solid fa-plus" />
                          </span>
                        </button>
                        {open && (
                          <div className="pd-faq-body">
                            <div style={{ paddingTop:'16px' }}>{faq.a}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pd-cta-wrap">
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(140deg, #0a1222 0%, #15294D 100%)' }} />
                <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize:'cover', opacity:0.08 }} />
                <div style={{ position:'absolute', top:'-40%', left:'-10%', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(244,124,32,0.14) 0%, transparent 65%)' }} />
                <div style={{ display:'flex', width:'100%' }}>
                  <div className="pd-cta-left">
                    <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#F47C20', marginBottom:'12px' }}>Get In Touch</div>
                    <h3 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'clamp(30px, 3.5vw, 42px)', fontWeight:900, color:'#fff', textTransform:'uppercase', lineHeight:1.05, marginBottom:'24px', maxWidth:'320px' }}>Ready to build something great?</h3>
                    <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#F47C20', color:'#fff', padding:'13px 26px', borderRadius:'8px', fontSize:'13px', fontWeight:700, textDecoration:'none', boxShadow:'0 6px 24px rgba(244,124,32,0.32)', fontFamily:"'Montserrat', sans-serif" }}>
                      Contact Us &nbsp;<i className="fa-solid fa-arrow-right" style={{ fontSize:'12px' }} />
                    </Link>
                  </div>
                  <div className="pd-cta-right">
                    <img src="/bsg.jpg" alt="Build something great" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #0d1e38 0%, transparent 55%)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="pd-sidebar">

              {/* Grade Specs */}
              <div className="pd-specs-card">
                <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'9px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#F47C20', marginBottom:'6px' }}>Product Specifications</div>
                  <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'22px', fontWeight:800, color:'#fff', textTransform:'uppercase' }}>{p.grade} · {p.size}</div>
                </div>
                <div className="pd-specs-grid">
                  {[
                    { label:'Yield Strength', val: p.yieldStrength+'+', unit:'N/mm²' },
                    { label:'Tensile Str.',   val: p.tensile+'+',       unit:'N/mm²' },
                    { label:'Elongation',     val:'17+',                unit:'%' },
                    { label:'TS/YS Ratio',    val:'1.15',               unit:'' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:'9px', fontWeight:600, color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'4px' }}>{s.label}</div>
                      <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'30px', fontWeight:800, color:'#F47C20', lineHeight:1 }}>{s.val}</div>
                      {s.unit && <div style={{ fontSize:'9px', color:'rgba(255,255,255,0.22)', marginTop:'2px' }}>{s.unit}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ padding:'16px 24px' }}>
                  <Link to="/contact" className="pd-quote-btn">Request a Quote</Link>
                </div>
              </div>

              {/* On-Page Nav */}
              <div className="pd-nav-card">
                <div className="pd-card-hdr">
                  <div className="pd-card-hdr-bar" />
                  <h5 className="pd-card-hdr-title">On This Page</h5>
                </div>
                <div style={{ padding:'8px 0' }}>
                  {sidebarLinks.map((link, idx) => (
                    <a key={idx} href={`#${link.id}`} className="pd-nav-link">
                      <span>{link.name}</span>
                      <i className="ri-arrow-right-line" style={{ color:'#F47C20', fontSize:'15px', flexShrink:0 }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="pd-cta-card" style={{ position:'relative' }}>
                <div style={{ position:'absolute', inset:0, background:'#15294D', borderRadius:'14px' }} />
                <div style={{ position:'absolute', top:'-30%', right:'0', width:'200px', height:'200px', background:'radial-gradient(circle, rgba(244,124,32,0.13) 0%, transparent 65%)' }} />
                <div style={{ position:'relative', zIndex:2 }}>
                  <div style={{ width:'48px', height:'48px', background:'rgba(244,124,32,0.14)', border:'1px solid rgba(244,124,32,0.28)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'22px' }}>💬</div>
                  <h3 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:'34px', fontWeight:900, color:'#fff', textTransform:'uppercase', lineHeight:1.1, marginBottom:'10px' }}>Have a<br />project<br />in mind?</h3>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.42)', marginBottom:'24px', lineHeight:1.7 }}>Our team is ready to help you choose the right grade for your project.</p>
                  <Link to="/contact" style={{ display:'inline-block', background:'#F47C20', color:'#fff', padding:'12px 30px', borderRadius:'8px', fontSize:'13px', fontWeight:700, textDecoration:'none', boxShadow:'0 6px 22px rgba(244,124,32,0.28)', fontFamily:"'Montserrat', sans-serif" }}>Let's Talk</Link>
                </div>
              </div>

              {/* Downloads */}
              <div className="pd-dl-card">
                <div className="pd-card-hdr">
                  <div className="pd-card-hdr-bar" />
                  <h5 className="pd-card-hdr-title">Downloads</h5>
                </div>
                <div style={{ padding:'16px' }}>
                  {[
                    { label:'Annual Report 2023–24',  href:'#',                                                                                                                           iconClass:'ri-article-line' },
                    { label:'Product Brochure PDF',   href:'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/YTJbUO6ba8jZmZkQGeBPNe7jSbwTNOCMnho0fwyN.pdf',               iconClass:'ri-file-pdf-line' },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target={item.href!=='#'?'_blank':undefined} rel="noreferrer" className="pd-dl-item" style={{ marginBottom: i===0?'8px':0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px', minWidth:0, flex:1 }}>
                        <i className={item.iconClass} style={{ fontSize:'18px', color:'#F47C20', flexShrink:0 }} />
                        <span style={{ fontSize:'13px', fontWeight:600, color:'#15294D', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.label}</span>
                      </div>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'3px', fontSize:'11px', fontWeight:700, color:'#F47C20', flexShrink:0, whiteSpace:'nowrap', marginLeft:'8px', fontFamily:"'Montserrat', sans-serif" }}>
                        <i className="ri-download-2-line" style={{ fontSize:'13px' }} />
                        Download
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
