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
      name: "Bikash Debnath",
      role: "Dealer Partner",
      feedback: "My association with TRIAMTMT has been long-standing, and with every passing day, my business continues to grow steadily. The consistent quality of products and the strong support from the TRIAMTMT marketing team have played a crucial role in my success.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/FWAOjow7VqalY3PKMzh9jADzYRqw2U2mb6DZVLAn.jpg"
    },
    {
      name: "Shuvendu Mahato",
      role: "Business Owner",
      feedback: "Working with TRIAMTMT has been a truly rewarding experience. Their product quality is consistently reliable, and the support from their team has helped me expand my business with confidence.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/iD6Ycynw9mC169q78v1O9ekRTnaLCNs34fOpZKol.jpg"
    },
    {
      name: "Pabitra Mahato",
      role: "Volunteer / Partner",
      feedback: "My journey with TRIAMTMT has been excellent so far. Their strong market presence and continuous guidance from the support team have significantly contributed to the growth of my business.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/C4vxD6udwxZBSzbHAITc8VMHos50w2brwiydxIxJ.jpg"
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
            New-age FE 550D rebar, rolled on German Thermex technology — from our own billet to your building, furnace to foundation.
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

      {/* ── Group Introduction ── */}
      <section className="about-group-section">
        <div className="container">
          <div className="about-group-grid">

            <div className="about-group-visual">
              <div className="about-group-img-frame">
                <img
                  src="/amitalliance1.png"
                  alt="Amit Alliance Plant"
                  className="about-group-img"
                />
                <div className="about-group-img-badge">
                  <span className="about-group-badge-num">Rs. 2,000 Cr+</span>
                  <span className="about-group-badge-label">Group Turnover</span>
                </div>
              </div>
            </div>

            <div className="about-group-content">
              <div className="tmt-eyebrow">About Us</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>AMIT ALLIANCE<br />Group</h2>
              <div className="about-group-rule" />
              <p className="about-group-text">
                Amit Alliance is one of India's fastest-growing groups in steel, mining, and infrastructure. Since 2004,
                four verticals — <strong>Amit Metaliks Limited, Amit Mines Private Limited, Nakshit Iron &amp; Steel Pvt. Ltd.,
                and Takshvi Infra Private Limited</strong> — have built the group into a Rs. 2,000-crore powerhouse,
                delivering steel, mining services, and infrastructure projects across the country.
              </p>
              <p className="about-group-text">
                At the helm is <strong>Mr. Amit Kumar Singh</strong>, an IIT Kanpur alumnus and first-generation entrepreneur
                whose two decades of leadership continue to drive the group's dominance in steel and infrastructure.
              </p>
              <div className="about-group-pillars">
                {['Amit Metaliks', 'Amit Mines', 'Nakshit Iron & Steel', 'Takshvi Infra'].map((p, i) => (
                  <ShinyText key={i} className="about-group-pillar" speed={2.4 + i * 0.4}>{p}</ShinyText>
                ))}
              </div>
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
                  text="Heartiest greetings and warmest regards to all. As Amit Alliance continues to strengthen its presence across steel, mining, and construction, I extend my sincere appreciation for your trust and collaboration. The past year has reinforced the importance of reliability, responsible growth, and long-term value creation — principles that remain at the core of our organisation."
                  typingSpeed={28}
                  loop={false}
                  showCursor={true}
                />
              </blockquote>
              <p className="about-cmd-text">
                Our focus ahead is clear: to enhance operational excellence, adopt forward-looking practices, and build
                stronger partnerships that contribute to sustainable industry progress. We remain committed to delivering
                quality, ensuring transparency, and upholding the standards that our stakeholders expect from Amit Alliance.
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
              <p className="about-group-text">
                Every Triam A+ bar starts as sponge iron in our own Steel Melting Shop and moves through one fully integrated,
                in-house line — Ladle Refining Furnace, Continuous Casting Machine, the rolling, intermediate and finishing
                block mills, the Thermex quenching plant, and the cooling bed. Nothing is outsourced. Nothing is left to chance.
              </p>
              <p className="about-group-text" style={{ fontStyle: 'italic', color: 'var(--c-amber)', fontWeight: 600 }}>
                That control is why block mills are the standard in modern steel plants — and why every Triam A+ bar holds
                true, bend after bend, from the fabrication yard to the final pour.
              </p>

              <div className="about-mill-features">
                {millBenefits.map((b, i) => (
                  <div key={i} className="about-mill-feature">
                    <span className="about-mill-feature-label">{b.label}</span>
                    <ul>
                      {b.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
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
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', lineHeight: 1.78, maxWidth: '300px', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
              Four properties that separate a Triam A+ bar from the rest — built in, not added on.
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
            src="https://wheat-termite-712594.hostingersite.com/storage/media/rfcyeYbG9LGMBN3fk5wXaqpXRHY0HXU5s3rPKt1C.png"
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
                    <img src={p.image} alt={p.name} className="about-testimonial-avatar" />
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
