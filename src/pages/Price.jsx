import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Ticker: scrolling price strip ── */
function PriceTicker() {
  const items = [
    '8mm · ₹351', '10mm · ₹538', '12mm · ₹773',
    '16mm · ₹1,375', '20mm · ₹2,148', '25mm · ₹3,356',
    'FE 550D · ISI Certified', 'Updated Nov 2025',
    '8mm · ₹351', '10mm · ₹538', '12mm · ₹773',
    '16mm · ₹1,375', '20mm · ₹2,148', '25mm · ₹3,356',
    'FE 550D · ISI Certified', 'Updated Nov 2025',
  ];
  return (
    <div style={{ background: '#e48915', overflow: 'hidden', padding: '10px 0', position: 'relative', zIndex: 5 }}>
      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { display:flex; gap:0; width:max-content; animation:ticker 28s linear infinite; }
        .ticker-item { display:inline-flex; align-items:center; gap:14px; padding:0 28px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; color:#1b2a3a; white-space:nowrap; letter-spacing:0.3px; }
        .ticker-item::after { content:''; width:4px; height:4px; border-radius:50%; background:rgba(27,42,58,0.35); }
        select.pd-select { appearance:none; -webkit-appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23e48915' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; }
        .pd-select:focus { outline:none; border-color:#e48915 !important; box-shadow:0 0 0 3px rgba(228,137,21,0.12) !important; }
        .price-row:hover td { background:rgba(228,137,21,0.04) !important; }
        .info-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(27,42,58,0.1) !important; border-color:#e2dcd0 !important; }
      `}</style>
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── CountUp — ReactBits-compatible (no gsap/motion dep) ── */
function CountUp({
  from      = 0,
  to,
  duration  = 2,
  separator = ',',
  direction = 'up',
  className = '',
  style     = {},
}) {
  const start    = direction === 'up' ? from : to;
  const end      = direction === 'up' ? to   : from;
  const [val, setVal] = useState(start);
  const nodeRef  = useRef(null);
  const fired    = useRef(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const t0   = performance.now();
        const diff = end - start;
        const tick = (now) => {
          const p    = Math.min((now - t0) / (duration * 1000), 1);
          const ease = 1 - Math.pow(1 - p, 4);   // ease-out-quart
          setVal(Math.round(start + diff * ease));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [start, end, duration]);

  const fmt = (n) =>
    separator ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(n);

  return <span ref={nodeRef} className={className} style={style}>{fmt(val)}</span>;
}

export default function Price() {
  const [selectedState,    setSelectedState]    = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [heroIn,           setHeroIn]           = useState(false);
  const [cardHover,        setCardHover]        = useState(null);
  const [priceName,    setPriceName]    = useState('');
  const [pricePhone,   setPricePhone]   = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 80); return () => clearTimeout(t); }, []);

  const stateDistricts = {
    'Assam':       ['Guwahati', 'Dibrugarh', 'Silchar'],
    'Bihar':       ['Patna', 'Gaya', 'Muzaffarpur'],
    'Delhi':       ['New Delhi', 'South Delhi'],
    'Gujarat':     ['Ahmedabad', 'Surat', 'Vadodara'],
    'Haryana':     ['Gurugram', 'Faridabad', 'Panipat'],
    'Jharkhand':   ['Ranchi', 'Jamshedpur', 'Dhanbad'],
    'Punjab':      ['Ludhiana', 'Amritsar', 'Jalandhar'],
    'Rajasthan':   ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Tripura':     ['Agartala', 'Udaipur', 'Dharmanagar'],
    'West Bengal': ['Kolkata', 'Howrah', 'Siliguri'],
    'Western U.P': ['Noida', 'Ghaziabad', 'Meerut'],
  };
  const states = Object.keys(stateDistricts);

  const handleStateChange = (e) => { setSelectedState(e.target.value); setSelectedDistrict(''); };

  const getPrice = async () => {
    if (!selectedState || !selectedDistrict || !priceName.trim() || !pricePhone.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source:  'price-inquiry',
          name:    priceName.trim(),
          phone:   pricePhone.trim(),
          email:   '',
          city:    `${selectedDistrict}, ${selectedState}`,
          message: '',
          product: 'TMT Bar Price List PDF',
          page:    window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        const link = document.createElement('a');
        link.href = '/Price-list.jpeg';
        link.download = 'TRIAM-A+-Price-List.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── price table data ── */
  const priceRows = [
    { size: '8mm',  wb: '₹351',    bj: '₹391',    up: '₹407',    as: '₹399'   },
    { size: '10mm', wb: '₹538',    bj: '₹582',    up: '₹605',    as: '₹594'   },
    { size: '12mm', wb: '₹773',    bj: '₹844',    up: '₹876',    as: '₹860'   },
    { size: '16mm', wb: '₹1,375',  bj: '₹1,496',  up: '₹1,554',  as: '₹1,525' },
    { size: '20mm', wb: '₹2,148',  bj: '₹2,336',  up: '₹2,427',  as: '₹2,382' },
    { size: '25mm', wb: '₹3,356',  bj: '₹3,448',  up: '₹3,582',  as: '₹3,515' },
  ];

  const barThickness = { '8mm': 8, '10mm': 10, '12mm': 12, '16mm': 16, '20mm': 20, '25mm': 25 };

  /* ── tokens ── */
  const ink   = '#1b2a3a';
  const amber = '#e48915';
  const smoke = '#f4f3ee';
  const cream = '#ffffff';
  const muted = '#5a6a7a';

  const eyebrow = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
    color: amber, marginBottom: '14px', fontFamily: "'DM Sans', sans-serif",
  };
  const eyebrowLine = { width: '22px', height: '2px', background: amber, flexShrink: 0, borderRadius: '1px' };
  const displayH = (size = 'clamp(36px,5vw,54px)') => ({
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: size, fontWeight: 900, color: ink,
    textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.5px',
  });

  return (
    <main style={{ backgroundColor: smoke }}>
      <style>{`
        @media (max-width: 900px) {
          .price-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .price-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .price-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .price-buying-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .price-table-outer { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          .price-table-outer > div { min-width: 540px; }
        }
        @media (max-width: 576px) {
          .price-stats-grid > div { border-right: none !important; border-bottom: 1px solid #e8e2d8; padding: 20px 16px !important; }
          .price-stats-grid > div:nth-child(odd) { border-right: 1px solid #e8e2d8 !important; }
          .price-why-grid { grid-template-columns: 1fr !important; }
          .price-notes-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .price-disclaimer-grid { grid-template-columns: 1fr !important; }
          .price-cta-inner { padding: 44px 24px !important; }
          .price-picker-namerow { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(160deg, #080f18 0%, #0d1621 45%, ${ink} 100%)`,
        position: 'relative', overflow: 'hidden',
        paddingTop: '90px',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* Amber glow */}
        <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(228,137,21,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Accent diagonal */}
        <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, height: '1px', background: 'rgba(228,137,21,0.12)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '72px' }}>
          <div className="price-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '64px', alignItems: 'center' }}>

            {/* LEFT */}
            <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(228,137,21,0.12)', border: '1px solid rgba(228,137,21,0.25)', borderRadius: '50px', padding: '5px 14px 5px 10px', marginBottom: '24px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: amber, animation: 'tt-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber }}>Live Rate Card</span>
              </div>

              {/* Badge */}
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(72px,10vw,108px)', fontWeight: 900, color: 'rgba(255,255,255,0.06)', lineHeight: 0.85, letterSpacing: '-4px', textTransform: 'uppercase', marginBottom: '-12px', userSelect: 'none' }}>
                RATE
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(52px,7vw,84px)', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-2px', marginBottom: '8px' }}>
                CARD
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '3px', background: `linear-gradient(90deg, #c8401a, ${amber})`, borderRadius: '2px' }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 700, color: amber, textTransform: 'uppercase', letterSpacing: '1px' }}>Pricing & Service Overview</span>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.85, maxWidth: '480px', marginBottom: '36px' }}>
                Per-piece pricing across every size and delivery region — GST-inclusive, revised monthly to reflect current market rates. Build smarter with premium TRIAM A+ rebars.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: amber, color: cream,
                  padding: '13px 26px', borderRadius: '8px',
                  fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 6px 24px rgba(228,137,21,0.3)', transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f5a520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = amber; e.currentTarget.style.transform = 'none'; }}
                >
                  Request A Quote <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }} />
                </Link>
                <a href="#price-table" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  padding: '13px 26px', borderRadius: '8px',
                  fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.15)', transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = cream; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  View Price Table
                </a>
              </div>
            </div>

            {/* RIGHT — Price Picker Card */}
            <div style={{
              opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
            }}>
              <div style={{ background: cream, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
                {/* Card header */}
                <div style={{ background: ink, padding: '24px 28px', borderBottom: `3px solid ${amber}` }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '6px' }}>TRIAM A+ FE 550D</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 800, color: cream, textTransform: 'uppercase' }}>Latest TMT Bar Price List</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Let's Build a Strong Foundation for the Nation</div>
                </div>

                {/* Form body */}
                <div style={{ padding: '28px' }}>
                  {/* State select */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '7px' }}>Select State</label>
                    <select
                      value={selectedState}
                      onChange={handleStateChange}
                      className="pd-select"
                      style={{ width: '100%', height: '52px', padding: '0 44px 0 16px', border: `1.5px solid ${selectedState ? amber : '#ddd8cf'}`, borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: selectedState ? ink : '#8a8a8a', background: smoke, cursor: 'pointer', transition: 'border-color 0.2s' }}
                    >
                      <option value="">Choose your state</option>
                      {states.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>

                  {/* District select */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '7px' }}>Select District</label>
                    <select
                      value={selectedDistrict}
                      onChange={e => setSelectedDistrict(e.target.value)}
                      disabled={!selectedState}
                      className="pd-select"
                      style={{ width: '100%', height: '52px', padding: '0 44px 0 16px', border: `1.5px solid ${selectedDistrict ? amber : '#ddd8cf'}`, borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: selectedDistrict ? ink : '#8a8a8a', background: selectedState ? smoke : '#f9f9f9', cursor: selectedState ? 'pointer' : 'not-allowed', opacity: selectedState ? 1 : 0.55, transition: 'all 0.2s' }}
                    >
                      <option value="">Choose your district</option>
                      {selectedState && stateDistricts[selectedState].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* Name & Phone */}
                  <div className="price-picker-namerow" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '7px' }}>Your Name</label>
                      <input
                        type="text"
                        placeholder="Full name *"
                        value={priceName}
                        onChange={e => setPriceName(e.target.value)}
                        style={{ width: '100%', boxSizing: 'border-box', height: '48px', padding: '0 14px', border: `1.5px solid ${priceName ? amber : '#ddd8cf'}`, borderRadius: '10px', fontSize: '13px', color: ink, background: smoke, outline: 'none', transition: 'border-color 0.2s' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '7px' }}>Phone</label>
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={pricePhone}
                        onChange={e => setPricePhone(e.target.value)}
                        style={{ width: '100%', boxSizing: 'border-box', height: '48px', padding: '0 14px', border: `1.5px solid ${pricePhone ? amber : '#ddd8cf'}`, borderRadius: '10px', fontSize: '13px', color: ink, background: smoke, outline: 'none', transition: 'border-color 0.2s' }}
                      />
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={getPrice}
                    style={{ width: '100%', height: '54px', background: isSubmitting ? 'rgba(228,137,21,0.55)' : amber, color: cream, border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 800, letterSpacing: '0.3px', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.25s ease', boxShadow: '0 6px 20px rgba(228,137,21,0.32)' }}
                    onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = '#f5a520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.background = isSubmitting ? 'rgba(228,137,21,0.55)' : amber; e.currentTarget.style.transform = 'none'; }}
                  >
                    {isSubmitting ? 'Sending...' : <><i className="fa-solid fa-file-arrow-down" style={{ fontSize: '16px' }} /> Download Price List</>}
                  </button>
                  {submitStatus === 'success' && (
                    <p style={{ color: '#22c55e', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      ✅ Download started! Check your downloads folder.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#ef4444', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      ❌ Something went wrong. Please call us directly.
                    </p>
                  )}

                  {/* Footer note */}
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(228,137,21,0.06)', border: '1px solid rgba(228,137,21,0.15)', borderRadius: '8px' }}>
                    <i className="fa-solid fa-circle-info" style={{ color: amber, fontSize: '13px', flexShrink: 0 }} />
                    <span style={{ fontSize: '11.5px', color: '#7a6a5a' }}>Prices are GST-inclusive & updated monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker strip */}
        <PriceTicker />
      </section>

      {/* ══════════════════════════════════
          STATS STRIP
      ══════════════════════════════════ */}
      <section style={{ background: cream, borderBottom: '1px solid #e8e2d8' }}>
        <div className="container">
          <div className="price-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {[
              { icon: 'fa-calendar-check', value: 'Nov 2025', label: 'Last Updated',    sub: 'Prices revised monthly'         },
              { icon: 'fa-map-location-dot', value: '11',     label: 'States Covered', sub: 'Across India'                   },
              { icon: 'fa-ruler',            value: '6',      label: 'Bar Sizes',       sub: '8mm to 25mm diameter'           },
              { icon: 'fa-receipt',          value: '100%',   label: 'GST Inclusive',   sub: 'No hidden charges'              },
            ].map((s, i) => (
              <div key={i} style={{ padding: '28px 24px', borderRight: i < 3 ? '1px solid #e8e2d8' : 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '18px', flexShrink: 0 }}>
                  <i className={`fa-solid ${s.icon}`} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 900, color: ink, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: ink, marginTop: '2px' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY THIS PAGE MATTERS
      ══════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: smoke }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ ...eyebrow, justifyContent: 'center' }}><span style={eyebrowLine} />Transparent Pricing<span style={eyebrowLine} /></div>
            <h2 style={{ ...displayH(), marginBottom: '12px' }}>Why This Price Page Matters</h2>
            <p style={{ color: muted, fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>Know exactly what you're paying — by region, by size, by grade.</p>
          </div>

          <div className="price-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { icon: 'fa-scale-balanced',   title: 'Instant Comparison',       desc: 'Compare prices across regions in one view before placing any order.' },
              { icon: 'fa-calculator',       title: 'Budgeting Accuracy',        desc: 'Contractors, developers, and homebuilders can plan with confidence.' },
              { icon: 'fa-eye',              title: 'Clear Transparency',        desc: 'Eliminates middleman markup confusion. What you see is what you pay.' },
              { icon: 'fa-location-dot',     title: 'Regional Localization',     desc: 'Reflects logistics, taxes, and raw supply variables by state.' },
            ].map((c, i) => (
              <div key={i} className="info-card" style={{ background: cream, border: '1px solid #ddd8cf', borderRadius: '16px', padding: '28px 24px', transition: 'all 0.25s ease', cursor: 'default' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '20px', marginBottom: '18px' }}>
                  <i className={`fa-solid ${c.icon}`} />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: ink, textTransform: 'uppercase', marginBottom: '8px' }}>{c.title}</div>
                <p style={{ fontSize: '13.5px', color: muted, lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PRICE TABLE
      ══════════════════════════════════ */}
      <section id="price-table" style={{ background: '#060d14', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .pt-row { transition: background 0.18s; cursor: default; }
          .pt-row:hover { background: rgba(228,137,21,0.05) !important; }
          .pt-row:hover .pt-price-wb { color: #f5c842 !important; }
          @keyframes pt-live-pulse { 0%,100%{box-shadow:0 0 6px rgba(74,222,128,0.4)} 50%{box-shadow:0 0 14px rgba(74,222,128,0.9)} }
        `}</style>

        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
        {/* Central amber glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '1000px', height: '500px', background: 'radial-gradient(ellipse, rgba(228,137,21,0.06) 0%, transparent 68%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* ── Section header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '40px' }}>

            {/* Left: title with ghost watermark */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '-6px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '110px', fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.03)', lineHeight: 1, letterSpacing: '-4px', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                PRICING
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ width: '20px', height: '2px', background: amber, borderRadius: '1px', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: amber, fontFamily: "'DM Sans', sans-serif" }}>Per Piece · 12m Length</span>
                </div>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(40px,5vw,62px)', fontWeight: 900, textTransform: 'uppercase', color: cream, lineHeight: 0.92, letterSpacing: '-1px', margin: 0 }}>
                  TRIAM A+ TMT BAR<br />
                  <span style={{ color: amber }}>PRICE LIST</span>
                </h2>
              </div>
            </div>

            {/* Right: metadata card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0, animation: 'pt-live-pulse 2.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4ade80' }}>Live Rate Card</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'Effective', value: '1 Nov 2025' },
                  { label: 'Grade',    value: 'FE 550D'    },
                  { label: 'Standard', value: 'IS 1786'    },
                  { label: 'Unit',     value: 'INR/Piece'  },
                ].map((m, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '3px' }}>{m.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: cream }}>{m.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <i className="fa-solid fa-certificate" style={{ color: amber, fontSize: '11px' }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)' }}>ISI Certified · IS 1786:2008</span>
              </div>
            </div>
          </div>

          {/* Best-rate callout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '13px 20px', background: 'rgba(228,137,21,0.07)', border: '1px solid rgba(228,137,21,0.2)', borderRadius: '10px' }}>
            <i className="fa-solid fa-trophy" style={{ color: amber, fontSize: '14px', flexShrink: 0 }} />
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif" }}>
              <strong style={{ color: amber, fontWeight: 700 }}>West Bengal</strong> consistently offers the lowest base rates across all bar sizes due to proximity to manufacturing facilities. Regional % premiums shown below.
            </span>
          </div>

          {/* ── Table ── */}
          <div className="price-table-outer" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr 1fr', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ padding: '16px 24px', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>Bar Size</div>
              {[
                { name: 'West Bengal',       best: true  },
                { name: 'Bihar & Jharkhand', best: false },
                { name: 'Uttar Pradesh',     best: false },
                { name: 'Assam',             best: false },
              ].map((col, i) => (
                <div key={i} style={{
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                  borderTop: col.best ? `3px solid ${amber}` : '3px solid transparent',
                  background: col.best ? 'rgba(228,137,21,0.07)' : 'transparent',
                  padding: '12px 16px 10px',
                  textAlign: 'center',
                }}>
                  {col.best && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: amber, borderRadius: '4px', padding: '2px 8px', marginBottom: '7px' }}>
                      <i className="fa-solid fa-star" style={{ fontSize: '8px', color: ink }} />
                      <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: ink }}>Best Rate</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: col.best ? amber : 'rgba(255,255,255,0.4)' }}>
                    <i className="fa-solid fa-location-dot" style={{ fontSize: '9px' }} />
                    {col.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {priceRows.map((row, ri) => {
              const diameter = barThickness[row.size];
              const svgSize = 46;
              const cx = svgSize / 2;
              const circleR = 5 + (diameter / 25) * 13;
              const toNum = (s) => parseFloat(s.replace(/[₹,]/g, ''));
              const base = toNum(row.wb);
              const delta = (val) => { const p = Math.round(((toNum(val) - base) / base) * 100); return p > 0 ? `+${p}%` : null; };
              return (
                <div key={ri} className="pt-row" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr 1fr', borderBottom: ri < priceRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>

                  {/* Bar size cell */}
                  <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ flexShrink: 0 }}>
                      {/* Outer glow ring */}
                      <circle cx={cx} cy={cx} r={circleR + 4} fill="rgba(228,137,21,0.05)" />
                      {/* Main cross-section */}
                      <circle cx={cx} cy={cx} r={circleR} fill="#1a2738" stroke="rgba(228,137,21,0.45)" strokeWidth="1.5" />
                      {/* Internal ribbing lines */}
                      {[-0.45, 0, 0.45].map((offset, k) => (
                        <line key={k}
                          x1={cx - circleR * 0.65} y1={cx + offset * circleR * 0.7}
                          x2={cx + circleR * 0.65} y2={cx + offset * circleR * 0.7}
                          stroke="rgba(228,137,21,0.18)" strokeWidth="1"
                        />
                      ))}
                      {/* Centre dot */}
                      <circle cx={cx} cy={cx} r="2" fill="rgba(228,137,21,0.5)" />
                    </svg>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '32px', fontWeight: 900, color: cream, lineHeight: 1, letterSpacing: '-0.5px' }}>{row.size}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)', fontWeight: 600, letterSpacing: '0.5px', marginTop: '2px' }}>{diameter}mm ø · FE 550D</div>
                    </div>
                  </div>

                  {/* Price cells */}
                  {[
                    { val: row.wb, d: null,           best: true  },
                    { val: row.bj, d: delta(row.bj),  best: false },
                    { val: row.up, d: delta(row.up),  best: false },
                    { val: row.as, d: delta(row.as),  best: false },
                  ].map((p, ci) => (
                    <div key={ci} style={{ padding: '18px 16px', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', background: p.best ? 'rgba(228,137,21,0.04)' : 'transparent' }}>
                      <div className={p.best ? 'pt-price-wb' : ''} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '27px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.5px', color: p.best ? amber : cream, transition: 'color 0.18s' }}>
                        ₹<CountUp from={0} to={parseInt(p.val.replace(/[₹,]/g, ''), 10)} duration={1.8} separator="," />
                      </div>
                      {p.d
                        ? <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,100,100,0.75)', background: 'rgba(255,80,80,0.09)', borderRadius: '4px', padding: '1px 7px', letterSpacing: '0.3px' }}>{p.d}</div>
                        : <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(74,222,128,0.7)', background: 'rgba(74,222,128,0.08)', borderRadius: '4px', padding: '1px 7px' }}>BASE</div>
                      }
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Notes strip */}
          <div className="price-notes-grid" style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { icon: 'fa-ruler-horizontal', text: 'Each rebar piece is 12 metres fixed length' },
              { icon: 'fa-arrow-trend-up',   text: 'Subject to market fluctuations & local freight' },
              { icon: 'fa-boxes-stacked',    text: 'Bulk & wholesale pricing available on inquiry' },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                <i className={`fa-solid ${n.icon}`} style={{ color: amber, fontSize: '14px', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{n.text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          BUYING GUIDE — two columns
      ══════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: smoke }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ ...eyebrow, justifyContent: 'center' }}><span style={eyebrowLine} />Buyer's Guide<span style={eyebrowLine} /></div>
            <h2 style={{ ...displayH(), marginBottom: '0' }}>What You Need to Know</h2>
          </div>

          <div className="price-buying-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Know before purchasing */}
            <div style={{ background: cream, border: '1px solid #ddd8cf', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(27,42,58,0.05)' }}>
              <div style={{ background: ink, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(228,137,21,0.15)', border: '1px solid rgba(228,137,21,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '18px', flexShrink: 0 }}>
                  <i className="fa-solid fa-building-columns" />
                </div>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: amber, marginBottom: '3px' }}>Before You Buy</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: cream, textTransform: 'uppercase' }}>What to Know Before Purchasing</div>
                </div>
              </div>
              <div style={{ padding: '28px', borderLeft: `4px solid ${amber}` }}>
                {[
                  { heading: 'TMT Bar Size',    body: 'Larger diameters handle higher structural loads but cost more per piece due to weight. Consult your structural engineer.' },
                  { heading: 'Grade FE 550D',   body: 'Superior yield strength and ductile parameters for high seismic safety — the gold standard for modern construction.' },
                  { heading: 'Regional Freight', body: 'Distance from rolling mills impacts final yard price. Compare prices before committing to a supplier.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 2 ? '20px' : 0, paddingBottom: i < 2 ? '20px' : 0, borderBottom: i < 2 ? '1px solid #f0ebe3' : 'none' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '11px', fontWeight: 800, fontFamily: "'Barlow Condensed',sans-serif", flexShrink: 0, marginTop: '1px' }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: ink, marginBottom: '4px' }}>{item.heading}</div>
                      <div style={{ fontSize: '13.5px', color: muted, lineHeight: 1.7 }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best price tips */}
            <div style={{ background: cream, border: '1px solid #ddd8cf', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(27,42,58,0.05)' }}>
              <div style={{ background: '#0d1621', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(228,137,21,0.15)', border: '1px solid rgba(228,137,21,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '18px', flexShrink: 0 }}>
                  <i className="fa-solid fa-rocket" />
                </div>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: amber, marginBottom: '3px' }}>Smart Buying</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: cream, textTransform: 'uppercase' }}>How to Get the Best Price</div>
                </div>
              </div>
              <div style={{ padding: '28px', borderLeft: `4px solid ${amber}` }}>
                {[
                  { icon: 'fa-store',        text: 'Purchase exclusively from an authorised TRIAM A+ distributor to guarantee authenticity.' },
                  { icon: 'fa-layer-group',  text: 'Seek project-wise bulk estimates — larger volumes unlock better structural pricing tiers.' },
                  { icon: 'fa-certificate',  text: 'Verify authentic batch test certificates (MTC) that match the exact steel supply delivered.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 2 ? '20px' : 0, paddingBottom: i < 2 ? '20px' : 0, borderBottom: i < 2 ? '1px solid #f0ebe3' : 'none', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(228,137,21,0.1)', border: '1px solid rgba(228,137,21,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: amber, fontSize: '14px', flexShrink: 0 }}>
                      <i className={`fa-solid ${item.icon}`} />
                    </div>
                    <div style={{ fontSize: '13.5px', color: muted, lineHeight: 1.75, paddingTop: '8px' }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════ */}
      <section style={{ padding: '0 0 80px', background: smoke }}>
        <div className="container">
          <div className="price-cta-inner" style={{
            background: `linear-gradient(140deg, #080f18 0%, ${ink} 100%)`,
            borderRadius: '20px', position: 'relative', overflow: 'hidden',
            padding: '64px 56px',
          }}>
            {/* Glow */}
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(228,137,21,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize: 'cover', opacity: 0.07 }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: amber, marginBottom: '14px' }}>Ready to Order</div>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 900, color: cream, textTransform: 'uppercase', lineHeight: 1.0, marginBottom: '12px' }}>
                  Ready to Order TRIAM A+ TMT Bars?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
                  Whether you are a developer, contractor, commercial builder, or individual homeowner — we make buying simple.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Purchase Online',   icon: 'fa-cart-shopping',  primary: true  },
                  { label: 'Request Bulk Quote', icon: 'fa-boxes-stacked', primary: false },
                  { label: 'Become a Dealer',   icon: 'fa-handshake',     primary: false },
                ].map((btn, i) => (
                  <Link key={i} to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '9px',
                    background: btn.primary ? amber : 'transparent',
                    color: btn.primary ? cream : 'rgba(255,255,255,0.7)',
                    padding: '13px 26px', borderRadius: '8px',
                    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                    border: btn.primary ? `2px solid ${amber}` : '2px solid rgba(255,255,255,0.15)',
                    boxShadow: btn.primary ? '0 6px 24px rgba(228,137,21,0.3)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; if(btn.primary){e.currentTarget.style.background='#f5a520';}else{e.currentTarget.style.borderColor='rgba(255,255,255,0.35)';e.currentTarget.style.color=cream;} }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; if(btn.primary){e.currentTarget.style.background=amber;}else{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='rgba(255,255,255,0.7)';} }}
                  >
                    <i className={`fa-solid ${btn.icon}`} style={{ fontSize: '13px' }} />
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          DISCLAIMER
      ══════════════════════════════════ */}
      <section style={{ paddingBottom: '80px', background: smoke }}>
        <div className="container">
          <div style={{ background: cream, border: '1px solid #ddd8cf', borderRadius: '14px', padding: '24px 28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(200,64,26,0.08)', border: '1px solid rgba(200,64,26,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8401a', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>
              <i className="fa-solid fa-triangle-exclamation" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: ink, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Important Notes</div>
              <div className="price-disclaimer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 32px' }}>
                {[
                  'Prices are subject to revision without prior notice to reflect steel commodity changes.',
                  'All pricing listed is fully inclusive of standard GST rates.',
                  'Retail prices may vary slightly based on shipping distances, order size, and warehouse variables.',
                  'All orders are subject to Triam Amit Metaliks sales terms and agreements.',
                ].map((note, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12.5px', color: muted, lineHeight: 1.65 }}>
                    <span style={{ color: '#c8401a', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>—</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
