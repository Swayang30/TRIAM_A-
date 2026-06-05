import React from 'react';

export default function About() {
  const edgeFeatures = [
    {
      title: "Earthquake Resistance",
      desc: "Tested under simulated seismic loading, our rebars deliver high energy dissipation when it matters most.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/Mb3TRvXq4MLLqqgnAs3TmiYTVbvmQEuRkFU2ghBA.png"
    },
    {
      title: "Advanced Ductility",
      desc: "17% minimum elongation - well past the IS:1786:2008 standard of 14.5% - for superior load distribution.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/wXjio53qD8yU2HYmdBpllcLCfM7b7YoKv5vccf1Y.png"
    },
    {
      title: "Superior Bonding",
      desc: "Higher Area of Rib (AR) than the SAIL standard, locking steel and concrete together across every application.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/NFjkUS3ijI4OERpCNBNRWyd1CzqoUxEqXwg8wkuQ.png"
    },
    {
      title: "Promoting Sustainability",
      desc: "Fixed 12-metre lengths and section-wise bundles cut material wastage at the fabrication stage.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/Blh70EjMSO31vrATIAEXwe898XSoxXMQIVCzj9ee.png"
    }
  ];

  const partners = [
    {
      name: "Bikash Debnath",
      role: "Dealer Partner",
      feedback: "My association with TRIAMTMT has been long-standing, and with every passing day, my business continues to grow steadily. The consistent quality of products and the strong support from the TRIAMTMT marketing team have played a crucial role in my success. I sincerely appreciate TRIAMTMT for their commitment and continuous support in helping my business thrive.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/FWAOjow7VqalY3PKMzh9jADzYRqw2U2mb6DZVLAn.jpg"
    },
    {
      name: "Shuvendu Mahato",
      role: "Business Owner",
      feedback: "Working with TRIAMTMT has been a truly rewarding experience. Their product quality is consistently reliable, and the support from their team has helped me expand my business with confidence. I highly value their professionalism and dedication towards their partners.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/iD6Ycynw9mC169q78v1O9ekRTnaLCNs34fOpZKol.jpg"
    },
    {
      name: "Pabitra Mahato",
      role: "Volunteer / Partner",
      feedback: "My journey with TRIAMTMT has been excellent so far. Their strong market presence and continuous guidance from the support team have significantly contributed to the growth of my business. I am thankful to TRIAMTMT for being a dependable partner.",
      image: "https://wheat-termite-712594.hostingersite.com/storage/media/C4vxD6udwxZBSzbHAITc8VMHos50w2brwiydxIxJ.jpg"
    }
  ];

  return (
    <main>
      {/* Breadcrumb banner */}
      <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative">
        <div className="rs-breadcrumb-bg" style={{ backgroundImage: "url(https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png)" }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-8 col-lg-8">
              <div className="rs-breadcrumb-content-wrapper">
                <div className="rs-breadcrumb-title-wrapper">
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>About Us</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span>Home</span></li>
                      <li><span>About Us</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group introduction */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span style={{ color: '#e48915', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>About Us</span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#191919', margin: '15px 0 25px' }}>AMIT ALLIANCE Group</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                Amit Alliance is one of India's fastest-growing groups in steel, mining, and infrastructure. Since 2004, four verticals - <b>Amit Metaliks Limited, Amit Mines Private Limited, Nakshit Iron & Steel Pvt. Ltd., and Takshvi Infra Private Limited</b> - have built the group into a Rs. 2,000-crore powerhouse, delivering steel, mining services, and infrastructure projects across the country.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                At the helm is <b>Mr. Amit Kumar Singh</b>, an IIT Kanpur alumnus and first-generation entrepreneur whose two decades of leadership continue to drive the group's dominance in steel and infrastructure.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://wheat-termite-712594.hostingersite.com/storage/media/UBymSBRkpYkLip0Ai5R8L6GxdRbUkronUl27yvfI.jpg" 
                alt="Amit Alliance Plant" 
                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CMD Message */}
      <section style={{ padding: '80px 0', backgroundColor: '#f7f5f2' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <img 
                src="https://wheat-termite-712594.hostingersite.com/storage/media/nLj51DWAU1uf3AAg5I3sJj6Bm6lgCwHh6JxgGrwE.jpg" 
                alt="CMD" 
                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
              />
            </div>
            <div className="col-lg-7">
              <span style={{ color: '#e48915', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>Leadership</span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#191919', margin: '15px 0 25px' }}>CMD'S MESSAGE</h2>
              <blockquote style={{ 
                fontStyle: 'italic', 
                fontSize: '18px', 
                lineHeight: '1.8', 
                color: '#444', 
                borderLeft: '4px solid #e48915', 
                paddingLeft: '20px', 
                margin: '0 0 25px 0' 
              }}>
                "Heartiest greetings and warmest regards to all, As Amit Alliance continues to strengthen its presence across steel, mining, and construction, I extend my sincere appreciation for your trust and collaboration. The past year has reinforced the importance of reliability, responsible growth, and long-term value creation-principles that remain at the core of our organisation."
              </blockquote>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.8' }}>
                Our focus ahead is clear: to enhance operational excellence, adopt forward-looking practices, and build stronger partnerships that contribute to sustainable industry progress. We remain committed to delivering quality, ensuring transparency, and upholding the standards that our stakeholders expect from Amit Alliance. Thank you for your continued support. Together, we look forward to another year of meaningful growth and shared success.
              </p>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#191919', marginTop: '30px', marginBottom: '2px' }}>Mr. Amit Kumar Singh</h4>
              <span style={{ fontSize: '13px', color: '#999' }}>Chairman & Managing Director, Amit Alliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Block Mill Technology */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#191919', marginBottom: '25px' }}>
                BLOCK MILL - TMT (THERMO-MECHANICALLY TREATED)
              </h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
                Every TRIAM A+ bar begins as sponge iron at our Steel Melting Shop and travels through a fully integrated, in-house manufacturing chain - Ladle Refining Furnace, Continuous Casting Machine, Rolling Mill, Intermediate Mill, Thermax Plant, and Cooling Bed. Nothing is outsourced, nothing is left to chance.
              </p>

              <div className="row g-4">
                <div className="col-md-6">
                  <h4 style={{ color: '#e48915', fontWeight: 700, fontSize: '16px', marginBottom: '15px' }}>Block mills are engineered for:</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>⚡ High-speed rolling</li>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>🎯 Precision sizing</li>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>🔬 Superior metallurgical properties</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4 style={{ color: '#e48915', fontWeight: 700, fontSize: '16px', marginBottom: '15px' }}>In-house cast billets deliver:</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>📈 Higher productivity</li>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>✨ Excellent surface finish</li>
                    <li style={{ marginBottom: '8px', fontSize: '14px' }}>📐 Dimensional Control at Every Pass</li>
                  </ul>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#555', fontStyle: 'italic', marginTop: '30px' }}>
                That combination is what makes block mills the standard for modern steel plants - and what makes every TRIAM A+ rebar dependable from the first bend to the final pour.
              </p>
            </div>
            <div className="col-lg-5">
              <img 
                src="https://wheat-termite-712594.hostingersite.com/storage/media/rg79bQJyFi5j2RfWyIYOcjqbIwiMlXHTnE4fAAZ5.jpg" 
                alt="Block Mill Rolling" 
                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Edge / Features Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h4 style={{ color: '#e48915', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>THE TRIAM A+ EDGE</h4>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#191919' }}>ENGINEERED FOR REAL-WORLD STRENGTH</h2>
          </div>

          <div className="row g-4">
            {edgeFeatures.map((f, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div style={{ backgroundColor: '#fff', padding: '30px 20px', borderRadius: '12px', border: '1px solid #eee', height: '100%', textAlign: 'center' }}>
                  <img 
                    src={f.image} 
                    alt={f.title} 
                    style={{ maxHeight: '60px', marginBottom: '20px' }}
                  />
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#191919', marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom HTML graphic banner */}
      <section style={{ backgroundColor: '#fff', textAlign: 'center', padding: '40px 0' }}>
        <div className="container">
          <img 
            src="https://wheat-termite-712594.hostingersite.com/storage/media/rfcyeYbG9LGMBN3fk5wXaqpXRHY0HXU5s3rPKt1C.png" 
            alt="Edge Graphic" 
            style={{ width: '100%', maxWidth: '900px', display: 'inline-block' }}
          />
        </div>
      </section>

      {/* Partners Testimonials */}
      <section style={{ padding: '80px 0', backgroundColor: '#f7f5f2' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h4 style={{ color: '#e48915', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>Testimonials</h4>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#191919' }}>What Our Partners Say</h2>
          </div>

          <div className="row g-4">
            {partners.map((p, idx) => (
              <div key={idx} className="col-lg-4">
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e0dbc5', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{p.name}</h4>
                      <span style={{ fontSize: '12px', color: '#999' }}>{p.role}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>
                    "{p.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
