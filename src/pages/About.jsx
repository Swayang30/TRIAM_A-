import React from 'react';
import TextType from '../components/TextType';
import ShinyText from '../components/ShinyText';

export default function About() {
  const edgeFeatures = [
    {
      num: '01',
      title: "Earthquake Resistance",
      desc: "Tested under simulated seismic loading. When the ground moves, our bars flex and absorb the shock instead of snapping.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/Mb3TRvXq4MLLqqgnAs3TmiYTVbvmQEuRkFU2ghBA.png"
    },
    {
      num: '02',
      title: "Advanced Ductility",
      desc: "17% minimum elongation — well past the IS:1786:2008 mark of 14.5%. More give, more warning, more safety before anything fails.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/wXjio53qD8yU2HYmdBpllcLCfM7b7YoKv5vccf1Y.png"
    },
    {
      num: '03',
      title: "Superior Bonding",
      desc: "A higher Area of Rib (AR) than the SAIL standard locks steel and concrete together — tighter bond, fewer cracks, every application.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/NFjkUS3ijI4OERpCNBNRWyd1CzqoUxEqXwg8wkuQ.png"
    },
    {
      num: '04',
      title: "Promoting Sustainability",
      desc: "Fixed 12-metre lengths and section-wise bundles mean fewer off-cuts and less wasted steel on every site.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/Blh70EjMSO31vrATIAEXwe898XSoxXMQIVCzj9ee.png"
    }
  ];

  const partners = [
    {
      name: "Mr S. Saha",
      role: "Former Executive Engineer (Civil) & Consultant, WBMSCL",
      feedback: "We have procured approximately 2,000 MT of TRIAM A+ TMT bars to date. All supplies have conformed to the relevant BIS standards, with testing conducted by NABL-accredited third-party laboratories including National Test House and Jadavpur University, Kolkata. The overall performance has been consistently satisfactory. I wish the company continued success.",
      image: ""
    },
    {
      name: "Mr Manish Vyas",
      role: "Manager – Manufacturing & Logistics Supply Chain, Gainwell Engineering",
      feedback: "Amit Metaliks meets the stringent quality and safety parameters we require for mining operations — and they deliver on it consistently. We are getting exactly what we need, and we look forward to building a long-term business partnership with Amit Metaliks and the TRIAM brand.",
      image: ""
    },
    {
      name: "Mr Bidyut Dey",
      role: "Consultant, JMS Mining and former GM of Coal India Ltd.",
      feedback: "M/s Amit Metaliks have supplied various sizes of TRIAM A+ brand steel reinforcement bars for construction of 1.8 Mtpa coking coal washery at Urtan. The materials supplied fulfill all the standards. The results of various tests carried out at site are found to meet the desired standards and quality of the bars is upto full of our satisfaction. We desire a longterm association with TRIAM brand TMT bars.",
      image: ""
    }
  ];

  const millBenefits = [
    { label: 'Block Mills Engineered For', items: ['High-speed, high-precision rolling', 'Tight dimensional control, every pass', 'Cleaner surface finish and grain structure'] },
    { label: 'In-House Cast Billets Mean', items: ['Controlled, clean chemistry from the melt', 'Consistent quality, heat after heat', 'Full traceability — no bought-in steel'] },
  ];

  return (
    <main>

      {/* ── Hero ── */}
      <section className="about-hero">
        <div
          className="about-hero-bg"
          style={{ backgroundImage: "url(https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png)" }}
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-grid" aria-hidden="true" />
        <div className="about-hero-watermark" aria-hidden="true">TRIAM</div>

        <div className="container about-hero-content">
          <div className="tmt-eyebrow about-hero-eyebrow">About Triam A+</div>
          <h1 className="about-hero-title">
            Forged in<br />
            <span className="about-hero-accent">India.</span>
          </h1>
          <p className="about-hero-sub">
            New-age FE 550D rebar, rolled on German Thermex technology — from our own billet to your foundation & construction.
          </p>

          <div className="about-hero-stats">
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">FE 550D</span>
              <span className="about-hero-stat-label">New-Age Grade</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">8–32 MM</span>
              <span className="about-hero-stat-label">Every Size We Roll</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">THERMEX</span>
              <span className="about-hero-stat-label">German Technology</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">ISI</span>
              <span className="about-hero-stat-label">Certified · IS:1786:2008</span>
            </div>
          </div>
        </div>
      </section>


      {/* ── CMD's Message ── */}
      <section className="about-cmd-section">
        <div className="about-cmd-bg" aria-hidden="true" />
        <div className="about-cmd-glow" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-cmd-grid">

            <div className="about-cmd-img-col">
              <div className="about-cmd-img-wrap">
                <img
                  src="/Mr-Amit_Kumar.png"
                  alt="Mr. Amit Kumar Singh — CMD"
                  className="about-cmd-img"
                />
                <div className="about-cmd-img-overlay" />
                <div className="about-cmd-name-tag">
                  <span className="about-cmd-name-title">Mr. Amit Kumar Singh</span>
                  <span className="about-cmd-name-role">Chairman &amp; Managing Director</span>
                </div>
              </div>
            </div>

            <div className="about-cmd-content">
              <div className="tmt-eyebrow about-cmd-eyebrow">Leadership</div>
              <h2 className="about-cmd-heading">CMD's<br /><span className="about-cmd-accent">Message</span></h2>
              <div className="about-cmd-quote-mark">"</div>
              <blockquote className="about-cmd-quote">
                <TextType
                  text="Our journey — from a modest beginning to a ₹2,000+ crore group — has been built on one principle: keep our word. As we grow across steel, civil construction, mining and trading, that promise to our customers, partners and people stays the same."
                  typingSpeed={28}
                  loop={false}
                  showCursor={true}
                />
              </blockquote>
              <p className="about-cmd-text">
                Our focus for the year ahead is clear: sharpen operational excellence, invest in forward-looking practices,
                and build partnerships that last. We remain committed to quality, transparency and the standards that earned your trust.
              </p>
              <p className="about-cmd-text" style={{ marginTop: '16px', color: 'rgba(255,255,255,0.28)' }}>
                Thank you for your continued support. Together, we look forward to another year of meaningful growth and shared success.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Block Mill Technology ── */}
      <section className="about-mill-section">
        <div className="container">
          <div className="about-mill-grid">

            <div className="about-mill-content">
              <div className="tmt-eyebrow">Manufacturing</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Block Mill<br />Technology</h2>
              <div className="about-group-rule" />
              <p className="about-group-text" style={{ color: '#000000' }}>
                Block Mill - TMT (Thermo-Mechanically Treated) is a high-speed, compact finishing unit designed for precision rolling, particularly for small-diameter bars (8mm–16mm). Our Block Mill typically has a no-twist, 45° configuration with 6 stands, enabling high-speed production while maintaining tight dimensional tolerances, excellent surface quality, and uniform mechanical properties.
              </p>

              <div className="about-mill-features">
                <div className="about-mill-feature">
                  <span className="about-mill-feature-label">Block mills are engineered for</span>
                  <ul>
                    <li>High-speed rolling</li>
                    <li>Precision sizing</li>
                    <li>Superior metallurgical properties</li>
                  </ul>
                </div>
                <div className="about-mill-feature">
                  <span className="about-mill-feature-label">Using tungsten carbide rolls in block mills achieve</span>
                  <ul>
                    <li>Higher productivity</li>
                    <li>Excellent surface finish</li>
                    <li>Precise dimensional control of final products during rolling</li>
                  </ul>
                </div>
              </div>

              <p className="about-group-text" style={{ marginTop: '24px', fontStyle: 'italic', color: 'var(--c-amber)', fontWeight: 600 }}>
                This combination makes block mills the ideal choice for modern steel plants focused on quality and operational efficiency.
              </p>
            </div>

            <div className="about-mill-img-wrap">
              <img
                src="/block_mill3.jpeg"
                alt="Block Mill Rolling"
                className="about-mill-img"
              />
              <div className="about-mill-img-tag">
                <span className="about-mill-img-tag-icon">⚡</span>
                <span>Block Mill – TMT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── The Triam A+ Edge — Redesigned ── */}
      <section style={{ background: 'linear-gradient(160deg, #080f18 0%, #0d1621 50%, #1b2a3a 100%)', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .edge-row { transition: background 0.3s ease, padding-left 0.3s ease; }
          .edge-row:hover { background: rgba(228,137,21,0.05) !important; padding-left: 40px !important; }
          @media (max-width: 768px) {
            .edge-row { grid-template-columns: 1fr !important; gap: 14px !important; padding: 32px 16px !important; }
            .edge-row:hover { padding-left: 16px !important; }
            .edge-row-bar, .edge-row-icon { display: none !important; }
          }
        `}</style>

        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(228,137,21,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(228,137,21,0.03) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        {/* Glows */}
        <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '560px', height: '560px', background: 'radial-gradient(circle, rgba(228,137,21,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(200,64,26,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '72px', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#e48915', marginBottom: '18px', fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ width: '22px', height: '2px', background: '#e48915', borderRadius: '1px', flexShrink: 0 }} />
                The Triam A+ Edge
              </div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(44px, 6vw, 74px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.9, margin: 0 }}>
                Engineered For<br />
                <span style={{ color: '#e48915' }}>Real-World Strength</span>
              </h2>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.78, maxWidth: '300px', margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
              <ShinyText speed={3}>
                Four properties that separate a Triam A+ bar from the rest — built in, not added on.
              </ShinyText>
            </p>
          </div>

          {/* Feature strips */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {edgeFeatures.map((f, idx) => (
              <div
                key={idx}
                className="edge-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '88px 2px 1fr 56px',
                  gap: '0 40px',
                  alignItems: 'center',
                  padding: '44px 32px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'default',
                }}
              >
                {/* Ghost number */}
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '64px', fontWeight: 900, color: 'rgba(228,137,21,0.22)', lineHeight: 1, letterSpacing: '-3px', userSelect: 'none' }}>
                  {f.num}
                </div>
                {/* Vertical separator */}
                <div className="edge-row-bar" style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, rgba(228,137,21,0), rgba(228,137,21,0.45), rgba(228,137,21,0))', borderRadius: '1px' }} />
                {/* Content */}
                <div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '10px', lineHeight: 1.1 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.46)', lineHeight: 1.82, maxWidth: '620px', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                    {f.desc}
                  </p>
                </div>
                {/* Icon */}
                <img className="edge-row-icon" src={f.image} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.2, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Edge Graphic Banner ── */}
      <section className="about-graphic-section">
        <div className="container">
          <img
            src="/about_abstract.jpeg"
            alt="Triam A+ Edge Infographic"
            style={{ width: '100%', maxWidth: '960px', display: 'inline-block' }}
          />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="about-testimonials-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <div className="tmt-eyebrow" style={{ justifyContent: 'center' }}>Testimonials</div>
            <h2 className="section-title">What Our Partners Say</h2>
            <p className="section-subtitle" style={{ maxWidth: '440px', margin: '12px auto 0' }}>
              The people who build with us, grow with us.
            </p>
          </div>

          <div className="row g-4">
            {partners.map((p, idx) => (
              <div key={idx} className="col-lg-4">
                <div className="about-testimonial-card">
                  <div className="about-testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--c-amber)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="about-testimonial-text">"{p.feedback}"</p>
                  <div className="about-testimonial-author">
                    <div>
                      <div className="about-testimonial-name">{p.name}</div>
                      <div className="about-testimonial-role">{p.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
