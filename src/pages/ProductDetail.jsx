import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

/* ─── tiny hook: animate a number from 0 to target ─── */
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

export default function ProductDetail() {
  const { slug } = useParams();
  const currentSlug =
    slug || window.location.pathname.replace('/', '') || 'Fe-550D-Grade-TMT-16mm-20mm';

  const products = {
    'Fe-500D-Grade-TMT-8mm-12mm': {
      title: 'Fe 500D Grade TMT',
      size: '8mm – 12mm',
      grade: 'Fe 500D',
      gradeCode: '500D',
      yieldStrength: '500',
      tensile: '565',
      elongation: '17',
      desc: 'Ideal for stirrups, slabs, staircases, beams & columns in residential & low-rise buildings. Balances cost with long-term longevity.',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg:
        'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['Stirrups', 'Slabs', 'Staircases', 'Beams', 'Columns', 'Residential'],
      accentGradient: 'linear-gradient(135deg, #718096 0%, #4a5568 100%)',
    },
    'Fe-550D-Grade-TMT-16mm-20mm': {
      title: 'Fe 550D Grade TMT',
      size: '16mm – 20mm',
      grade: 'Fe 550D',
      gradeCode: '550D',
      yieldStrength: '550',
      tensile: '600',
      elongation: '17',
      desc: 'Built for beams, columns & high-load slabs. Engineered for crack resistance and continuous-load endurance in high-density residential and infrastructure projects.',
      image: '/product1.png',
      breadcrumbBg:
        'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['Beams', 'Columns', 'High-Load Slabs', 'Residential Towers', 'Infrastructure', 'Industrial Frames'],
      accentGradient: 'linear-gradient(135deg, #e48915 0%, #c8401a 100%)',
    },
    'Fe-550D-Grade-TMT-25mm-32mm': {
      title: 'Fe 550D Grade TMT',
      size: '25mm – 32mm',
      grade: 'Fe 550D',
      gradeCode: '550D',
      yieldStrength: '550',
      tensile: '600',
      elongation: '17',
      desc: 'Suited for high-rise buildings, bridges, dams & heavy industrial structures. Withstands wind, seismic forces and sustained vertical stress under the most demanding environments.',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg:
        'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png',
      applications: ['High-Rise', 'Bridges', 'Dams', 'Power Plants', 'Heavy Industry', 'Seismic Zones'],
      accentGradient: 'linear-gradient(135deg, #ecc94b 0%, #b7791f 100%)',
    },
  };

  const p = products[currentSlug] || products['Fe-550D-Grade-TMT-16mm-20mm'];
  const [activeFaq, setActiveFaq] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const yieldVal = useCountUp(p.yieldStrength, 1000, heroVisible);
  const tensileVal = useCountUp(p.tensile, 1100, heroVisible);

  const faqs = [
    { q: 'What is a TMT bar?', a: "Thermo-Mechanically Treated (TMT) bars have a tough outer shell and a soft inner core. Triam A+ gives you the perfect balance of strength and flexibility needed for modern construction." },
    { q: 'Where are TMT bars generally used?', a: "Triam A+ is versatile — from office buildings and schools to massive projects like dams, power plants, bridges, and residential complexes." },
    { q: 'How are TMT bars manufactured?', a: 'We produce our rebars from Block Mill using advanced Thermax technology from HSE, Germany — patented quenching technology that delivers consistent mechanical properties.' },
    { q: 'What are the features of TMT bars?', a: 'Our bars offer high strength, superior flexibility, seismic resistance, and excellent weldability — attributed to controlled carbon content and regulated sulphur & phosphorous levels.' },
    { q: 'How are TMT bars superior to traditional steel bars?', a: 'Unlike cold-twisted bars, our TMT bars carry no internal residual stresses — meaning better corrosion resistance, greater ductility, and significantly longer service life.' },
    { q: 'What are the properties of good quality TMT bars?', a: 'A good bar bends without snapping. Our bars feature high bendability, a scientific rib pattern, and a solid lock with concrete — verified through rigorous bend and rebend testing.' },
  ];

  const sidebarLinks = [
    { name: 'Future Ready Technology', id: 'future' },
    { name: 'Physical Properties & Strength', id: 'physical' },
    { name: 'Chemical Properties', id: 'chemical' },
    { name: 'Dimensional Tolerance', id: 'tolerance' },
    { name: 'Seismic Resistance', id: 'seismic' },
    { name: 'Corrosion Resistance', id: 'corrosion' },
    { name: 'Application Areas', id: 'application' },
    { name: 'Product Packaging', id: 'packaging' },
    { name: 'Quality Checks', id: 'quality' },
    { name: 'Advantages at a Glance', id: 'advantages' },
  ];

  const physicalRows = [
    { label: '0.2% Proof Stress', unit: 'N/mm²', std: p.grade === 'Fe 500D' ? '500' : '550', triam: p.grade === 'Fe 500D' ? '500+' : '550+' },
    { label: 'Tensile Strength', unit: 'N/mm²', std: p.grade === 'Fe 500D' ? '565' : '600', triam: p.grade === 'Fe 500D' ? '565+' : '600+' },
    { label: 'Elongation', unit: '%', std: '14.5', triam: '17+' },
    { label: 'Elongation at Max. Force', unit: '%', std: '5', triam: '7+' },
    { label: 'TS / YS Ratio', unit: '', std: '1.08', triam: '1.15' },
    { label: 'Bend', unit: '', std: '4D–5D', triam: '3D–4D' },
    { label: 'Rebend', unit: '', std: '6D–7D', triam: '5D–6D' },
  ];

  const chemRows = [
    { label: 'Carbon', unit: '% Max', std: '0.250', triam: '0.200', triamLA: '0.150' },
    { label: 'Sulphur', unit: '% Max', std: '0.040', triam: '0.040', triamLA: '0.040' },
    { label: 'Phosphorous', unit: '% Max', std: '0.040', triam: '0.040', triamLA: '0.090' },
    { label: 'S + P', unit: '% Max', std: '0.075', triam: '0.075', triamLA: '0.130' },
  ];

  /* ─── inline style helpers ─── */
  const S = {
    /* page */
    page: { backgroundColor: '#f4f3ee', minHeight: '100vh' },

    /* ─ HERO ─ */
    hero: {
      position: 'relative',
      background: 'linear-gradient(160deg, #080f18 0%, #0d1621 45%, #1b2a3a 100%)',
      overflow: 'hidden',
      paddingTop: '90px',
      paddingBottom: '0',
      minHeight: '480px',
    },
    heroBgImg: {
      position: 'absolute', inset: 0,
      backgroundImage: `url(${p.breadcrumbBg})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      opacity: 0.08,
    },
    heroGlowTop: {
      position: 'absolute', top: '-120px', right: '-60px',
      width: '600px', height: '600px',
      background: 'radial-gradient(circle, rgba(228,137,21,0.13) 0%, transparent 65%)',
      pointerEvents: 'none',
    },
    heroGlowBot: {
      position: 'absolute', bottom: '0', left: '-80px',
      width: '400px', height: '400px',
      background: 'radial-gradient(circle, rgba(200,64,26,0.08) 0%, transparent 65%)',
      pointerEvents: 'none',
    },
    heroNoise: {
      position: 'absolute', inset: 0,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      pointerEvents: 'none',
    },
    heroDiagonal: {
      position: 'absolute', bottom: -2, left: 0, right: 0,
      height: '80px',
      background: '#f4f3ee',
      clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
      zIndex: 4,
    },
    heroInner: {
      position: 'relative', zIndex: 3,
      maxWidth: '1240px', margin: '0 auto', padding: '0 24px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: '32px', flexWrap: 'wrap',
    },
    heroLeft: {
      flex: '1', minWidth: '280px', paddingBottom: '80px',
      opacity: heroVisible ? 1 : 0,
      transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    },
    heroPill: {
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: 'rgba(228,137,21,0.12)',
      border: '1px solid rgba(228,137,21,0.28)',
      borderRadius: '50px',
      padding: '5px 14px 5px 10px',
      marginBottom: '20px',
    },
    heroPillDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#e48915', flexShrink: 0 },
    heroPillText: { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e48915' },
    heroGradeBadge: {
      display: 'inline-block',
      background: p.accentGradient,
      color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase',
      padding: '4px 14px', borderRadius: '4px', marginBottom: '14px',
    },
    heroH1: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 'clamp(52px, 9vw, 96px)',
      fontWeight: 900, color: '#fff',
      textTransform: 'uppercase', lineHeight: 0.88,
      letterSpacing: '-2px', marginBottom: '10px',
    },
    heroSize: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 'clamp(38px, 5.5vw, 68px)',
      fontWeight: 700, color: '#e48915',
      letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '22px',
    },
    heroDesc: { color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, maxWidth: '500px', marginBottom: '28px' },
    heroBreadcrumb: { display: 'flex', gap: '8px', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 },
    heroRight: {
      display: 'flex', flexDirection: 'column', gap: '12px',
      paddingTop: '60px', paddingBottom: '80px', flexShrink: 0,
      opacity: heroVisible ? 1 : 0,
      transform: heroVisible ? 'translateX(0)' : 'translateX(24px)',
      transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
    },
    heroStatCard: {
      background: 'rgba(255,255,255,0.045)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px', padding: '18px 24px',
      backdropFilter: 'blur(12px)',
      minWidth: '155px',
    },
    heroStatLabel: { fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' },
    heroStatValue: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '42px', fontWeight: 900, color: '#e48915', lineHeight: 1 },
    heroStatUnit: { fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' },

    /* ─ LAYOUT ─ */
    mainSection: { padding: '64px 0 88px' },

    /* ─ IMAGE CARD ─ */
    imgCard: {
      position: 'relative', borderRadius: '20px', overflow: 'hidden',
      marginBottom: '52px',
      boxShadow: '0 24px 64px rgba(27,42,58,0.18), 0 0 0 1px rgba(27,42,58,0.06)',
    },
    imgEl: { width: '100%', height: '420px', objectFit: 'cover', display: 'block' },
    imgOverlay: {
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(8,15,24,0.92) 0%, rgba(8,15,24,0.28) 48%, transparent 100%)',
    },
    imgBottom: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '28px 32px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px',
    },
    imgGradeLabel: { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e48915', marginBottom: '5px' },
    imgGradeTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '26px', fontWeight: 800, color: '#fff', textTransform: 'uppercase' },
    imgTagRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' },
    imgTag: {
      background: 'rgba(228,137,21,0.18)', border: '1px solid rgba(228,137,21,0.38)',
      color: '#e48915', fontSize: '10px', fontWeight: 700,
      padding: '4px 11px', borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase',
    },

    /* ─ SECTION EYEBROW / HEADING ─ */
    eyebrow: {
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
      color: '#e48915', marginBottom: '12px',
    },
    eyebrowLine: { width: '22px', height: '2px', background: '#e48915', flexShrink: 0, borderRadius: '1px' },
    sectionH2: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 'clamp(36px, 5vw, 52px)',
      fontWeight: 900, color: '#1b2a3a',
      textTransform: 'uppercase', lineHeight: 0.95,
      marginBottom: '16px', letterSpacing: '-0.5px',
    },
    bodyText: { color: '#5a6a7a', fontSize: '15px', lineHeight: 1.82 },
    bodyTextMuted: { color: '#8a8a8a', fontSize: '14px', lineHeight: 1.8 },

    /* ─ TAGS ─ */
    tagRow: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px', marginBottom: '52px' },
    tag: {
      background: '#fff', border: '1.5px solid #ddd8cf',
      borderRadius: '50px', padding: '7px 18px',
      fontSize: '12px', fontWeight: 700, color: '#1b2a3a', letterSpacing: '0.3px',
    },

    /* ─ CROSS SECTION IMAGE ─ */
    crossImg: {
      marginBottom: '52px', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid #ddd8cf', background: '#fff',
      boxShadow: '0 8px 32px rgba(27,42,58,0.07)',
    },
    crossCaption: {
      padding: '14px 22px', background: '#1b2a3a',
      display: 'flex', alignItems: 'center', gap: '12px',
    },
    crossCaptionBar: { width: '3px', height: '22px', background: '#e48915', borderRadius: '2px', flexShrink: 0 },
    crossCaptionText: { fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.52)', letterSpacing: '0.3px' },

    /* ─ KEY METRICS CARDS ─ */
    metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' },
    metricCard: {
      background: '#1b2a3a', borderRadius: '16px', padding: '24px 20px',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 8px 28px rgba(27,42,58,0.18)',
    },
    metricBg: { position: 'absolute', bottom: -16, right: -14, fontSize: '72px', opacity: 0.05, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' },
    metricNote: { fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '8px' },
    metricValue: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '52px', fontWeight: 900, color: '#e48915', lineHeight: 1 },
    metricUnit: { fontSize: '10px', color: 'rgba(255,255,255,0.32)', margin: '4px 0 10px' },
    metricLabel: { fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.55)' },

    /* ─ COMPARISON TABLE ─ */
    compTable: {
      background: '#fff', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid #ddd8cf',
      boxShadow: '0 6px 24px rgba(27,42,58,0.07)',
      marginBottom: '52px',
    },
    compHead: { background: '#1b2a3a', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr' },
    compHeadCell: (accent) => ({
      padding: '16px 20px', fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
      textTransform: 'uppercase',
      color: accent ? '#e48915' : 'rgba(255,255,255,0.38)',
      textAlign: accent ? 'center' : undefined,
    }),
    compRow: (even) => ({
      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
      borderBottom: '1px solid #f0ebe3',
      background: even ? '#fff' : '#fdfcfa',
    }),
    compCell: {
      padding: '14px 20px', fontSize: '13.5px', fontWeight: 600, color: '#1b2a3a',
    },
    compCellMid: {
      padding: '14px 20px', fontSize: '13.5px', color: '#9aabba', textAlign: 'center', fontWeight: 500,
    },
    compCellAccent: { padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    compBadge: {
      display: 'inline-block',
      background: 'rgba(228,137,21,0.08)', border: '1px solid rgba(228,137,21,0.22)',
      borderRadius: '6px', padding: '3px 13px',
      fontSize: '13.5px', fontWeight: 700, color: '#c8401a',
    },

    /* ─ CHEM TABLES ─ */
    chemGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' },
    chemCard: { background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd8cf' },
    chemHead: (dark) => ({ background: dark ? '#080f18' : '#1b2a3a', padding: '18px 20px' }),
    chemHeadSub: { fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#e48915', marginBottom: '4px' },
    chemHeadTitle: { fontSize: '14px', fontWeight: 700, color: '#fff' },
    chemRow: (even) => ({
      padding: '12px 18px', borderBottom: '1px solid #f0ebe3',
      background: even ? '#fff' : '#fdfcfa',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }),
    chemRowLabel: { fontSize: '12px', fontWeight: 700, color: '#1b2a3a', marginBottom: '1px' },
    chemRowUnit: { fontSize: '10px', color: '#9aabba' },
    chemRowValues: { display: 'flex', gap: '12px', alignItems: 'center' },
    chemStd: { fontSize: '12px', color: '#9aabba' },
    chemArrow: { fontSize: '11px', color: '#ddd8cf' },
    chemBadge: { fontSize: '13px', fontWeight: 700, color: '#c8401a', background: 'rgba(200,64,26,0.07)', padding: '2px 9px', borderRadius: '5px' },
    chemNote: {
      padding: '16px 20px', background: '#fffaf4', borderRadius: '12px',
      border: '1px solid rgba(228,137,21,0.18)',
      display: 'flex', gap: '13px', alignItems: 'flex-start',
      marginBottom: '52px',
    },
    chemNoteIcon: { fontSize: '18px', flexShrink: 0, marginTop: '1px' },
    chemNoteText: { margin: 0, fontSize: '13px', color: '#7a4a1a', lineHeight: 1.75 },

    /* ─ VIDEO ─ */
    videoCard: {
      marginBottom: '52px', borderRadius: '20px', overflow: 'hidden',
      position: 'relative', height: '340px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
    },
    videoBg: { position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center' },
    videoOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,15,24,0.88) 0%, rgba(8,15,24,0.5) 100%)' },
    videoContent: {
      position: 'absolute', inset: 0, zIndex: 2,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    },
    videoTag: { fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '22px' },
    videoPlayBtn: (hover) => ({
      width: '84px', height: '84px',
      background: hover ? '#f5a520' : '#e48915',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '26px', color: '#fff',
      textDecoration: 'none',
      boxShadow: hover
        ? '0 0 0 14px rgba(228,137,21,0.22), 0 0 0 28px rgba(228,137,21,0.1), 0 12px 40px rgba(228,137,21,0.45)'
        : '0 0 0 10px rgba(228,137,21,0.15), 0 0 0 22px rgba(228,137,21,0.07), 0 8px 28px rgba(228,137,21,0.35)',
      transition: 'all 0.3s ease',
      marginBottom: '22px',
      transform: hover ? 'scale(1.08)' : 'scale(1)',
    }),
    videoTitle: {
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '22px', fontWeight: 800, color: '#fff',
      textTransform: 'uppercase', letterSpacing: '0.5px',
    },

    /* ─ FAQ ─ */
    faqItem: (active) => ({
      background: '#fff', borderRadius: '12px', overflow: 'hidden',
      border: `1.5px solid ${active ? '#e48915' : '#ddd8cf'}`,
      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      boxShadow: active ? '0 4px 22px rgba(228,137,21,0.1)' : 'none',
      marginBottom: '8px',
    }),
    faqBtn: {
      width: '100%', padding: '20px 24px',
      background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: '16px', textAlign: 'left',
    },
    faqNum: (active) => ({
      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
      background: active ? '#e48915' : '#f0ebe3',
      color: active ? '#fff' : '#8a8a8a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: '12px', fontWeight: 800, transition: 'all 0.25s ease',
    }),
    faqQ: (active) => ({ fontSize: '15px', fontWeight: 700, color: active ? '#1b2a3a' : '#3a4557' }),
    faqIcon: (active) => ({
      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
      background: active ? 'rgba(228,137,21,0.1)' : '#f0ebe3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', color: active ? '#e48915' : '#8a8a8a',
      transition: 'all 0.25s ease',
      transform: active ? 'rotate(45deg)' : 'none',
    }),
    faqBody: { padding: '0 24px 20px 68px', fontSize: '14px', color: '#5a6a7a', lineHeight: 1.82, borderTop: '1px solid #f0ebe3' },

    /* ─ BOTTOM CTA ─ */
    bottomCta: {
      borderRadius: '20px', overflow: 'hidden',
      position: 'relative', display: 'flex', minHeight: '220px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    },
    bottomCtaBg: { position: 'absolute', inset: 0, background: 'linear-gradient(140deg, #080f18 0%, #1b2a3a 100%)' },
    bottomCtaTexture: { position: 'absolute', inset: 0, backgroundSize: 'cover', opacity: 0.1 },
    bottomCtaGlow: { position: 'absolute', top: '-40%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(228,137,21,0.14) 0%, transparent 65%)' },
    bottomCtaInner: { position: 'relative', zIndex: 2, display: 'flex', width: '100%', alignItems: 'stretch' },
    bottomCtaLeft: { flex: 1, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    bottomCtaTag: { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e48915', marginBottom: '12px' },
    bottomCtaH3: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '24px', maxWidth: '320px' },
    bottomCtaBtn: {
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: '#e48915', color: '#fff',
      padding: '13px 26px', borderRadius: '8px',
      fontSize: '13px', fontWeight: 700, textDecoration: 'none',
      alignSelf: 'flex-start',
      boxShadow: '0 6px 24px rgba(228,137,21,0.32)',
      transition: 'all 0.25s ease',
    },
    bottomCtaRight: { width: '38%', position: 'relative', flexShrink: 0 },
    bottomCtaRightImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
    bottomCtaRightFade: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0d1621 0%, transparent 55%)' },

    /* ─ SIDEBAR ─ */
    sidebar: { position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' },

    /* specs card */
    specsCard: { background: '#1b2a3a', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 36px rgba(27,42,58,0.2)' },
    specsCardHead: { padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' },
    specsCardHeadSub: { fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e48915', marginBottom: '6px' },
    specsCardHeadTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 800, color: '#fff', textTransform: 'uppercase' },
    specsGrid: { padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', borderBottom: '1px solid rgba(255,255,255,0.07)' },
    specItem: {},
    specLabel: { fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' },
    specVal: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '30px', fontWeight: 800, color: '#e48915', lineHeight: 1 },
    specUnit: { fontSize: '9px', color: 'rgba(255,255,255,0.22)', marginTop: '2px' },
    specsFooter: { padding: '16px 24px' },
    specsBtn: {
      display: 'block', textAlign: 'center',
      background: '#e48915', color: '#fff',
      padding: '12px', borderRadius: '8px',
      fontSize: '13px', fontWeight: 700, textDecoration: 'none',
      transition: 'background 0.2s ease, transform 0.2s ease',
    },

    /* nav widget */
    navWidget: { background: '#fff', border: '1px solid #ddd8cf', borderRadius: '16px', overflow: 'hidden' },
    navWidgetHead: { padding: '16px 24px', borderBottom: '1px solid #ddd8cf', display: 'flex', alignItems: 'center', gap: '12px' },
    navWidgetBar: { width: '3px', height: '18px', background: '#e48915', borderRadius: '2px' },
    navWidgetTitle: { margin: 0, fontSize: '14px', fontWeight: 800, color: '#1b2a3a' },
    navLink: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 24px',
      fontSize: '13px', fontWeight: 600, color: '#3a4557', textDecoration: 'none',
      borderLeft: '2px solid transparent',
      transition: 'all 0.18s ease',
    },

    /* CTA card */
    ctaCard: { borderRadius: '16px', overflow: 'hidden', position: 'relative', textAlign: 'center', padding: '44px 28px' },
    ctaCardBg: { position: 'absolute', inset: 0, background: '#1b2a3a' },
    ctaCardTexture: { position: 'absolute', inset: 0, backgroundSize: 'cover', opacity: 0.15 },
    ctaCardGlow: { position: 'absolute', top: '-30%', right: '-20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(228,137,21,0.13) 0%, transparent 65%)' },
    ctaCardInner: { position: 'relative', zIndex: 2 },
    ctaIcon: {
      width: '48px', height: '48px', background: 'rgba(228,137,21,0.14)',
      border: '1px solid rgba(228,137,21,0.28)', borderRadius: '12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 20px', fontSize: '22px',
    },
    ctaH3: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: '34px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '10px' },
    ctaSubtext: { fontSize: '13px', color: 'rgba(255,255,255,0.42)', marginBottom: '24px', lineHeight: 1.7 },
    ctaBtn: {
      display: 'inline-block',
      background: '#e48915', color: '#fff',
      padding: '12px 30px', borderRadius: '8px',
      fontSize: '13px', fontWeight: 700, textDecoration: 'none',
      boxShadow: '0 6px 22px rgba(228,137,21,0.28)',
    },

    /* dl widget */
    dlWidget: { background: '#fff', border: '1px solid #ddd8cf', borderRadius: '16px', overflow: 'hidden' },
    dlHead: { padding: '16px 24px', borderBottom: '1px solid #ddd8cf', display: 'flex', alignItems: 'center', gap: '12px' },
    dlBody: { padding: '16px' },
    dlItem: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 16px', marginBottom: '8px',
      background: '#f9fafb', border: '1px solid #ddd8cf', borderRadius: '10px',
      textDecoration: 'none', transition: 'all 0.2s ease',
    },
    dlItemLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    dlItemLabel: { fontSize: '13px', fontWeight: 600, color: '#1b2a3a' },
  };

  return (
    <main style={S.page}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={S.hero} ref={heroRef}>
        <div style={S.heroBgImg} />
        <div style={S.heroGlowTop} />
        <div style={S.heroGlowBot} />
        <div style={S.heroNoise} />
        <div style={S.heroDiagonal} />

        <div style={S.heroInner}>
          {/* LEFT */}
          <div style={S.heroLeft}>
            <div style={S.heroPill}>
              <div style={S.heroPillDot} />
              <span style={S.heroPillText}>Premium Grade Product</span>
            </div>

            <div style={S.heroGradeBadge}>{p.grade}</div>

            <h1 style={S.heroH1}>{p.title}</h1>
            <div style={S.heroSize}>{p.size}</div>
            <p style={S.heroDesc}>{p.desc}</p>

            <nav>
              <ol style={S.heroBreadcrumb}>
                <li>
                  <Link to="/" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
                    Home
                  </Link>
                </li>
                <li style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', padding: '0 4px' }}>/</li>
                <li style={{ color: '#e48915', fontSize: '12px', fontWeight: 600 }}>
                  {p.grade} · {p.size}
                </li>
              </ol>
            </nav>
          </div>

          {/* RIGHT: stat panels */}
          <div style={S.heroRight}>
            {[
              { label: 'Yield Strength', value: yieldVal + '+', unit: 'N/mm²' },
              { label: 'Tensile Strength', value: tensileVal + '+', unit: 'N/mm²' },
              { label: 'Elongation', value: '17+', unit: '%' },
            ].map((s, i) => (
              <div key={i} style={S.heroStatCard}>
                <div style={S.heroStatLabel}>{s.label}</div>
                <div style={S.heroStatValue}>{s.value}</div>
                <div style={S.heroStatUnit}>{s.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ BODY ══════════════════ */}
      <section style={S.mainSection}>
        <div className="container">
          <div className="row g-5">

            {/* ─── LEFT: MAIN CONTENT ─── */}
            <div className="col-xl-8 col-lg-8">

              {/* Product Image Card */}
              <div style={S.imgCard}>
                <img src={p.image} alt={p.title} style={S.imgEl} />
                <div style={S.imgOverlay} />
                <div style={S.imgBottom}>
                  <div>
                    <div style={S.imgGradeLabel}>TRIAM A+</div>
                    <div style={S.imgGradeTitle}>{p.grade} · {p.size}</div>
                  </div>
                  <div style={S.imgTagRow}>
                    <span style={S.imgTag}>ISI Certified</span>
                    <span style={S.imgTag}>IS 1786:2008</span>
                    <span style={S.imgTag}>ISO 9001</span>
                  </div>
                </div>
              </div>

              {/* Application Tags */}
              <div id="application">
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Application Areas</div>
                <div style={S.tagRow}>
                  {p.applications.map((app, i) => (
                    <span key={i} style={S.tag}>{app}</span>
                  ))}
                </div>
              </div>

              {/* A+ All the Way */}
              <div id="future" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />About this Product</div>
                <h2 style={S.sectionH2}>A+ All the Way</h2>
                <p style={{ ...S.bodyText, marginBottom: '16px' }}>
                  For close to two decades, Amit Metaliks Ltd. has built its name in the metallurgical sector on one principle: no shortcuts.
                  Every TRIAM A+ {p.grade} rebar is forged on the patented Thermax technology from HSE, Germany, then carried through a refined process that pairs high strength with high ductility at every stage.
                </p>
                <p style={S.bodyText}>
                  Pick up an ISI-certified bar and the A+ quality shows along its full length — in every millimetre of steel, in every test certificate, in every structure it supports.
                </p>
              </div>

              {/* Cross Section Image */}
              <div style={S.crossImg}>
                <img
                  src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/jCZ08YrDJXpXR5kGRDQkxxNKubNLMIuVUAHYDsjR.png"
                  alt="Rebar Cross Section"
                  style={{ width: '100%', display: 'block' }}
                />
                <div style={S.crossCaption}>
                  <div style={S.crossCaptionBar} />
                  <span style={S.crossCaptionText}>
                    Cross-section showing the dual-layer Thermax structure — hardened martensitic rim + ductile ferrite-pearlite core
                  </span>
                </div>
              </div>

              {/* Physical Properties */}
              <div id="physical" style={{ marginBottom: '0' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Performance Data</div>
                <h2 style={S.sectionH2}>Physical Properties</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '28px' }}>
                  TRIAM A+ {p.grade} doesn't just meet IS 1786:2008 — it comfortably exceeds the minimum limits and conforms to ISO 9001, ISO 14001, and ISO 45001.
                </p>

                {/* Metric Cards */}
                <div style={S.metricsGrid}>
                  {[
                    { note: 'Proof Stress', value: p.yieldStrength + '+', unit: 'N/mm²', label: 'Yield Strength', icon: '⚙' },
                    { note: 'Ultimate Load', value: p.tensile + '+', unit: 'N/mm²', label: 'Tensile Strength', icon: '⚡' },
                    { note: 'Ductility', value: '17+', unit: '%', label: 'Elongation', icon: '↔' },
                  ].map((m, i) => (
                    <div key={i} style={S.metricCard}>
                      <div style={S.metricBg}>{m.icon}</div>
                      <div style={S.metricNote}>{m.note}</div>
                      <div style={S.metricValue}>{m.value}</div>
                      <div style={S.metricUnit}>{m.unit}</div>
                      <div style={S.metricLabel}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Comparison Table */}
                <div style={S.compTable}>
                  <div style={S.compHead}>
                    <div style={S.compHeadCell(false)}>Property</div>
                    <div style={{ ...S.compHeadCell(false), textAlign: 'center' }}>IS Standard</div>
                    <div style={S.compHeadCell(true)}>Triam A+</div>
                  </div>
                  {physicalRows.map((row, i) => (
                    <div key={i} style={S.compRow(i % 2 === 0)}>
                      <div style={S.compCell}>
                        {row.label}
                        {row.unit && <span style={{ fontSize: '11px', color: '#9aabba', fontWeight: 400, marginLeft: '4px' }}>{row.unit}</span>}
                      </div>
                      <div style={S.compCellMid}>{row.std}</div>
                      <div style={S.compCellAccent}>
                        <span style={S.compBadge}>{row.triam}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chemical Properties */}
              <div id="chemical">
              <div style={S.eyebrow}><span style={S.eyebrowLine} />Composition Data</div>
              <h2 style={S.sectionH2}>Chemical Properties</h2>
              <p style={{ ...S.bodyTextMuted, marginBottom: '28px' }}>
                Built on controlled chemistry — clean steel, lean composition. A low-alloy variant is also available with carbon controlled at 0.15% max for enhanced corrosion resistance.
              </p>

              <div style={S.chemGrid}>
                {/* Standard Grade */}
                <div style={S.chemCard}>
                  <div style={S.chemHead(false)}>
                    <div style={S.chemHeadSub}>Standard Grade</div>
                    <div style={S.chemHeadTitle}>TRIAM A+ {p.grade}</div>
                  </div>
                  {chemRows.map((c, i) => (
                    <div key={i} style={S.chemRow(i % 2 === 0)}>
                      <div>
                        <div style={S.chemRowLabel}>{c.label}</div>
                        <div style={S.chemRowUnit}>{c.unit}</div>
                      </div>
                      <div style={S.chemRowValues}>
                        <span style={S.chemStd}>{c.std}</span>
                        <span style={S.chemArrow}>→</span>
                        <span style={S.chemBadge}>{c.triam}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Low Alloy */}
                <div style={S.chemCard}>
                  <div style={S.chemHead(true)}>
                    <div style={S.chemHeadSub}>Low Alloy Variant</div>
                    <div style={S.chemHeadTitle}>TRIAM A+ {p.grade} LA</div>
                  </div>
                  {chemRows.map((c, i) => (
                    <div key={i} style={S.chemRow(i % 2 === 0)}>
                      <div>
                        <div style={S.chemRowLabel}>{c.label}</div>
                        <div style={S.chemRowUnit}>{c.unit}</div>
                      </div>
                      <div style={S.chemRowValues}>
                        <span style={S.chemStd}>{c.std}</span>
                        <span style={S.chemArrow}>→</span>
                        <span style={S.chemBadge}>{c.triamLA}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={S.chemNote}>
                <span style={S.chemNoteIcon}>ℹ</span>
                <p style={S.chemNoteText}>
                  Every ISI-certified TRIAM A+ {p.grade} bar delivers a combination of strength, ductility, and corrosion resistance that few rebars can match. The A+ quality shows in every inch of metal.
                </p>
              </div>
              </div>{/* /#chemical */}

              {/* Dimensional Tolerance */}
              <div id="tolerance" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Dimensional Standards</div>
                <h2 style={S.sectionH2}>Dimensional Tolerance</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '28px' }}>
                  TRIAM A+ {p.grade} bars are produced within tight dimensional tolerances per IS 1786:2008, ensuring consistent cross-sections, rib geometry, and weight per metre across every batch.
                </p>
                <div style={S.compTable}>
                  <div style={S.compHead}>
                    <div style={S.compHeadCell(false)}>Parameter</div>
                    <div style={{ ...S.compHeadCell(false), textAlign: 'center' }}>IS 1786 Limit</div>
                    <div style={S.compHeadCell(true)}>Triam A+</div>
                  </div>
                  {[
                    { param: 'Mass (Weight/metre)', limit: '±6%', triam: '±4%' },
                    { param: 'Nominal Diameter', limit: '±0.5 mm', triam: '±0.3 mm' },
                    { param: 'Rib Height', limit: '≥ 0.05d', triam: 'Exceeds' },
                    { param: 'Rib Spacing', limit: '≤ 0.7d', triam: 'Compliant' },
                  ].map((row, i) => (
                    <div key={i} style={S.compRow(i % 2 === 0)}>
                      <div style={S.compCell}>{row.param}</div>
                      <div style={S.compCellMid}>{row.limit}</div>
                      <div style={S.compCellAccent}><span style={S.compBadge}>{row.triam}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seismic Resistance */}
              <div id="seismic" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Earthquake Safety</div>
                <h2 style={S.sectionH2}>Seismic Resistance</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '24px' }}>
                  Structures in seismic zones need more than strength — they need ductility: the ability to absorb energy without sudden fracture. TRIAM A+ {p.grade} delivers both.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }}>
                  {[
                    { icon: '🔁', title: 'High Elongation', text: '17%+ elongation ensures the bar stretches before it breaks — critical for seismic shock absorption.' },
                    { icon: '⚖', title: 'TS/YS Ratio 1.15', text: 'A higher tensile-to-yield ratio provides a safety margin against sudden overload during earthquakes.' },
                    { icon: '🔩', title: 'Superior Bendability', text: 'Bend and rebend tests at 3D radius confirm resistance to cracking under cyclic stress.' },
                    { icon: '🛡', title: 'No Residual Stress', text: 'Unlike cold-twisted bars, TMT bars carry no locked-in stress — stable under repeated seismic loading.' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #ddd8cf', borderRadius: '12px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1b2a3a', marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ fontSize: '13px', color: '#5a6a7a', lineHeight: 1.7 }}>{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corrosion Resistance */}
              <div id="corrosion" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Durability</div>
                <h2 style={S.sectionH2}>Corrosion Resistance</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '24px' }}>
                  Controlled carbon, sulphur, and phosphorus levels — combined with Thermax quenching — produce a bar with naturally superior corrosion resistance.
                </p>
                <div style={{ background: '#fff', border: '1px solid #ddd8cf', borderRadius: '16px', padding: '28px', marginBottom: '0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {[
                      { label: 'Carbon ≤ 0.20%', sub: 'Low carbon minimises carbide precipitation at grain boundaries — a primary corrosion trigger.' },
                      { label: 'S + P ≤ 0.075%', sub: 'Combined sulphur and phosphorus content is tightly controlled to reduce micro-galvanic corrosion.' },
                      { label: 'Low Alloy Variant', sub: 'Our LA grade holds carbon at ≤ 0.15%, offering enhanced resistance for coastal and humid environments.' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', fontWeight: 700, color: '#c8401a', marginBottom: '6px' }}>{item.label}</div>
                        <div style={{ fontSize: '13px', color: '#5a6a7a', lineHeight: 1.7 }}>{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div style={S.videoCard}>
                <div
                  style={{ ...S.videoBg, backgroundImage: 'url(https://enquiry.triamtmt.com/images/tab-img6.jpg)' }}
                />
                <div style={S.videoOverlay} />
                <div style={S.videoContent}>
                  <div style={S.videoTag}>Watch the manufacturing process</div>
                  <a
                    href="https://www.youtube.com/watch?v=BNEq6JcQK0M"
                    target="_blank" rel="noreferrer"
                    style={S.videoPlayBtn(videoHover)}
                    onMouseEnter={() => setVideoHover(true)}
                    onMouseLeave={() => setVideoHover(false)}
                  >
                    <i className="fa-solid fa-play" style={{ marginLeft: '5px' }} />
                  </a>
                  <div style={S.videoTitle}>See Thermax Technology in Action</div>
                </div>
              </div>

              {/* Product Packaging */}
              <div id="packaging" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Delivery & Handling</div>
                <h2 style={S.sectionH2}>Product Packaging</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '24px' }}>
                  Every bundle of TRIAM A+ {p.grade} is prepared to IS 1786:2008 packaging standards — tagged, bound, and traceable from mill to site.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { icon: '📦', title: 'Bundle Weight', text: 'Standard bundle: approx. 2 MT, adjustable to customer requirement.' },
                    { icon: '🏷', title: 'IS Tag', text: 'Each bundle carries an IS-compliant tag — grade, heat number, size, weight, and manufacturer details.' },
                    { icon: '🔗', title: 'Wire Binding', text: 'Secured with MS binding wire at regular intervals to prevent damage during transit and handling.' },
                    { icon: '📋', title: 'Mill Test Certificate', text: 'MTC available for every heat — physical, chemical, and dimensional test data on record.' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #ddd8cf', borderRadius: '12px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1b2a3a', marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ fontSize: '13px', color: '#5a6a7a', lineHeight: 1.7 }}>{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Checks */}
              <div id="quality" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Testing & Certification</div>
                <h2 style={S.sectionH2}>Quality Checks</h2>
                <p style={{ ...S.bodyTextMuted, marginBottom: '24px' }}>
                  Every heat of TRIAM A+ undergoes rigorous in-house testing before dispatch. Our laboratory is equipped for full IS 1786:2008 verification.
                </p>
                <div style={{ background: '#1b2a3a', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                  {[
                    { test: 'Tensile Test', freq: 'Every Heat', detail: 'Yield strength, tensile strength, and elongation measured per IS 1608.' },
                    { test: 'Bend Test', freq: 'Every Heat', detail: 'Bar bent through 180° around a mandrel of specified diameter without cracking.' },
                    { test: 'Rebend Test', freq: 'Every Heat', detail: 'Bar bent, aged at 100°C, then rebent — verifies ductility after strain ageing.' },
                    { test: 'Chemical Analysis', freq: 'Every Heat', detail: 'Spectrometer analysis for C, S, P, Mn, Si — full ladle and product analysis.' },
                    { test: 'Dimensional Check', freq: 'Continuous', detail: 'Mass per metre, diameter, rib height, and spacing checked during rolling.' },
                  ].map((row, i) => (
                    <div key={i} style={{ padding: '16px 24px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 2fr', gap: '16px', alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff' }}>{row.test}</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#e48915', textTransform: 'uppercase', letterSpacing: '1px' }}>{row.freq}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{row.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advantages at a Glance */}
              <div id="advantages" style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Why Choose Triam A+</div>
                <h2 style={S.sectionH2}>Advantages at a Glance</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '24px' }}>
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
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fff', border: '1px solid #ddd8cf', borderRadius: '10px', padding: '14px 16px' }}>
                      <span style={{ color: '#e48915', fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1b2a3a', lineHeight: 1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div style={{ marginBottom: '52px' }}>
                <div style={S.eyebrow}><span style={S.eyebrowLine} />Common Questions</div>
                <h3 style={S.sectionH2}>FAQ</h3>
                <div style={{ marginTop: '24px' }}>
                  {faqs.map((faq, idx) => (
                    <div key={idx} style={S.faqItem(activeFaq === idx)}>
                      <button
                        style={S.faqBtn}
                        onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={S.faqNum(activeFaq === idx)}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span style={S.faqQ(activeFaq === idx)}>{faq.q}</span>
                        </div>
                        <span style={S.faqIcon(activeFaq === idx)}>
                          <i className="fa-solid fa-plus" />
                        </span>
                      </button>
                      {activeFaq === idx && (
                        <div style={S.faqBody}>
                          <div style={{ paddingTop: '16px' }}>{faq.a}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div style={S.bottomCta}>
                <div style={S.bottomCtaBg} />
                <div style={{ ...S.bottomCtaTexture, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)' }} />
                <div style={S.bottomCtaGlow} />
                <div style={S.bottomCtaInner}>
                  <div style={S.bottomCtaLeft}>
                    <div style={S.bottomCtaTag}>Get In Touch</div>
                    <h3 style={S.bottomCtaH3}>Ready to build something great?</h3>
                    <Link to="/contact" style={S.bottomCtaBtn}>
                      Contact Us &nbsp;<i className="fa-solid fa-arrow-right" style={{ fontSize: '12px' }} />
                    </Link>
                  </div>
                  <div className="d-none d-md-block" style={S.bottomCtaRight}>
                    <img
                      src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/IIjLqrsZBaXJl6Zp9B0oVVhvQ1Bm26eVR7kekQiv.jpg"
                      alt="Support"
                      style={S.bottomCtaRightImg}
                    />
                    <div style={S.bottomCtaRightFade} />
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: SIDEBAR ─── */}
            <div className="col-xl-4 col-lg-4">
              <div style={S.sidebar}>

                {/* Grade Specs Card */}
                <div style={S.specsCard}>
                  <div style={S.specsCardHead}>
                    <div style={S.specsCardHeadSub}>Product Specifications</div>
                    <div style={S.specsCardHeadTitle}>{p.grade} · {p.size}</div>
                  </div>
                  <div style={S.specsGrid}>
                    {[
                      { label: 'Yield Strength', val: p.yieldStrength + '+', unit: 'N/mm²' },
                      { label: 'Tensile Str.', val: p.tensile + '+', unit: 'N/mm²' },
                      { label: 'Elongation', val: '17+', unit: '%' },
                      { label: 'TS/YS Ratio', val: '1.15', unit: '' },
                    ].map((s, i) => (
                      <div key={i} style={S.specItem}>
                        <div style={S.specLabel}>{s.label}</div>
                        <div style={S.specVal}>{s.val}</div>
                        {s.unit && <div style={S.specUnit}>{s.unit}</div>}
                      </div>
                    ))}
                  </div>
                  <div style={S.specsFooter}>
                    <Link to="/contact" style={S.specsBtn}>
                      Request a Quote
                    </Link>
                  </div>
                </div>

                {/* On-Page Nav Widget */}
                <div style={S.navWidget}>
                  <div style={S.navWidgetHead}>
                    <div style={S.navWidgetBar} />
                    <h5 style={S.navWidgetTitle}>On This Page</h5>
                  </div>
                  <div style={{ padding: '8px 0' }}>
                    {sidebarLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={`#${link.id}`}
                        style={S.navLink}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#c8401a';
                          e.currentTarget.style.borderLeftColor = '#e48915';
                          e.currentTarget.style.paddingLeft = '28px';
                          e.currentTarget.style.background = 'rgba(228,137,21,0.04)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#3a4557';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.paddingLeft = '24px';
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        <span>{link.name}</span>
                        <i className="ri-arrow-right-line" style={{ color: '#e48915', fontSize: '15px', flexShrink: 0 }} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* "Have a project?" CTA Card */}
                <div style={{ ...S.ctaCard, position: 'relative' }}>
                  <div style={S.ctaCardBg} />
                  <div style={{ ...S.ctaCardTexture, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/ltNm33aKSpwTDb4TnpNRfVs8GlLOb1uJec3BAD1o.jpg)' }} />
                  <div style={S.ctaCardGlow} />
                  <div style={S.ctaCardInner}>
                    <div style={S.ctaIcon}>💬</div>
                    <h3 style={S.ctaH3}>Have a<br />project<br />in mind?</h3>
                    <p style={S.ctaSubtext}>Our team is ready to help you choose the right grade for your project.</p>
                    <Link to="/contact" style={S.ctaBtn}>Let's Talk</Link>
                  </div>
                </div>

                {/* Download Widget */}
                <div style={S.dlWidget}>
                  <div style={S.dlHead}>
                    <div style={S.navWidgetBar} />
                    <h5 style={S.navWidgetTitle}>Downloads</h5>
                  </div>
                  <div style={S.dlBody}>
                    {[
                      {
                        label: 'Annual Report 2023–24',
                        href: '#',
                        icon: 'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/4NSVYaCAgXI7UtbnT7PxM7sxvprmuMQi0qU17bt4.svg',
                        dl: 'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/ovuRLvRf5RkMi3bS1ydqp7kg4wLQLhwYH4DyyOCT.svg',
                      },
                      {
                        label: 'Product Brochure PDF',
                        href: 'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/YTJbUO6ba8jZmZkQGeBPNe7jSbwTNOCMnho0fwyN.pdf',
                        icon: 'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/6Q7yVj27cqGpULJ5epH2FCbLwmJben64aHPjl9Rs.svg',
                        dl: 'https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/tEhKHbW2Dukw07Kv0cTUQmwWWBSwjwUgaZaRrnK3.svg',
                      },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target={item.href !== '#' ? '_blank' : undefined}
                        rel="noreferrer"
                        style={{ ...S.dlItem, marginBottom: i === 0 ? '8px' : 0 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#e48915'; e.currentTarget.style.background = '#fffaf4'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd8cf'; e.currentTarget.style.background = '#f9fafb'; }}
                      >
                        <div style={S.dlItemLeft}>
                          <img src={item.icon} alt="" width="20" />
                          <span style={S.dlItemLabel}>{item.label}</span>
                        </div>
                        <img src={item.dl} alt="Download" width="16" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
