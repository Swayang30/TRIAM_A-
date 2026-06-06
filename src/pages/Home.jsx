import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import GermanTechnology from '../components/GermanTechnology';
import OnsiteAdviceForm from '../components/OnsiteAdviceForm';

/* ── ReactBits-style TextType: types a long string character-by-character ── */
function TextType({ text, typingSpeed = 70 }) {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed('');
    setDone(false);
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, typingSpeed);
    return () => clearInterval(timer);
  }, [started, text, typingSpeed]);

  const paragraphs = displayed.split('\n\n');

  return (
    <div ref={ref} className="cp-typed-wrap">
      {paragraphs.map((para, i) => (
        <p key={i} className="cp-para">
          {para}
          {!done && i === paragraphs.length - 1 && (
            <span className="tw-cursor" style={{ color: 'var(--c-accent)' }}>|</span>
          )}
        </p>
      ))}
    </div>
  );
}

function TypeWriter({ lines, speed = 38 }) {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);
  const fullText = lines.join('\n');

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed('');
    setDone(false);
    const t = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [started, fullText, speed]);

  const parts = displayed.split('\n');

  return (
    <h2 ref={ref} className="section-title tw-heading" style={{ marginBottom: '24px' }}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {part}
        </React.Fragment>
      ))}
      {!done && <span className="tw-cursor">|</span>}
    </h2>
  );
}

export default function Home() {
  const [hoveredIdx, setHoveredIdx] = React.useState(null);
  const [certGroupIdx, setCertGroupIdx] = React.useState(0);
  const [certFading, setCertFading] = React.useState(false);
  const certTimerRef = React.useRef(null);
  const CERT_GROUPS = 3;

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

  const startCertTimer = React.useCallback(() => {
    clearInterval(certTimerRef.current);
    certTimerRef.current = setInterval(() => {
      setCertFading(true);
      setTimeout(() => { setCertGroupIdx(prev => (prev + 1) % CERT_GROUPS); setCertFading(false); }, 380);
    }, 4200);
  }, [CERT_GROUPS]);

  React.useEffect(() => {
    startCertTimer();
    return () => clearInterval(certTimerRef.current);
  }, [startCertTimer]);

  const goToCert = (idx) => { setCertFading(true); setTimeout(() => { setCertGroupIdx(idx); setCertFading(false); }, 380); startCertTimer(); };
  const prevCert = () => { setCertFading(true); setTimeout(() => { setCertGroupIdx(prev => (prev - 1 + CERT_GROUPS) % CERT_GROUPS); setCertFading(false); }, 380); startCertTimer(); };
  const nextCert = () => { setCertFading(true); setTimeout(() => { setCertGroupIdx(prev => (prev + 1) % CERT_GROUPS); setCertFading(false); }, 380); startCertTimer(); };

  const popularProducts = [
    {
      size: '8 – 12 mm',
      grade: 'Fe 500D',
      desc: 'Ideal for stirrups, slabs, staircases, beams & columns in residential & low-rise buildings. Balances cost with long-term longevity. Available in customized TDC (Technical Delivery Conditions).',
      url: '/Fe-500D-Grade-TMT-8mm-12mm'
    },
    {
      size: '16 – 20 mm',
      grade: 'Fe 550D',
      sub: '(22)*',
      desc: 'Built for beams, columns & high-load slabs. Engineered for crack resistance and continuous-load endurance.',
      note: '* 22 mm: Roof bolt application in mining industry.',
      url: '/Fe-550D-Grade-TMT-16mm-20mm'
    },
    {
      size: '25 – 32 mm',
      grade: 'Fe 550D',
      desc: 'Suited for high-rise buildings, bridges, dams & industrial structures. Withstands wind, seismic forces, and sustained vertical stress.',
      url: '/Fe-550D-Grade-TMT-25mm-32mm'
    }
  ];

  const projects = [
    {
      name: 'Highway Connector',
      text: 'Our rebars help distribute heavy loads evenly, making them the smart choice for high-traffic structures like bridges, flyovers, and highway connectors.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/vEiHaErFtCmTeBCGBgC62Br6giC8GkgmVDztBBb0.jpg'
    },
    {
      name: 'Stadium',
      text: 'Built for massive super-structures. With a minimum flexibility (elongation) of 17%, our bars offer extra safety for large-scale projects like stadiums and housing complexes.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/9nN7L14i7BwqhbnwqonKJDXmtEPsrqLm84PCLOek.avif'
    },
    {
      name: 'Power House',
      text: 'Triam A+ Fe 550D delivers the consistent high strength needed for critical infrastructure like power plants and dams, where there is no room for error.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/IujJkesLsAOqOTmEjjYggwL98vV6THMyvRS2Se1q.webp'
    },
    {
      name: 'Highrise Building',
      text: 'Triam A+ Fe 550D is designed for superior ductility as demanded by elevated heights. With a minimum 17% elongation, our rebars absorb seismic energy and wind pressure.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/vEiHaErFtCmTeBCGBgC62Br6giC8GkgmVDztBBb0.jpg'
    }
  ];

  const clientLogos = [
    'https://wheat-termite-712594.hostingersite.com/storage/media/QUa1eQ9hGaHlZHO2gXZHP9cpO4EotyHWWCVp2LL8.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/jB4NG15IoNJcrAGIyrBbqxp2lO0SUtrNkQ8rKehM.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/WehXb3MJxx0Hoo6KrCnbSANmilPVJcKykPz04Ain.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/lShpqyy6zHog8ABHZi28WX368TXA1JVlzgizYUar.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/lyOzIgcYU68Ro1HPFL0mOklAGP0jcBXBQc1AANfe.jpg',
    'https://wheat-termite-712594.hostingersite.com/storage/media/HR6nXqom91VARhUhYV4Gy77YGz7TYtXBPZCEFSuX.jpg'
  ];

  const testimonials = [
    {
      name: 'Bikash Debnath',
      role: 'Dealer',
      feedback: 'My association with TRIAMTMT has been long-standing, and with every passing day, my business continues to grow steadily. The consistent quality of products and the strong support from the TRIAMTMT marketing team have played a crucial role in my success.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/yEHtlWy7XwdC5RZhWjG4EUIMxwNzQPZKkC49yENG.jpg'
    },
    {
      name: 'Shuvendu Mahato',
      role: 'Business Owner',
      feedback: 'Working with TRIAMTMT has been a truly rewarding experience. Their product quality is consistently reliable, and the support from their team has helped me expand my business with confidence.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/C4vxD6udwxZBSzbHAITc8VMHos50w2brwiydxIxJ.jpg'
    },
    {
      name: 'Pabitra Mahato',
      role: 'Volunteer',
      feedback: 'My journey with TRIAMTMT has been excellent so far. Their strong market presence and continuous guidance from the support team have significantly contributed to the growth of my business.',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/iD6Ycynw9mC169q78v1O9ekRTnaLCNs34fOpZKol.jpg'
    }
  ];

  const whyReasons = [
    {
      num: '01',
      title: '100% Tested Billets',
      desc: 'Every bar begins with spectrometer-verified billets, cross-checked through wet chemical analysis before a single rod is rolled.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
      )
    },
    {
      num: '02',
      title: 'SAIL Authorised Agent',
      desc: 'As an official SAIL conversion partner, we access premium steel grades with guaranteed metallurgical pedigree — quality that begins before our plant.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
      )
    },
    {
      num: '03',
      title: 'German Thermex Process',
      desc: 'Our Thermex quenching system creates a hardened martensite outer shell over a ductile ferritic-pearlitic core — strength and flexibility in one bar.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v6m0 0l3-3m-3 3L9 5M12 22a7 7 0 0 0 7-7c0-3.87-7-13-7-13S5 11.13 5 15a7 7 0 0 0 7 7z"/></svg>
      )
    },
    {
      num: '04',
      title: 'NABL Lab Precision',
      desc: 'In-house NABL-accredited laboratory with Universal Testing Machines and spectrometers delivers real-time results — corrections made before any issue ships.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 9H17v1.5c0 .83.67 1.5 1.5 1.5"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/></svg>
      )
    },
    {
      num: '05',
      title: 'Triple ISO Certified',
      desc: 'ISO 9001 · ISO 14001 · ISO 45001 — quality management, environmental responsibility, and worker safety are built into our operating system.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
      )
    }
  ];

  const blogs = [
    {
      slug: 'aliquam-officiis-sae',
      title: 'Why TMT Fe550D is Best for House Building In India',
      excerpt: 'High strength, ductility, and corrosion resistance make Fe550D the ideal choice for residential builds across India.',
      category: 'TMT Bars',
      date: 'Nov 23, 2025',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/5N3G6TsaVsCrUKGWqNMA6mPcxCGuyBYkKVh95FEU.webp'
    },
    {
      slug: 'greening-our-cities-with-urban-gardens',
      title: 'How To Choose The Best TMT Bar For Construction',
      excerpt: 'Check brand reputation, manufacturing parameters, and consult a structural engineer before selecting.',
      category: 'TMT Bars',
      date: 'Oct 21, 2025',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/Be9jnHP4SIO7kjtn5tiBighGwpNQBuPiAorI8fqp.webp'
    },
    {
      slug: 'eco-friendly-products-for-a-sustainable-lifestyle',
      title: 'Top 5 Tips for Selecting Earthquake-Resistant TMT Bars',
      excerpt: 'When the ground trembles, concrete alone cannot ensure safety. Learn how to pick seismic-grade bars.',
      category: 'Seismic Grade',
      date: 'Oct 21, 2025',
      image: 'https://wheat-termite-712594.hostingersite.com/storage/media/XTngJABQQFC9kzLTcPGeTJkx05woTO5G42zd3hPl.avif'
    }
  ];

  return (
    <main>
      {/* ── Hero ── */}
      <HeroSlider />

      {/* ── Corporate Profile — Dark Redesign ── */}
      <section className="cp-section">
        {/* Background layers */}
        <div className="cp-bg-grid" aria-hidden="true" />
        <div className="cp-bg-glow-left" aria-hidden="true" />
        <div className="cp-bg-glow-right" aria-hidden="true" />
        <div className="cp-watermark" aria-hidden="true">TRIAM</div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section eyebrow */}
          <div className="tmt-eyebrow">Corporate Profile</div>

          {/* Main two-column grid */}
          <div className="cp-grid">

            {/* Left: Heading + Typed Paragraphs */}
            <div className="cp-content">
              <TypeWriter
                lines={['Engineered with Intent —', 'Building a Stronger Nation']}
                speed={38}
              />
              <div className="cp-accent-rule" />
              <TextType
                typingSpeed={70}
                text={
                  `At Triam TMT, we are driven by an unwavering commitment to strength, precision, and progress. Our revamped identity embodies what we have always believed: that great structures are not merely built — they are engineered with intent. The very name Triam reflects our pursuit of excellence — a promise of superior quality embedded in every rebar we manufacture. This philosophy shapes our brand's core values: resilience, reliability, and the relentless drive to raise the bar, quite literally.\n\nRooted in ethical manufacturing, advanced technology, and a deep respect for the communities we serve, Triam TMT is dedicated to delivering reinforcing steel that sets new benchmarks for the construction industry. From high-rise residential towers to sprawling infrastructure projects, every Triam A+ TMT bar is a testament to our belief that strength and quality must never be compromised.\n\nOur vision is to empower India's infrastructure future, making Triam TMT a name synonymous with trust in every home, every bridge, and every landmark that shapes tomorrow.`
                }
              />
            </div>

            {/* Right: Stat Cards */}
            <div className="cp-stats-col">
              {[
                { num: '₹1,000 Cr+', label: 'Annual Turnover',   icon: '◈' },
                { num: '5,25,000 MT', label: 'Yearly Capacity',   icon: '◈' },
                { num: '450+',        label: 'Trusted Dealers',   icon: '◈' },
                { num: 'SAIL',        label: 'Conversion Agent',  icon: '◈' },
              ].map((stat, i) => (
                <div key={i} className="cp-stat-card">
                  <div className="cp-stat-inner">
                    <div className="cp-stat-num">{stat.num}</div>
                    <div className="cp-stat-label">{stat.label}</div>
                  </div>
                  <div className="cp-stat-bar" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Products — Two-Column Redesign ── */}
      <section className="products-v2">
        <div className="container">
          <div className="products-v2-header">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="eyebrow-dot" />
              <span className="eyebrow-text">Products</span>
            </div>
            <h2 className="section-title mb-2">Our Popular Products</h2>
            <p className="section-subtitle mb-0">Triam A+ Fe 550D — engineered for every scale of construction.</p>
          </div>

          <div className="products-v2-layout">

            {/* ── Left: Product Cards ── */}
            <div className="products-v2-left">
              {popularProducts.map((p, idx) => (
                <div key={idx} className="pv2-card">
                  <div className="pv2-accent-bar" style={{ background: [
                    'linear-gradient(90deg, #64748b, #475569)',
                    'linear-gradient(90deg, #e48915, #dd6b20)',
                    'linear-gradient(90deg, #d97706, #92400e)',
                  ][idx] }} />
                  <div className="pv2-body">
                    <div className="pv2-top-row">
                      <span className="pv2-pill">{p.grade} ®</span>
                      <span className="pv2-grade-lbl">{p.grade} Grade TMT</span>
                    </div>
                    <div className="pv2-size-display">
                      {p.size}{p.sub && <sup>{p.sub}</sup>}
                    </div>
                    <div className="pv2-bar-stage">
                      <img
                        src="/triam-tmt-bar.png"
                        className={`pv2-bar-img pv2-bar-${idx}`}
                        alt="Triam A+ TMT Bar"
                      />
                    </div>
                    <p className="pv2-desc-text">{p.desc}</p>
                    {p.note && <span className="pv2-note-tag">{p.note}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Right: Properties + CTAs (sticky) ── */}
            <div className="products-v2-right">
              <div className="pv2-panel">

                {/* Panel Header */}
                <div className="pv2-ph">
                  <div className="pv2-ph-eye">Key Properties</div>
                  <h3 className="pv2-ph-title">Across All Sizes</h3>
                </div>

                <hr className="pv2-hr" />

                {/* Properties List */}
                <div className="pv2-props">
                  {[
                    { name: 'Superior Strength & Excellent Bendability', bg: 'rgba(59,130,246,0.15)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 4h8M8 20h8"/></svg> },
                    { name: 'High Seismic & Earthquake Resistance', bg: 'rgba(245,158,11,0.15)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2"><path d="M2 12c2-4 4-6 6-6s4 6 6 6 4-6 6-6"/><path d="M2 18c2-4 4-6 6-6s4 6 6 6 4-6 6-6"/></svg> },
                    { name: 'Anti-Corrosive & Fire Resistant Property', bg: 'rgba(34,197,94,0.15)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
                    { name: 'Adherence to Stringent Quality Norms', bg: 'rgba(167,139,250,0.15)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2"><circle cx="12" cy="8" r="4"/><path d="M5 19a7 7 0 0 1 14 0"/></svg> },
                    { name: 'Durability & Value-for-money', bg: 'rgba(45,212,191,0.15)', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.2"><circle cx="12" cy="12" r="8"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-3 3-3 5"/><path d="M12 18h.01"/></svg> },
                  ].map((prop, i) => (
                    <div key={i} className="pv2-prop-row">
                      <div className="pv2-prop-ic" style={{ background: prop.bg }}>
                        {prop.icon}
                      </div>
                      <span className="pv2-prop-nm">{prop.name}</span>
                    </div>
                  ))}
                </div>

                <hr className="pv2-hr" />

                {/* CTA Groups — one per product */}
                {popularProducts.map((p, idx) => (
                  <div key={idx} className="pv2-cta-group">
                    <div className="pv2-cta-head">
                      <span className="pv2-cta-sz">{p.size}</span>
                      <span className="pv2-cta-gd">{p.grade}</span>
                    </div>
                    <div className="pv2-cta-row">
                      <Link to={p.url} className="pv2-btn-outline">View Details →</Link>
                      <Link to="/contact" className="pv2-btn-fill">Enquire Now</Link>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Action Strip — after Products, before Strength Banner ── */}
      <div className="button-row">
        <Link to="/contact" className="btn2">Request a Call Back</Link>
        <Link to="/contact" className="btn3">Become a Channel Partner</Link>
      </div>

      {/* ── Strength Banner ── */}
      <section className="strength-banner">
        {/* Decorative background elements (no photo) */}
        <div className="strength-banner-dots" aria-hidden="true" />
        <div className="strength-banner-glow" aria-hidden="true" />

        {/* Text content */}
        <div className="strength-banner-content container">
          <div className="strength-banner-inner">
            <div className="strength-banner-left">
              <div className="tmt-eyebrow strength-banner-eyebrow">Quality Engineering</div>
              <h2 className="strength-banner-headline">
                High Strength<br />
                <span className="strength-banner-highlight">Deformed Bars</span>
                <br />with Latest Technology
              </h2>
              <div className="strength-banner-rule" />
            </div>
            <div className="strength-banner-divider" aria-hidden="true" />
            <div className="strength-banner-tags-col">
              {['Fe 550D Grade', 'BIS Certified', 'NABL Tested', 'German Thermex Process', 'SAIL Authorised'].map((tag, i) => (
                <span key={i} className="strength-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Photo — displayed after the headline, not as background */}
        <div className="strength-banner-photo-wrap">
          <img
            src="https://wheat-termite-712594.hostingersite.com/storage/media/uadDVvZP3T4rAjuh8rM1fxK22cxlIoXny2mVqqhW.webp"
            alt="High Strength TMT Deformed Bars"
            className="strength-banner-photo"
          />
        </div>
      </section>

      {/* ── Projects Showcase ── */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--c-smoke)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="tmt-eyebrow" style={{ justifyContent: 'center' }}>Our Projects</div>
            <h2 className="section-title">Built with Triam A+</h2>
            <p style={{ fontSize: '15px', color: 'var(--c-muted)', maxWidth: '520px', margin: '12px auto 0' }}>
              From homes to highways — our steel stands in India's most ambitious structures.
            </p>
          </div>
          <div className="row g-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="tmt-project-card">
                  <img
                    src={`https://wheat-termite-712594.hostingersite.com${proj.image}`}
                    alt={proj.name}
                    onError={e => { e.target.src = proj.image; }}
                  />
                  <div className="tmt-project-overlay" />
                  <div className="tmt-project-content">
                    <span className="tmt-project-tag">Structure</span>
                    <div className="tmt-project-name">{proj.name}</div>
                    <p className="tmt-project-text">{proj.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Triam A+ ── */}
      <section className="why-choose-section">
        <div className="why-choose-bg-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="wc-section-header">
            <div className="tmt-eyebrow why-choose-eyebrow" style={{ justifyContent: 'center' }}>Why Choose Triam A+</div>
            <h2 className="wc-section-title">
              Five Reasons Builders<br />
              <span className="wc-title-accent">Trust Us</span>
            </h2>
            <div className="wc-header-divider" />
            <p className="wc-section-subtitle">
              Every bar we produce is built on a foundation of verified standards — from billet to building.
            </p>
          </div>

          <div className="why-choose-grid">
            {whyReasons.map((r, idx) => (
              <div key={idx} className="wc-card">
                <div className="wc-num">{r.num}</div>
                <div className="wc-icon-wrap">{r.icon}</div>
                <h3 className="wc-title">{r.title}</h3>
                <p className="wc-desc">{r.desc}</p>
                <div className="wc-bottom-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form / Benefits ── */}
      <OnsiteAdviceForm />

      {/* ── German Thermex Technology ── */}
      <GermanTechnology />

      {/* ── Clientele — Auto-Scroll Marquee ── */}
      <section className="clientele-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '44px' }}>
            <div className="tmt-eyebrow" style={{ justifyContent: 'center' }}>Clientele</div>
            <h2 className="section-title">Our Valued Clients</h2>
          </div>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-fade marquee-fade-left" />
          <div className="marquee-fade marquee-fade-right" />
          <div className="marquee-track">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={idx} className="marquee-item">
                <img src={logo} alt="Client" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--c-white)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="tmt-eyebrow" style={{ justifyContent: 'center' }}>Testimonials</div>
            <h2 className="section-title">Real Stories, Real Trust</h2>
            <p style={{ fontSize: '15px', color: 'var(--c-muted)', maxWidth: '440px', margin: '12px auto 0' }}>
              The people who build with us, grow with us.
            </p>
          </div>
          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="col-lg-4">
                <div className="tmt-testimonial-card">
                  <span className="tmt-testimonial-quote">"</span>
                  <p className="tmt-testimonial-text">"{t.feedback}"</p>
                  <div className="tmt-testimonial-author">
                    <img src={t.image} alt={t.name} />
                    <div>
                      <span className="tmt-testimonial-name">{t.name}</span>
                      <span className="tmt-testimonial-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Knowledge Hub — Redesigned ── */}
      <section className="hub-section">
        <div className="container">
          <div className="hub-header">
            <div>
              <div className="tmt-eyebrow">Knowledge Hub</div>
              <h2 className="section-title hub-title">Latest Updates</h2>
            </div>
            <Link to="/blog" className="hub-view-all">
              Explore All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="hub-grid">
            <Link to={`/blog/${blogs[0].slug}`} className="hub-featured">
              <div className="hub-featured-bg" style={{ backgroundImage: `url(${blogs[0].image})` }} />
              <div className="hub-featured-overlay" />
              <div className="hub-featured-content">
                <span className="hub-tag">{blogs[0].category}</span>
                <h3 className="hub-featured-title">{blogs[0].title}</h3>
                <p className="hub-featured-excerpt">{blogs[0].excerpt}</p>
                <div className="hub-featured-meta">
                  <span className="hub-date">{blogs[0].date}</span>
                  <span className="hub-read-more">Read Article →</span>
                </div>
              </div>
            </Link>

            <div className="hub-secondary">
              {blogs.slice(1).map((b, idx) => (
                <Link key={idx} to={`/blog/${b.slug}`} className="hub-secondary-card">
                  <div className="hub-secondary-img">
                    <img src={b.image} alt={b.title} />
                  </div>
                  <div className="hub-secondary-content">
                    <span className="hub-tag hub-tag-dark">{b.category}</span>
                    <h3 className="hub-secondary-title">{b.title}</h3>
                    <p className="hub-secondary-excerpt">{b.excerpt}</p>
                    <span className="hub-date" style={{ color: 'var(--c-amber)' }}>{b.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications — 3-Up Card Slider ── */}
      <section className="cert-section">
        <div className="cert-section-bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center" style={{ marginBottom: '52px' }}>
            <div className="tmt-eyebrow" style={{ justifyContent: 'center' }}>Certifications</div>
            <h2 className="section-title" style={{ marginBottom: '14px' }}>Quality You Can Verify.</h2>
            <p style={{ fontSize: '15px', color: 'var(--c-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.8' }}>
              Manufactured in compliance with IS:1786:2008 and certified under ISO 9001, ISO 14001 &amp; ISO 45001.
            </p>
          </div>

          <div className="cert-multi-nav">
            <button className="cert-arrow cert-prev" onClick={prevCert} aria-label="Previous certificates">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className={`cert-multi-grid${certFading ? ' cert-fading' : ''}`}>
              {[0, 1, 2].map(offset => {
                const idx = (certGroupIdx * 3 + offset) % certifications.length;
                return (
                  <div key={`${certGroupIdx}-${offset}`} className="cert-card">
                    <div className="cert-card-badge">{idx + 1}</div>
                    <img src={certifications[idx]} alt={`Certificate ${idx + 1}`} className="cert-card-img" />
                  </div>
                );
              })}
            </div>

            <button className="cert-arrow cert-next" onClick={nextCert} aria-label="Next certificates">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <div className="cert-group-label">
            Set {certGroupIdx + 1} of {CERT_GROUPS}
          </div>

          <div className="cert-dots">
            {Array.from({ length: CERT_GROUPS }).map((_, idx) => (
              <button
                key={idx}
                className={`cert-dot ${idx === certGroupIdx ? 'cert-dot-active' : ''}`}
                onClick={() => goToCert(idx)}
                aria-label={`Go to certificate group ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/quality" className="triam-btn triam-btn-yellow">
              View All Certificates →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
