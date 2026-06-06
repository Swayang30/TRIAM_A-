import React from 'react';
import TextType from '../components/TextType';
import ShinyText from '../components/ShinyText';

export default function About() {
  const edgeFeatures = [
    {
      num: '01',
      title: "Earthquake Resistance",
      desc: "Tested under simulated seismic loading, our rebars deliver high energy dissipation when it matters most.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/Mb3TRvXq4MLLqqgnAs3TmiYTVbvmQEuRkFU2ghBA.png"
    },
    {
      num: '02',
      title: "Advanced Ductility",
      desc: "17% minimum elongation — well past the IS:1786:2008 standard of 14.5% — for superior load distribution.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/wXjio53qD8yU2HYmdBpllcLCfM7b7YoKv5vccf1Y.png"
    },
    {
      num: '03',
      title: "Superior Bonding",
      desc: "Higher Area of Rib (AR) than the SAIL standard, locking steel and concrete together across every application.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/NFjkUS3ijI4OERpCNBNRWyd1CzqoUxEqXwg8wkuQ.png"
    },
    {
      num: '04',
      title: "Promoting Sustainability",
      desc: "Fixed 12-metre lengths and section-wise bundles cut material wastage at the fabrication stage.",
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
    { label: 'Block Mills Engineered For', items: ['High-speed rolling', 'Precision sizing', 'Superior metallurgical properties'] },
    { label: 'In-House Cast Billets Deliver', items: ['Higher productivity', 'Excellent surface finish', 'Dimensional control at every pass'] },
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
            Built on 20 years of steel expertise — from billet to building, from furnace to foundation.
          </p>

          <div className="about-hero-stats">
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">₹2,000<sup>Cr+</sup></span>
              <span className="about-hero-stat-label">Group Revenue</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">2004</span>
              <span className="about-hero-stat-label">Established</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">4</span>
              <span className="about-hero-stat-label">Business Verticals</span>
            </div>
            <div className="about-hero-stat">
              <span className="about-hero-stat-num">Pan India</span>
              <span className="about-hero-stat-label">Market Reach</span>
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
                  src="https://wheat-termite-712594.hostingersite.com/storage/media/nLj51DWAU1uf3AAg5I3sJj6Bm6lgCwHh6JxgGrwE.jpg"
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
                Every TRIAM A+ bar begins as sponge iron at our Steel Melting Shop and travels through a fully integrated,
                in-house manufacturing chain — Ladle Refining Furnace, Continuous Casting Machine, Rolling Mill,
                Intermediate Mill, Thermax Plant, and Cooling Bed. Nothing is outsourced, nothing is left to chance.
              </p>
              <p className="about-group-text" style={{ fontStyle: 'italic', color: 'var(--c-amber)', fontWeight: 600 }}>
                That combination is what makes block mills the standard for modern steel plants — and what makes every
                TRIAM A+ rebar dependable from the first bend to the final pour.
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
                src="/Block-Mill-for-TMT-Rolling.png"
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

      {/* ── The Triam A+ Edge ── */}
      <section className="about-edge-section">
        <div className="about-edge-bg" aria-hidden="true" />
        <div className="about-edge-glow" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <div className="tmt-eyebrow about-edge-eyebrow" style={{ justifyContent: 'center' }}>The Triam A+ Edge</div>
            <h2 className="about-edge-heading">Engineered for<br /><span className="about-hero-accent">Real-World Strength</span></h2>
          </div>

          <div className="about-edge-grid">
            {edgeFeatures.map((f, idx) => (
              <div key={idx} className="about-edge-card">
                <div className="about-edge-card-left">
                  <div className="about-edge-num">{f.num}</div>
                  <img src={f.image} alt={f.title} className="about-edge-img" />
                </div>
                <div className="about-edge-card-body">
                  <h3 className="about-edge-card-title">{f.title}</h3>
                  <p className="about-edge-card-desc">{f.desc}</p>
                </div>
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
