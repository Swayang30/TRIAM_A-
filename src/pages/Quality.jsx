import React from 'react';
import { Link } from 'react-router-dom';

export default function Quality() {
  const certifications = [
    "https://wheat-termite-712594.hostingersite.com/storage/media/KlZZTDdsjummMCRDBG8TXUVJaJJtDqEl5ejEVbRX.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/jsEYi4HQoIZU2d6LKFIX5K4nAzkPSQ4EJPcpOK8U.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/QpBCUGQj0QvFYinGerJLpIVxsk6wpatWfFAN2Jqe.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/XRCjFFwOAWf7QhMIKut3LezllcGyfB65wOfgcfbG.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/5VBFXqisljIRMhrzfbMez9JqQtAKNghzZObcVbig.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/qvcm6uHwnczqVdUxXtXvZRF3v6sQWiJBUWtauX7E.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/NDYqNSH3oOT6BJA5LFd4AInjX371uqqf37NhDezy.jpg",
    "https://wheat-termite-712594.hostingersite.com/storage/media/0GgyB0Du1tT4477aaY5rivHNEBRu6wOOOWNufG75.jpg"
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
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>Quality</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span><Link to="/">Home</Link></span></li>
                      <li><span>Quality</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Details Content */}
      <section className="tri-quality-wrapper py-5" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: 'auto' }}>
          {/* Intro Section */}
          <div className="text-center mb-5">
            <h1 className="tri-quality-title" style={{ fontSize: '38px', fontWeight: 800, color: '#191919' }}>A+ Quality Checks</h1>
            <p className="tri-quality-subtitle mt-3" style={{ fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
              Quality is built in at every stage, not inspected in at the end. Through steelmaking and rolling, sample after sample moves to our <b>NABL-accredited in-house laboratory</b>, where spectrometers, Universal Testing Machines, and a team of metallurgical specialists verify the chemical and mechanical properties of every heat. Results flow back to the plant in real time, so composition is corrected before it ever becomes a problem — and a final check in the dispatch yard ensures nothing leaves us until it has earned the A+ name.
            </p>
            <p className="tri-quality-subtitle mt-3" style={{ fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
              In the rare event that a quality concern does surface, root cause analysis is immediate and uncompromising. Every issue becomes a catalyst for improvement, sharpening our processes for the next heat, the next batch, the next builder who counts on us.
            </p>
          </div>

          {/* Advantages Section */}
          <div className="mb-5">
            <h2 className="tri-quality-section-title" style={{ fontSize: '24px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '20px' }}>
              A+ Advantages at a Glance
            </h2>
            <p style={{ fontSize: '15px', color: '#555' }}>
              When you choose TRIAM A+ Fe 550D, every box that defines a premium new-age rebar is already ticked.
            </p>

            <div className="product-truths-benefits-section my-4" style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="ptb-header d-flex" style={{ backgroundColor: '#191919', color: '#fff', fontWeight: 700 }}>
                <div className="ptb-col p-3 flex-fill text-center" style={{ borderRight: '1px solid #333' }}>PRODUCT TRUTHS</div>
                <div className="ptb-col p-3 flex-fill text-center">BENEFITS</div>
              </div>

              <div className="ptb-rows" style={{ backgroundColor: '#fff', padding: '10px 0' }}>
                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>100% tested billets</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Resulting in controlled chemical composition of the TMT</div>
                </div>

                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>Controlled sulphur & phosphorus usage</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Leads to a better corrosion control</div>
                </div>

                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>Conversion agent of SAIL</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Proof of premium quality of the product</div>
                </div>

                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>Flexibility is higher than normal elongation (IS:1786)</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Safeguards from earthquakes and natural calamities</div>
                </div>

                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>Greater AR (Area of Rib) Value</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Resulting in a good bonding between steel and concrete</div>
                </div>

                <div className="ptb-row d-flex px-3 py-2 gap-3">
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915', fontWeight: 600 }}>Easy bending and re-bending</div>
                  <div className="ptb-box flex-fill p-3" style={{ backgroundColor: '#f7f5f2', borderRadius: '8px', borderLeft: '3px solid #e48915' }}>Resulting in enhanced productivity of the masons</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing Process section */}
          <div className="tri-quality-section mb-5">
            <h2 className="tri-quality-section-title" style={{ fontSize: '24px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '20px' }}>
              Manufacturing Process Quality
            </h2>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-boxes-stacked"></i> Raw Material
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Spectrometer testing cross-checked with wet chemical methods at receipt — defects caught before they ever reach the line.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-flask-vial"></i> Blending
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Tight control over blending ensures uniform composition and consistent quality from heat to heat.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-fire-burner"></i> Steel Refining
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Advanced refining strips impurities and locks in superior chemical and physical properties.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-arrows-spin"></i> Billet Casting
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Continuous casting delivers defect-free billets that meet the highest quality benchmarks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Monitoring Callout */}
          <div className="tri-quality-section mb-5">
            <h2 className="tri-quality-section-title" style={{ fontSize: '24px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '20px' }}>
              Advanced Quality Monitoring
            </h2>
            <div className="tri-quality-highlight p-4" style={{ backgroundColor: '#fff', borderLeft: '4px solid #191919', borderRadius: '6px', fontSize: '15px', color: '#555', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              Powered by electronics and Total Quality Management (TQM) principles, every stage is monitored for uniform chemical, physical, and metallographic properties — no variance, no compromise.
            </div>
          </div>

          {/* Testing Cards */}
          <div className="tri-quality-section mb-5">
            <h2 className="tri-quality-section-title" style={{ fontSize: '24px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '20px' }}>
              Final Product Testing
            </h2>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-wrench"></i> Mechanical
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>0.2% Proof Stress, Tensile Strength, and Total Elongation — measured on advanced systems.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-circle-check"></i> Structural
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Bending and re-bending checks confirm flexibility and durability on every rebar.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="tri-quality-card h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '18px', color: '#e48915', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <i className="fa-solid fa-microscope"></i> UTM Equipment
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Universal Testing Machine (UTM) with extensometer verifies mechanical properties beyond BIS standards.</p>
                </div>
              </div>
            </div>

            <div className="tri-quality-highlight p-3 mt-4 text-center" style={{ backgroundColor: '#191919', color: '#fff', borderRadius: '6px', fontSize: '15px', fontWeight: 600 }}>
              Every TRIAM A+ bar is tested to exceed Indian standards — and out-perform competitors.
            </div>
          </div>

          {/* Metallurgical / Dispatch sections */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <h2 className="tri-quality-section-title" style={{ fontSize: '20px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '15px' }}>
                Laboratory & Metallurgical Analysis
              </h2>
              <div className="tri-quality-highlight p-4 h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', fontSize: '14px', color: '#555' }}>
                Advanced microscopy examines crystal grain boundaries and surfaces microscopic defects — ensuring optimal composition and structural integrity in every rebar.
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="tri-quality-section-title" style={{ fontSize: '20px', fontWeight: 700, borderLeft: '3px solid #e48915', paddingLeft: '15px', marginBottom: '15px' }}>
                Final Dispatch Quality Check
              </h2>
              <div className="tri-quality-highlight p-4 h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', fontSize: '14px', color: '#555' }}>
                A final re-check at the dispatch yard per our Quality Assurance Plan (QAP) — nothing leaves until it has earned the A+ name.
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="tri-quality-footer text-center p-4" style={{ backgroundColor: '#f7f5f2', border: '1px solid #e0dbc5', borderRadius: '8px', color: '#191919', fontSize: '15px', fontWeight: 700 }}>
            Delivering defect-free, high-performance TMT bars that exceed BIS standards and ensure long-term reliability.
          </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="tri-cert-wrapper py-5" style={{ backgroundColor: '#e48915', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: 'auto' }}>
          {/* Download Button */}
          <div className="tri-cert-top text-center mb-5">
            <a 
              href="https://wheat-termite-712594.hostingersite.com/storage/media/8sT6sPSzvxQiPuDnR6eLJWpr4pFz1P0E0PghDSz5.pdf" 
              download 
              className="tri-cert-btn" 
              style={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#e48915',
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: 700,
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i> Download Brochure
            </a>
          </div>

          {/* Certificates Grid */}
          <div className="row g-4 justify-content-center">
            {certifications.map((cert, idx) => (
              <div key={idx} className="col-6 col-md-4 col-lg-3">
                <div 
                  className="tri-cert-card" 
                  style={{
                    border: '2px solid #fff',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img 
                    src={cert} 
                    alt={`Certificate ${idx + 1}`} 
                    style={{ width: '100%', borderRadius: '4px', border: '4px solid #fff' }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
