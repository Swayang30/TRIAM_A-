import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── tiny intersection hook for scroll-reveal ── */
function useInView(threshold = 0.15) {
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

/* ── TextType — ReactBits-compatible local implementation (no gsap) ─────────
   Props mirror the ReactBits TextType API:
   text, typingSpeed, deletingSpeed, pauseDuration, loop,
   showCursor, cursorCharacter, cursorClassName, className, style          */
function TextType({
  text,
  typingSpeed      = 50,
  deletingSpeed    = 30,
  pauseDuration    = 2000,
  loop             = true,
  showCursor       = true,
  cursorCharacter  = '|',
  cursorClassName  = '',
  className        = '',
  style            = {},
}) {
  const texts                       = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed]   = useState('');
  const [charIdx,   setCharIdx]     = useState(0);
  const [textIdx,   setTextIdx]     = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let t;
    if (!deleting) {
      if (charIdx < current.length) {
        t = setTimeout(() => {
          setDisplayed(p => p + current[charIdx]);
          setCharIdx(p => p + 1);
        }, typingSpeed);
      } else {
        t = setTimeout(() => setDeleting(true), pauseDuration);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(p => p.slice(0, -1)), deletingSpeed);
      } else {
        setDeleting(false);
        if (loop) setTextIdx(p => (p + 1) % texts.length);
        setCharIdx(0);
      }
    }
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, charIdx, textIdx, deleting]);

  return (
    <span className={className} style={style}>
      <span className="text-type__content">{displayed}</span>
      {showCursor && (
        <span className={`text-type__cursor ${cursorClassName}`}
          style={{ animation: 'tt-cursor-blink 0.65s step-end infinite', color: 'inherit' }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}

/* ── QualityTypePanel — terminal card that cycles the 4 quality features ── */
function QualityTypePanel({ features }) {
  const [titleText, setTitleText]   = useState('');
  const [charIdx,   setCharIdx]     = useState(0);
  const [featIdx,   setFeatIdx]     = useState(0);
  const [phase,     setPhase]       = useState('typing'); // 'typing' | 'holding' | 'fading' | 'deleting'
  const [subOn,     setSubOn]       = useState(false);

  const SPEED_TYPE = 42;
  const SPEED_DEL  = 20;
  const HOLD_MS    = 2600;
  const FADE_MS    = 320;

  const current = features[featIdx];

  useEffect(() => {
    let t;
    if (phase === 'typing') {
      if (charIdx < current.label.length) {
        t = setTimeout(() => {
          setTitleText(p => p + current.label[charIdx]);
          setCharIdx(p => p + 1);
        }, SPEED_TYPE);
      } else {
        setSubOn(true);
        t = setTimeout(() => setPhase('fading'), HOLD_MS);
      }
    } else if (phase === 'fading') {
      setSubOn(false);
      t = setTimeout(() => setPhase('deleting'), FADE_MS);
    } else if (phase === 'deleting') {
      if (titleText.length > 0) {
        t = setTimeout(() => setTitleText(p => p.slice(0, -1)), SPEED_DEL);
      } else {
        setCharIdx(0);
        setFeatIdx(p => (p + 1) % features.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleText, charIdx, phase, featIdx]);

  const iconMap = ['fa-flask-vial', 'fa-bolt', 'fa-shield-halved', 'fa-chart-line'];
  const amber   = '#e48915';
  const ink     = '#1b2a3a';

  return (
    <div style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(27,42,58,0.18), 0 0 0 1px rgba(255,255,255,0.04)' }}>
      {/* ── Terminal chrome bar ── */}
      <div style={{ background: '#0a1520', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57','#ffbe2e','#28c840'].map((c, i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          quality.system — live
        </div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840', boxShadow: '0 0 6px #28c840' }} />
      </div>

      {/* ── Main typing area ── */}
      <div style={{ background: '#0d1621', padding: '32px 32px 28px', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

        {/* Status label */}
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: amber, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: amber, display: 'inline-block', animation: 'tt-pulse 2s ease-in-out infinite' }} />
          A+ Quality Standard
        </div>

        {/* Typed title */}
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.3px', minHeight: '80px' }}>
          {titleText}
          <span style={{ animation: 'tt-cursor-blink 0.65s step-end infinite', color: amber, fontWeight: 300 }}>|</span>
        </div>

        {/* Subtitle (fades in after title complete) */}
        <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, minHeight: '44px', marginTop: '10px', opacity: subOn ? 1 : 0, transform: subOn ? 'translateY(0)' : 'translateY(6px)', transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease` }}>
          {current.sub}
        </div>

        {/* Index indicator + progress bar */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {features.map((_, i) => (
                <div key={i} style={{ width: i === featIdx ? '24px' : '6px', height: '3px', borderRadius: '2px', background: i === featIdx ? amber : 'rgba(255,255,255,0.12)', transition: 'all 0.4s ease' }} />
              ))}
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
              {String(featIdx + 1).padStart(2,'0')} / {String(features.length).padStart(2,'0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── Feature reference pills ── */}
      <div style={{ background: '#111d2b', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: i === featIdx ? 'rgba(228,137,21,0.14)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === featIdx ? 'rgba(228,137,21,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '50px', padding: '5px 12px', transition: 'all 0.4s ease' }}>
            <i className={`fa-solid ${iconMap[i]}`} style={{ fontSize: '10px', color: i === featIdx ? amber : 'rgba(255,255,255,0.25)' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3px', color: i === featIdx ? amber : 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 1400 }) {
  const [ref, visible] = useInView(0.3);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const num = parseFloat(target);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Number.isInteger(num) ? Math.floor(e * num) : +(e * num).toFixed(1));
      if (p < 1) requestAnimationFrame(step);
      else setVal(num);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Quality() {
  const [heroIn, setHeroIn] = useState(false);
  const [certHover, setCertHover] = useState(null);
  const [stepHover, setStepHover] = useState(null);
  const [advantageHover, setAdvantageHover] = useState(null);

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 80); return () => clearTimeout(t); }, []);

  const certifications = [
    'https://wheat-termite-712594.hostingersite.com/storage/media/KlZZTDdsjummMCRDBG8TXUVJaJJtDqEl5ejEVbRX.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/jsEYi4HQoIZU2d6LKFIX5K4nAzkPSQ4EJPcpOK8U.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/QpBCUGQj0QvFYinGerJLpIVxsk6wpatWfFAN2Jqe.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/XRCjFFwOAWf7QhMIKut3LezllcGyfB65wOfgcfbG.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/5VBFXqisljIRMhrzfbMez9JqQtAKNghzZObcVbig.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/qvcm6uHwnczqVdUxXtXvZRF3v6sQWiJBUWtauX7E.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/NDYqNSH3oOT6BJA5LFd4AInjX371uqqf37NhDezy.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/0GgyB0Du1tT4477aaY5rivHNEBRu6wOOOWNufG75.jpg',
  ];

  const processSteps = [
    { num: '01', icon: 'fa-boxes-stacked',  title: 'Raw Material',   desc: 'Every batch is spectrometer-tested and cross-checked by wet chemistry — defects caught before they reach the line.' },
    { num: '02', icon: 'fa-flask-vial',      title: 'Blending',       desc: 'Precise charge blending locks in uniform chemistry, so quality holds steady heat to heat.' },
    { num: '03', icon: 'fa-fire-burner',     title: 'Steel Refining', desc: 'Ladle refining strips out impurities and fine-tunes the mix — clean steel, low sulphur and phosphorus.' },
    { num: '04', icon: 'fa-arrows-spin',     title: 'Billet Casting', desc: 'Continuous casting forms clean, defect-free billets — 100% tested before they\'re rolled.' },
    { num: '05', icon: 'fa-microscope',      title: 'Lab Testing',    desc: 'Our NABL-accredited lab verifies the chemistry and strength of every heat, results fed back in real time.' },
  ];

  const advantages = [
    { truth: '100% tested billets',                                        benefit: 'Controlled chemical composition of the TMT' },
    { truth: 'Controlled sulphur & phosphorus usage',                      benefit: 'Better corrosion control across the service life' },
    { truth: 'Conversion agent of SAIL',                                   benefit: 'Proof of premium quality at source' },
    { truth: 'Flexibility higher than standard elongation (IS:1786)',      benefit: 'Safeguards structures from seismic events & calamities' },
    { truth: 'Greater AR (Area of Rib) value',                             benefit: 'Stronger bond between steel and concrete' },
    { truth: 'Easy bending and re-bending',                                benefit: 'Enhanced productivity and reduced site waste' },
  ];

  const tests = [
    { icon: 'fa-wrench',       title: 'Mechanical Testing', desc: 'Yield, tensile and elongation measured on UTM systems against IS:1786:2008 — 550+ yield, 600+ tensile, 17%+ elongation, every lot.' },
    { icon: 'fa-circle-check', title: 'Structural Testing', desc: 'Bend and re-bend checks on every lot. Triam A+ bends at 3D–4D where ordinary bars need 4D–5D — real flexibility, not just strength.' },
    { icon: 'fa-microscope',   title: 'UTM Lab Equipment',  desc: 'Universal Testing Machines fitted with extensometers capture precise, repeatable data on every heat — the hard proof behind the A+ grade.' },
  ];

  const stats = [
    { value: '100', suffix: '%', label: 'Billets Tested' },
    { value: '3',   suffix: '+', label: 'ISO Certifications' },
    { value: 'NABL', suffix: '', label: 'Accredited Labs', text: true },
    { value: '0',   suffix: '',  label: 'Compromise on Quality' },
  ];

  /* ── shared style tokens ── */
  const ink   = '#1b2a3a';
  const amber = '#e48915';
  const accent = '#c8401a';
  const smoke = '#f4f3ee';
  const cream = '#fff';
  const muted = '#5a6a7a';

  const eyebrow = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
    color: amber, marginBottom: '14px', fontFamily: "'DM Sans', sans-serif",
  };
  const eyebrowLine = { width: '22px', height: '2px', background: amber, flexShrink: 0, borderRadius: '1px' };
  const displayH = (size = 'clamp(38px,5vw,56px)') => ({
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: size, fontWeight: 900, color: ink,
    textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.5px',
    marginBottom: '0',
  });

  return (
    <main style={{ backgroundColor: smoke }}>
      <style>{`
        @keyframes tt-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes tt-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
      `}</style>

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden',
        paddingTop: '90px',
        paddingBottom: '0',
        minHeight: '420px',
      }}>
        {/* Hero BG image — full opacity, no overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(/Quality.png)",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Diagonal cut */}
        <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: '80px', background: smoke, clipPath: 'polygon(0 100%, 100% 100%, 100% 0)', zIndex: 4 }} />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', paddingBottom: '80px' }}>

            {/* Left: heading */}
            <div style={{
              flex: 1, minWidth: '280px',
              opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              <div style={{ ...eyebrow, color: amber, marginBottom: '18px' }}>
                <span style={eyebrowLine} />
                Triam A+ Excellence
              </div>
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(64px, 11vw, 120px)',
                fontWeight: 900, color: cream,
                textTransform: 'uppercase',
                lineHeight: 0.88, letterSpacing: '-3px',
                marginBottom: '20px',
              }}>
                Quality
              </h1>
              <div style={{ width: '56px', height: '4px', background: `linear-gradient(90deg, ${accent}, ${amber})`, borderRadius: '2px', marginBottom: '22px' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.85, maxWidth: '480px', marginBottom: '28px' }}>
                Built in at every stage — never inspected in at the end. From the first melt to final dispatch, every heat earns the A+ name.
              </p>
              <nav>
                <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
                  <li><Link to="/" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>Home</Link></li>
                  <li style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', padding: '0 2px' }}>/</li>
                  <li style={{ color: amber, fontSize: '12px', fontWeight: 700 }}>Quality</li>
                </ol>
              </nav>
            </div>

            {/* Right: stat tiles */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
              flexShrink: 0,
              opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.045)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px', padding: '20px 22px',
                  backdropFilter: 'blur(12px)',
                  minWidth: '130px',
                }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '40px', fontWeight: 900, color: amber, lineHeight: 1 }}>
                    {s.text ? <span>{s.value}</span> : <Counter target={s.value} suffix={s.suffix} />}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          INTRO — NABL statement
      ══════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: cream }}>
        <div className="container">
          <div className="quality-intro-grid" style={{ gap: '64px', alignItems: 'center' }}>

            {/* Quote block */}
            <div>
              <div style={eyebrow}><span style={eyebrowLine} />The A+ Standard</div>
              <h2 style={{ ...displayH(), marginBottom: '24px' }}>
                Every Heat,<br />
                <span style={{ color: amber }}>Proven.</span>
              </h2>
              <p style={{ color: muted, fontSize: '15px', lineHeight: 1.85, marginBottom: '20px' }}>
                Through steelmaking and rolling, sample after sample goes to our <strong style={{ color: ink }}>NABL-accredited in-house lab</strong> — where spectrometers, Universal Testing Machines and metallurgical specialists verify the chemistry and strength of every heat.
              </p>
              <p style={{ color: muted, fontSize: '15px', lineHeight: 1.85 }}>
                Results flow back to the plant in real time, so composition is corrected before it becomes a problem. If a concern ever surfaces, root-cause analysis is immediate — and every fix sharpens the next heat, the next batch, the next builder counting on us.
              </p>
            </div>

            {/* TextType feature panel */}
            <QualityTypePanel features={[
              { label: 'NABL-Accredited Lab',           sub: 'Spectrometers, UTMs and metallurgists check every heat — chemistry and strength alike.' },
              { label: 'Real-Time Plant Feedback',       sub: 'Results go straight back to the floor, so steel is corrected before it ever becomes a problem.' },
              { label: 'Zero-Compromise Dispatch',       sub: 'A final check in the dispatch yard. Nothing ships until it clears — no exceptions.' },
              { label: 'Continuous Process Improvement', sub: 'Every issue becomes a catalyst for sharper output' },
            ]} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROCESS FLOW — dark section
      ══════════════════════════════════ */}
      <section style={{ background: ink, padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', background: `radial-gradient(circle, rgba(228,137,21,0.06) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: `radial-gradient(circle, rgba(200,64,26,0.05) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ ...eyebrow, color: amber, justifyContent: 'center' }}><span style={eyebrowLine} />End-to-End Control<span style={eyebrowLine} /></div>
            <h2 style={{ ...displayH('clamp(36px,5vw,60px)'), color: cream, marginBottom: '12px' }}>Manufacturing Quality Flow</h2>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
              Five rigorous stages — every one monitored, every one documented.
            </p>
          </div>

          {/* Steps row */}
          <div className="quality-process-grid" style={{ gap: '0', position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: '36px', left: '10%', right: '10%', height: '2px', background: 'rgba(228,137,21,0.18)', zIndex: 0 }} />

            {processSteps.map((s, i) => (
              <div
                key={i}
                style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', cursor: 'default' }}
                onMouseEnter={() => setStepHover(i)}
                onMouseLeave={() => setStepHover(null)}
              >
                {/* Icon circle */}
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', marginBottom: '24px',
                  background: stepHover === i ? amber : 'rgba(228,137,21,0.12)',
                  border: `2px solid ${stepHover === i ? amber : 'rgba(228,137,21,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px', color: stepHover === i ? cream : amber,
                  transition: 'all 0.3s ease',
                  boxShadow: stepHover === i ? `0 8px 28px rgba(228,137,21,0.3)` : 'none',
                }}>
                  <i className={`fa-solid ${s.icon}`} />
                </div>
                {/* Step number */}
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: stepHover === i ? amber : 'rgba(255,255,255,0.22)', marginBottom: '8px' }}>
                  STEP {s.num}
                </div>
                {/* Title */}
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, color: cream, textTransform: 'uppercase', textAlign: 'center', marginBottom: '10px', letterSpacing: '0.3px' }}>
                  {s.title}
                </div>
                {/* Desc */}
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, textAlign: 'center', margin: 0, transition: 'color 0.3s', ...(stepHover === i ? { color: 'rgba(255,255,255,0.65)' } : {}) }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* TQM banner */}
          <div style={{
            marginTop: '60px', padding: '24px 36px',
            background: 'rgba(228,137,21,0.08)', border: '1px solid rgba(228,137,21,0.2)',
            borderRadius: '14px', display: 'flex', gap: '18px', alignItems: 'center',
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(228,137,21,0.15)', border: '1px solid rgba(228,137,21,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: amber, flexShrink: 0 }}>
              <i className="fa-solid fa-bolt" />
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.75 }}>
              <strong style={{ color: amber }}>Powered by TQM —</strong> every stage is monitored for uniform chemical, physical, and metallographic properties through electronics and Total Quality Management principles. No variance. No compromise.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ADVANTAGES — full-width paired rows
      ══════════════════════════════════ */}
      <section style={{ padding: '90px 0', background: smoke }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div>
              <div style={eyebrow}><span style={eyebrowLine} />Every box ticked</div>
              <h2 style={{ ...displayH(), marginBottom: '0' }}>A+ Advantages<br /><span style={{ color: amber }}>at a Glance</span></h2>
            </div>
            <p style={{ color: '#8a8a8a', fontSize: '14px', lineHeight: 1.75, maxWidth: '340px', margin: 0 }}>
              When you choose TRIAM A+ Fe 550D, every quality benchmark that defines a premium new-age rebar is already met.
            </p>
          </div>

          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: '0', marginBottom: '10px', padding: '0 4px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8a8a8a', paddingLeft: '20px' }}>Product Truth</div>
            <div />
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8a8a8a', paddingLeft: '20px' }}>The Benefit</div>
          </div>

          {/* Paired rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {advantages.map((a, i) => (
              <div
                key={i}
                className="quality-adv-row"
                style={{ gap: '0', cursor: 'default' }}
                onMouseEnter={() => setAdvantageHover(i)}
                onMouseLeave={() => setAdvantageHover(null)}
              >
                {/* Truth */}
                <div style={{
                  background: advantageHover === i ? ink : cream,
                  border: `1.5px solid ${advantageHover === i ? ink : '#ddd8cf'}`,
                  borderRight: 'none',
                  borderRadius: '12px 0 0 12px',
                  padding: '18px 24px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  transition: 'all 0.25s ease',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: advantageHover === i ? 'rgba(228,137,21,0.2)' : 'rgba(228,137,21,0.1)',
                    border: `1.5px solid ${advantageHover === i ? amber : 'rgba(228,137,21,0.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '12px', fontWeight: 800, color: amber,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: advantageHover === i ? cream : ink, transition: 'color 0.25s' }}>
                    {a.truth}
                  </span>
                </div>

                {/* Arrow connector */}
                <div style={{
                  background: advantageHover === i ? amber : '#e2dcd0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', color: advantageHover === i ? cream : '#8a8a8a',
                  transition: 'all 0.25s ease',
                  borderTop: `1.5px solid ${advantageHover === i ? amber : '#ddd8cf'}`,
                  borderBottom: `1.5px solid ${advantageHover === i ? amber : '#ddd8cf'}`,
                }}>
                  →
                </div>

                {/* Benefit */}
                <div style={{
                  background: advantageHover === i ? `rgba(228,137,21,0.06)` : cream,
                  border: `1.5px solid ${advantageHover === i ? amber : '#ddd8cf'}`,
                  borderLeft: 'none',
                  borderRadius: '0 12px 12px 0',
                  padding: '18px 24px',
                  display: 'flex', alignItems: 'center',
                  transition: 'all 0.25s ease',
                }}>
                  <span style={{ fontSize: '14px', color: muted, lineHeight: 1.6 }}>
                    {a.benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL TESTING — dark cards section
      ══════════════════════════════════ */}
      <section style={{ background: `linear-gradient(160deg, #080f18 0%, ${ink} 100%)`, padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: `radial-gradient(ellipse, rgba(228,137,21,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div style={{ ...eyebrow, color: amber, justifyContent: 'center' }}><span style={eyebrowLine} />Final Verification<span style={eyebrowLine} /></div>
            <h2 style={{ ...displayH('clamp(36px,5vw,60px)'), color: cream }}>Final Product Testing</h2>
          </div>

          <div className="quality-tests-grid" style={{ gap: '20px', marginBottom: '28px' }}>
            {tests.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '18px', padding: '36px 28px',
                transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(228,137,21,0.07)'; e.currentTarget.style.borderColor = 'rgba(228,137,21,0.25)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Accent line top */}
                <div style={{ position: 'absolute', top: 0, left: '28px', right: '28px', height: '3px', background: `linear-gradient(90deg, ${amber}, ${accent})`, borderRadius: '0 0 3px 3px' }} />
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px', marginBottom: '24px',
                  background: `rgba(228,137,21,0.12)`, border: `1px solid rgba(228,137,21,0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', color: amber,
                }}>
                  <i className={`fa-solid ${t.icon}`} />
                </div>
                <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 800, color: cream, textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.3px' }}>
                  {t.title}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pledge strip */}
          <div style={{
            background: amber, borderRadius: '12px', padding: '22px 36px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px',
          }}>
            <i className="fa-solid fa-award" style={{ fontSize: '22px', color: cream, flexShrink: 0 }} />
            <p style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: cream, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
              Every TRIAM A+ Bar is Tested to Beat the Standard — Not Just Pass It.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LAB + DISPATCH — two columns
      ══════════════════════════════════ */}
      <section style={{ padding: '90px 0', background: cream }}>
        <div className="container">
          <div className="quality-lab-grid" style={{ gap: '24px' }}>
            {[
              {
                icon: 'fa-microscope',
                tag: 'Lab Analysis',
                title: 'Metallurgical Analysis',
                body: 'Microscopy examines grain structure, rib geometry and surface defects at microscopic level — confirming the make-up of every bar that leaves the mill.',
              },
              {
                icon: 'fa-truck-ramp-box',
                tag: 'Dispatch Protocol',
                title: 'Final Dispatch Check',
                body: 'A final re-check at the dispatch yard, to our Quality Assurance Plan (QAP). Nothing ships until it earns the A+ name — every bundle, tag and certificate verified.',
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: smoke, border: '1px solid #ddd8cf',
                borderRadius: '18px', overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,42,58,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Dark header strip */}
                <div style={{ background: ink, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(228,137,21,0.15)', border: '1px solid rgba(228,137,21,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: amber }}>
                    <i className={`fa-solid ${card.icon}`} />
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: amber, marginBottom: '2px' }}>{card.tag}</div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, color: cream, textTransform: 'uppercase' }}>{card.title}</div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: '28px', borderLeft: `4px solid ${amber}` }}>
                  <p style={{ margin: 0, fontSize: '14.5px', color: muted, lineHeight: 1.85 }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer pledge card */}
          <div style={{
            marginTop: '32px',
            background: smoke, border: '1px solid #ddd8cf',
            borderRadius: '16px', padding: '28px 36px',
            display: 'flex', gap: '20px', alignItems: 'center',
            textAlign: 'left',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(228,137,21,0.1)`, border: `1px solid rgba(228,137,21,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: amber, flexShrink: 0 }}>
              <i className="fa-solid fa-star" />
            </div>
            <p style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 800, color: ink, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              Defect-Free Bars, Built to Perform and Proven to Last.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════ */}
      <section style={{ background: ink, padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle amber top glow */}
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: `radial-gradient(ellipse, rgba(228,137,21,0.09) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Header + Download button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '52px' }}>
            <div>
              <div style={{ ...eyebrow, color: amber }}><span style={eyebrowLine} />Verified & Certified</div>
              <h2 style={{ ...displayH('clamp(36px,5vw,60px)'), color: cream, marginBottom: '0' }}>
                Our Certifications
              </h2>
            </div>
            <a
              href="/TRIAM-Brochure-pdf.pdf"
              download="TRIAM-A+-Brochure.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: amber, color: cream,
                padding: '13px 26px', borderRadius: '8px',
                fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 6px 22px rgba(228,137,21,0.3)',
                transition: 'all 0.25s ease', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f5a520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = amber; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <i className="fa-solid fa-download" style={{ fontSize: '14px' }} />
              Download Brochure
            </a>
          </div>

          {/* Cert grid */}
          <div className="quality-cert-grid" style={{ gap: '18px' }}>
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative', overflow: 'hidden', borderRadius: '12px',
                  border: `1.5px solid ${certHover === idx ? amber : 'rgba(255,255,255,0.1)'}`,
                  transition: 'all 0.3s ease',
                  transform: certHover === idx ? 'translateY(-6px) scale(1.02)' : 'none',
                  boxShadow: certHover === idx ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${amber}` : '0 4px 16px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setCertHover(idx)}
                onMouseLeave={() => setCertHover(null)}
              >
                {/* Amber shimmer on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `rgba(228,137,21,${certHover === idx ? 0.08 : 0})`,
                  transition: 'background 0.3s ease',
                  zIndex: 2, pointerEvents: 'none',
                }} />
                <img
                  src={cert}
                  alt={`Certification ${idx + 1}`}
                  style={{ width: '100%', display: 'block', borderRadius: '10px', aspectRatio: '3/4', objectFit: 'cover' }}
                />
                {/* Index badge */}
                <div style={{
                  position: 'absolute', top: '10px', left: '10px', zIndex: 3,
                  background: certHover === idx ? amber : 'rgba(0,0,0,0.5)',
                  color: cream, fontSize: '10px', fontWeight: 800, letterSpacing: '1px',
                  padding: '3px 8px', borderRadius: '4px', transition: 'background 0.3s ease',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>

          {/* ISO badges strip */}
          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'IS 1786:2008', 'NABL Accredited', 'BIS Certified'].map((badge, i) => (
              <div key={i} style={{
                background: 'rgba(228,137,21,0.08)', border: '1px solid rgba(228,137,21,0.2)',
                borderRadius: '50px', padding: '7px 16px',
                fontSize: '11px', fontWeight: 700, color: amber,
                letterSpacing: '0.5px',
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: smoke }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, #0d1621 0%, ${ink} 100%)`,
            borderRadius: '20px', overflow: 'hidden',
            position: 'relative', padding: '56px 56px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '32px',
          }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: `radial-gradient(circle, rgba(228,137,21,0.1) 0%, transparent 65%)` }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '12px' }}>Experience The Difference</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 1.0, margin: 0 }}>
                Strong is expected<br />
                <span style={{ color: amber }}>A+ is engineered.</span>
              </h3>
            </div>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: amber, color: cream,
                padding: '14px 28px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(228,137,21,0.3)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5a520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = amber; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Contact Our Team
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '12px' }} />
              </Link>
              <Link to="/Fe-550D-Grade-TMT-16mm-20mm" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: 'rgba(255,255,255,0.7)',
                padding: '14px 28px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.15)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = cream; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
