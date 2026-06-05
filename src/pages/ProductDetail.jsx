import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { slug } = useParams();

  // Determine product content based on URL or route parameter
  // Route matches:
  // - /Fe-500D-Grade-TMT-8mm-12mm
  // - /Fe-550D-Grade-TMT-16mm-20mm
  // - /Fe-550D-Grade-TMT-25mm-32mm
  
  // Normalise slug if accessed directly or through params
  const currentSlug = slug || window.location.pathname.replace('/', '') || 'Fe-550D-Grade-TMT-16mm-20mm';

  const products = {
    'Fe-500D-Grade-TMT-8mm-12mm': {
      title: 'Fe 500D Grade TMT 8mm – 12mm',
      size: '8mm – 12mm',
      grade: 'Fe 500D',
      desc: 'Ideal for stirrups, slabs, staircases, beams & columns in residential & low-rise buildings. Balances cost with long-term longevity. Available in customized TDC (Technical Delivery Conditions).',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png'
    },
    'Fe-550D-Grade-TMT-16mm-20mm': {
      title: 'Fe 550D Grade TMT 16mm – 20mm',
      size: '16mm – 20mm',
      grade: 'Fe 550D',
      desc: 'Built for beams, columns & high-load slabs. Engineered for crack resistance and continuous-load endurance. Perfectly suited for high-density residential developments and general infrastructure framing.',
      image: 'https://enquiry.triamtmt.com/images/tab-img6.jpg',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png'
    },
    'Fe-550D-Grade-TMT-25mm-32mm': {
      title: 'Fe 550D Grade TMT 25mm – 32mm',
      size: '25mm – 32mm',
      grade: 'Fe 550D',
      desc: 'Suited for high-rise buildings, bridges, dams & heavy industrial structures. Withstands wind, seismic forces, and sustained vertical stress under the most demanding environments.',
      image: 'https://enquiry.triamtmt.com/images/tab-img1.jpg',
      breadcrumbBg: 'https://wheat-termite-712594.hostingersite.com/storage/media/30vceXluvGFCaJhyNbUp3ScDrWdfN9EqgTEPntjk.png'
    }
  };

  // Fallback to 16mm-20mm if slug doesn't match
  const p = products[currentSlug] || products['Fe-550D-Grade-TMT-16mm-20mm'];

  // State for FAQ accordion
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'What is a TMT bar?',
      a: 'Thermo-Mechanically Treated (TMT) bars have a tough outer shell and a soft inner core. Triam A+ Fe 550D gives you the perfect balance of strength and flexibility needed for modern homes.'
    },
    {
      q: 'Where are TMT bars generally used?',
      a: 'Triam A+ is versatile. You\'ll find it in everything from office buildings and schools to massive projects like dams, power plants, and residential complexes.'
    },
    {
      q: 'How are TMT bars manufactured?',
      a: 'We produce our rebars from Block Mill using advanced Thermax technology from HSE, Germany.'
    },
    {
      q: 'What are the features of TMT bars?',
      a: 'Our bars offer a unique mix of high strength, superior flexibility, seismic resistance and excellent weldability which are attributed to low carbon content & controlled sulphur, phosphorous.'
    },
    {
      q: 'How are TMT bars superior to traditional steel bars?',
      a: 'Unlike old-school cold-twisted bars, our TMT bars have no internal residual stresses. This means they resist corrosion much better and last longer.'
    },
    {
      q: 'What are the properties of good quality TMT bars?',
      a: 'A good bar needs to bend without snapping. Our bars feature high bendability and a scientific rib pattern that ensures a solid lock with the concrete.'
    }
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
    { name: 'Advantages at a Glance', id: 'advantages' }
  ];

  return (
    <main>
      {/* Breadcrumb banner */}
      <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative">
        <div className="rs-breadcrumb-bg" style={{ backgroundImage: `url(${p.breadcrumbBg})` }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-8 col-lg-8">
              <div className="rs-breadcrumb-content-wrapper">
                <div className="rs-breadcrumb-title-wrapper">
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>{p.title}</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span><Link to="/">Home</Link></span></li>
                      <li><span>{p.title}</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="rs-services-area section-space">
        <div className="container">
          <div className="row g-5">
            {/* Left Content column */}
            <div className="col-xl-8 col-lg-8">
              <div className="rs-services-details-wrapper">
                <div className="rs-services-details-thumb mb-4">
                  <img src={p.image} alt={p.title} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} />
                </div>

                <h2>A+ All the Way</h2>
                <p>
                  For close to two decades, Amit Metaliks Ltd. has built its name in the metallurgical sector on one principle: no shortcuts.
                  Every TRIAM A+ {p.grade} rebar is forged on the patented Thermax technology from HSE, Germany, then carried through a refined process that pairs high strength with high ductility at every stage. Pick up an ISI-certified bar and the A+ quality shows along its full length.
                </p>
                
                <div className="my-4">
                  <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/jCZ08YrDJXpXR5kGRDQkxxNKubNLMIuVUAHYDsjR.png" alt="Rebar Cross Section" width="100%" style={{ borderRadius: '8px' }} />
                </div>

                <h2>A+ Physical Properties</h2>
                <p>
                  TRIAM A+ {p.grade} doesn't just meet IS 1786:2008 — it comfortably exceeds the minimum limits and conforms to ISO 9001, ISO 14001, and ISO 45001 quality standards.<br />
                  Where the standard specifies a yield strength of {p.grade === 'Fe 500D' ? '500' : '550'} N/mm², our bars deliver {p.grade === 'Fe 500D' ? '500+' : '550+'}. Where the standard calls for 14.5% elongation, ours hits 17% minimum. That combined margin of strength and ductility is what gives the bar its real safety reserve in long-service structures.
                </p>

                <table className="custom-table table-responsive mb-4">
                  <thead>
                    <tr>
                      <th>PHYSICAL PROPERTIES</th>
                      <th>IS:1786:2008 {p.grade}</th>
                      <th>Triam A+ {p.grade}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0.2% Proof Stress : N/mm<sup>2</sup> (Min)</td>
                      <td>{p.grade === 'Fe 500D' ? '500' : '550'}</td>
                      <td>{p.grade === 'Fe 500D' ? '500+' : '550+'}</td>
                    </tr>
                    <tr>
                      <td>Tensile Strength : N/mm<sup>2</sup> (Min)</td>
                      <td>{p.grade === 'Fe 500D' ? '565' : '600'}</td>
                      <td>{p.grade === 'Fe 500D' ? '565+' : '600+'}</td>
                    </tr>
                    <tr>
                      <td>Elongation (%)</td>
                      <td>14.5</td>
                      <td>17+</td>
                    </tr>
                    <tr>
                      <td>Elongation of Max. Force (%) (Min)</td>
                      <td>5</td>
                      <td>7+</td>
                    </tr>
                    <tr>
                      <td>TS / YS Ratio</td>
                      <td>1.08</td>
                      <td>1.15</td>
                    </tr>
                    <tr>
                      <td>Bend</td>
                      <td>4D-5D</td>
                      <td>3D-4D</td>
                    </tr>
                    <tr>
                      <td>Rebend</td>
                      <td>6D-7D</td>
                      <td>5D-6D</td>
                    </tr>
                  </tbody>
                </table>

                <h2>A+ Chemical Properties</h2>
                <p>
                  Built on controlled chemistry — clean steel, lean composition — TRIAM A+ {p.grade} conforms to {p.grade}, IS:1786:2008 specifications while delivering better weldability, higher bending capability, and superior ductility than the standard demands.<br />
                  A low-alloy steel variant is also available, with carbon controlled at 0.15% max and trace alloying elements that deliver {p.grade}-grade mechanical properties (per IS 1786:2008, clause 4.2.3) along with significantly enhanced corrosion resistance — a combination few rebars can match.
                </p>

                <table className="custom-table table-responsive mb-4">
                  <thead>
                    <tr>
                      <th>CHEMICAL PROPERTIES</th>
                      <th>IS:1786:2008 {p.grade}</th>
                      <th>TRIAM A+ {p.grade}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carbon (%) Max</td>
                      <td>0.250</td>
                      <td>0.200</td>
                    </tr>
                    <tr>
                      <td>Sulphur (%) Max</td>
                      <td>0.040</td>
                      <td>0.040</td>
                    </tr>
                    <tr>
                      <td>Phosphorous (%) Max</td>
                      <td>0.040</td>
                      <td>0.040</td>
                    </tr>
                    <tr>
                      <td>Sulphur & Phosphorous (%) Max</td>
                      <td>0.075</td>
                      <td>0.075</td>
                    </tr>
                  </tbody>
                </table>

                <table className="custom-table table-responsive mb-4">
                  <thead>
                    <tr>
                      <th>CHEMICAL PROPERTIES</th>
                      <th>IS:1786:2008 {p.grade}</th>
                      <th>TRIAM A+ {p.grade} Low Alloy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carbon (%) Max</td>
                      <td>0.250</td>
                      <td>0.150</td>
                    </tr>
                    <tr>
                      <td>Sulphur (%) Max</td>
                      <td>0.040</td>
                      <td>0.040</td>
                    </tr>
                    <tr>
                      <td>Phosphorous (%) Max</td>
                      <td>0.040</td>
                      <td>0.090</td>
                    </tr>
                    <tr>
                      <td>Sulphur & Phosphorous (%) Max</td>
                      <td>0.075</td>
                      <td>0.130</td>
                    </tr>
                  </tbody>
                </table>
                <p>Every time you hold an ISI-certified TRIAM A+ {p.grade} in your hand, you feel the A+ quality in every inch of metal.</p>

                {/* Video Play banner */}
                <div className="rs-services-details-video rs-video-one my-5">
                  <div className="rs-video-bg-thumb" style={{ backgroundImage: "url(https://enquiry.triamtmt.com/images/tab-img6.jpg)" }}></div>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-xl-7 col-lg-8 col-md-10">
                        <div className="rs-video-content text-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                          <div className="rs-video-play-btn">
                            <a href="https://www.youtube.com/watch?v=BNEq6JcQK0M" className="rs-play-btn popup-video" target="_blank" rel="noreferrer" style={{ width: '80px', height: '80px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e48915', color: '#fff', borderRadius: '50%', fontSize: '24px' }}>
                              <i className="fa-solid fa-play"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="has-border-line my-4" style={{ borderBottom: '1px solid #eee' }}></div>
                <h3 className="rs-services-details-title mb-4">FAQ</h3>
                
                {/* Stateful Accordion */}
                <div className="rs-services-details-faq mb-5">
                  <div className="rs-faq-content rs-accordion-one">
                    <div className="accordion-wrapper">
                      <div className="accordion">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="rs-accordion-item" style={{ border: '1px solid #eee', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' }}>
                            <h4 className="accordion-header" style={{ margin: 0 }}>
                              <button 
                                className={`accordion-button ${activeFaq === idx ? '' : 'collapsed'}`} 
                                type="button" 
                                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                                style={{
                                  width: '100%',
                                  padding: '20px',
                                  textAlign: 'left',
                                  backgroundColor: activeFaq === idx ? '#f7f5f2' : '#fff',
                                  border: 'none',
                                  fontWeight: 700,
                                  fontSize: '16px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  color: activeFaq === idx ? '#e48915' : '#191919'
                                }}
                              >
                                {faq.q}
                                <i className={`fa-solid ${activeFaq === idx ? 'fa-minus' : 'fa-plus'}`} style={{ fontSize: '14px' }}></i>
                              </button>
                            </h4>
                            {activeFaq === idx && (
                              <div className="accordion-collapse collapse show">
                                <div className="accordion-body" style={{ padding: '20px', backgroundColor: '#fff', color: '#555', fontSize: '14px', lineHeight: '1.7', borderTop: '1px solid #eee' }}>
                                  {faq.a}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Box */}
                <div className="rs-services-details-cta p-relative" style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', backgroundColor: '#191919', color: '#fff' }}>
                  <div className="rs-services-details-cta-bg-thumb" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize: 'cover', opacity: 0.15 }}></div>
                  <div className="rs-services-details-cta-content" style={{ padding: '50px 40px', zIndex: 2, flex: '1' }}>
                    <h3 className="rs-services-details-title mb-4" style={{ color: '#fff', fontSize: '26px', fontWeight: 800 }}>We are always ready to help you and answer your questions</h3>
                    <Link to="/contact" className="triam-btn triam-btn-yellow" style={{ textDecoration: 'none' }}>
                      Explore More
                    </Link>
                  </div>
                  <div className="rs-services-details-cta-thumb d-none d-md-block" style={{ width: '40%', position: 'relative', zIndex: 2 }}>
                    <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/IIjLqrsZBaXJl6Zp9B0oVVhvQ1Bm26eVR7kekQiv.jpg" alt="Support" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar column */}
            <div className="col-xl-4 col-lg-4">
              <div className="rs-sidebar-wrapper rs-sidebar-sticky" style={{ position: 'sticky', top: '100px' }}>
                {/* Categories widget */}
                <div className="sidebar-widget widget-categories-two mb-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #eee', borderRadius: '12px', padding: '30px' }}>
                  <h5 className="mb-4 sidebar-widget-title" style={{ fontWeight: 800, fontSize: '18px', borderBottom: '2px solid #e48915', paddingBottom: '10px' }}>Our Services</h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {sidebarLinks.map((link, idx) => (
                      <li key={idx} style={{ padding: '12px 0', borderBottom: idx < sidebarLinks.length - 1 ? '1px solid #eee' : 'none' }}>
                        <a href={`#${link.id}`} style={{ color: '#555', textDecoration: 'none', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="sidebar-link-hover">
                          {link.name}
                          <i className="ri-arrow-right-line" style={{ color: '#e48915' }}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Talk CTA Widget */}
                <div className="sidebar-widget widget-cta mb-4 text-center p-relative" style={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', overflow: 'hidden', padding: '40px 30px' }}>
                  <div className="sidebar-widget-cta-thumb" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/ltNm33aKSpwTDb4TnpNRfVs8GlLOb1uJec3BAD1o.jpg)', backgroundSize: 'cover', opacity: 0.2 }}></div>
                  <div className="sidebar-widget-content" style={{ position: 'relative', zIndex: 2 }}>
                    <h3 className="sidebar-widget-title mb-4" style={{ color: '#fff', fontWeight: 800, fontSize: '28px', lineHeight: '1.3' }}>Have a <br /> project in <br /> mind?</h3>
                    <Link to="/contact" className="triam-btn triam-btn-yellow" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                      Let's Talk
                    </Link>
                  </div>
                </div>

                {/* Download widget */}
                <div className="sidebar-widget widget-download mb-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #eee', borderRadius: '12px', padding: '30px' }}>
                  <h5 className="mb-4 sidebar-widget-title" style={{ fontWeight: 800, fontSize: '18px', borderBottom: '2px solid #e48915', paddingBottom: '10px' }}>Download Brochures</h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '15px' }}>
                      <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#191919', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/4NSVYaCAgXI7UtbnT7PxM7sxvprmuMQi0qU17bt4.svg" alt="PDF Icon" width="20" />
                          Report 2023-24
                        </div>
                        <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/ovuRLvRf5RkMi3bS1ydqp7kg4wLQLhwYH4DyyOCT.svg" alt="Download Icon" width="16" />
                      </a>
                    </li>
                    <li>
                      <a href="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/YTJbUO6ba8jZmZkQGeBPNe7jSbwTNOCMnho0fwyN.pdf" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#191919', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/6Q7yVj27cqGpULJ5epH2FCbLwmJben64aHPjl9Rs.svg" alt="PDF Icon" width="20" />
                          Download PDF
                        </div>
                        <img src="https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/tEhKHbW2Dukw07Kv0cTUQmwWWBSwjwUgaZaRrnK3.svg" alt="Download Icon" width="16" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
