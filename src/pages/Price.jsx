import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Price() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const stateDistricts = {
    "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Delhi": ["New Delhi", "South Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
    "Western U.P": ["Noida", "Ghaziabad", "Meerut"]
  };

  const states = Object.keys(stateDistricts);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const getPrice = () => {
    if (!selectedState || !selectedDistrict) {
      alert("Please select both state & district");
      return;
    }

    const slugify = (text) => 
      text.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');

    const file = `${slugify(selectedState)}-${slugify(selectedDistrict)}.pdf`;
    // We will link to the original domain's price lists
    const url = `https://wheat-termite-712594.hostingersite.com/price-list/${file}`;
    window.open(url, "_blank");
  };

  return (
    <main>
      {/* Price Hero Section with Dynamic Split Panels */}
      <section className="triam-rate-hero" style={{ background: 'linear-gradient(90deg, #1d2951 0%, #1f7ae8 100%)', color: '#fff' }}>
        <div className="triam-rate-hero-bg-pattern"></div>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* Left Content column */}
            <div className="col-lg-7 triam-rate-left">
              <div className="triam-rate-badge" style={{ fontSize: '64px', fontWeight: 800, color: '#e48915' }}>RATE CARD</div>
              <h1 className="display-4" style={{ fontWeight: 800, color: '#fff' }}>Pricing and Service Overview</h1>
              <p className="triam-rate-subtitle fs-5" style={{ color: '#eee', margin: '20px 0 40px' }}>
                Need more technical information or structural advice before confirming your order? Let us help you plan the foundation of your structure.
              </p>

              <div className="triam-rate-actions d-flex gap-3 flex-wrap">
                <Link to="/contact" className="triam-btn triam-btn-yellow" style={{ textDecoration: 'none' }}>
                  Request A Quote
                </Link>
                <a href="#price-top" className="triam-btn triam-btn-outline" style={{ textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', color: '#fff' }}>
                  Read More
                </a>
              </div>
            </div>

            {/* Right Card Picker column */}
            <div className="col-lg-5 triam-rate-right">
              <div className="triam-price-card p-4" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: '#191919' }}>
                <h3 style={{ fontWeight: 800, fontSize: '24px', color: '#191919', textAlign: 'center', marginBottom: '10px' }}>Latest TMT Bar Price List</h3>
                <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '25px' }}>Let’s Build a Strong Foundation for the Nation</p>

                <div className="mb-3">
                  <select 
                    value={selectedState} 
                    onChange={handleStateChange} 
                    className="form-select"
                    style={{ height: '52px', fontSize: '15px' }}
                  >
                    <option value="">Select state to view price list</option>
                    {states.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <select 
                    value={selectedDistrict} 
                    onChange={handleDistrictChange} 
                    className="form-select"
                    disabled={!selectedState}
                    style={{ height: '52px', fontSize: '15px' }}
                  >
                    <option value="">Select your district</option>
                    {selectedState && stateDistricts[selectedState].map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="button" 
                  onClick={getPrice} 
                  className="triam-btn triam-btn-yellow w-100"
                  style={{ border: 'none', borderRadius: '8px' }}
                >
                  Get Price List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Rates Tables */}
      <div className="triam-price-wrapper py-5" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container" id="price-top" style={{ maxWidth: '1000px', margin: 'auto' }}>
          
          {/* Section Hero Header */}
          <div className="text-center mb-5">
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#191919' }}>🔥 TMT Bar Price</h2>
            <p className="mt-3 text-muted fs-5" style={{ lineHeight: '1.7' }}>
              Per-piece pricing for TRIAM A+ TMT bars across every size and delivery region — GST-inclusive and revised regularly to reflect current market rates. Build smarter with premium TRIAM A+ rebars engineered for strength, durability, and unmatched value in every structure.
            </p>
          </div>

          {/* Why Price Page Matters info card */}
          <div className="p-4 mb-5" style={{ backgroundColor: '#fff', borderLeft: '4px solid #e48915', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#191919', marginBottom: '15px' }}>📈 Why This Price Page Matters</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '15px', color: '#555' }}>
              <li><b>Instant Price Comparison</b> for buyers across different regions</li>
              <li><b>Budgeting Accuracy</b> for contractors, developers, and homebuilders</li>
              <li><b>Clear Transparency</b> that eliminates middleman markup confusion</li>
              <li><b>Regional Localization</b> reflecting logistics, taxes, and raw supply availability</li>
            </ul>
          </div>

          {/* Pricing Grid Table */}
          <div className="p-4 mb-5" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#191919', marginBottom: '8px' }}>📊 TRIAM A+ TMT Bar Price List</h3>
            <p className="text-muted" style={{ fontSize: '14px' }}><strong>Updated effective 1st Nov 2025</strong> — Prices in INR per piece (12 m length, FE550D grade)</p>

            <table className="custom-table table-responsive mb-4 mt-3">
              <thead>
                <tr>
                  <th>Bar Size</th>
                  <th>West Bengal</th>
                  <th>Bihar & Jharkhand</th>
                  <th>UP</th>
                  <th>Assam</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>8 mm</td><td>₹351</td><td>₹391</td><td>₹407</td><td>₹399</td></tr>
                <tr><td>10 mm</td><td>₹538</td><td>₹582</td><td>₹605</td><td>₹594</td></tr>
                <tr><td>12 mm</td><td>₹773</td><td>₹844</td><td>₹876</td><td>₹860</td></tr>
                <tr><td>16 mm</td><td>₹1,375</td><td>₹1,496</td><td>₹1,554</td><td>₹1,525</td></tr>
                <tr><td>20 mm</td><td>₹2,148</td><td>₹2,336</td><td>₹2,427</td><td>₹2,382</td></tr>
                <tr><td>25 mm</td><td>₹3,356</td><td>₹3,448</td><td>₹3,582</td><td>₹3,515</td></tr>
              </tbody>
            </table>

            <div className="p-3" style={{ backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
              <div>🔹 Prices are per piece. Each TMT rebar piece is 12 metres in fixed length.</div>
              <div>🔹 Subject to market fluctuations, local freight conditions & availability.</div>
              <div>🔹 Bulk orders & dealer wholesale pricing are available on inquiry request.</div>
            </div>
          </div>

          {/* Buying Info Grid */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="p-4 h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#191919', marginBottom: '15px' }}>🏗️ What to Know Before Purchasing</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
                  <li><strong>TMT Bar Size:</strong> Larger diameters handle higher structural loads but cost more per piece due to weight.</li>
                  <li><strong>Grade FE550D:</strong> Superior yield strength and ductile parameters for high seismic safety.</li>
                  <li><strong>Regional Freight:</strong> Distance from rolling mills impacts final yard price lists.</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4 h-100" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#191919', marginBottom: '15px' }}>🚀 How to Get the Best Price</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
                  <li>✅ Always purchase from an authorised Triam A+ distributor.</li>
                  <li>✅ Seek project-wise bulk estimates for structural quantities.</li>
                  <li>✅ Verify authentic batch test certificates (MTC) matching the steel supply.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Forms */}
          <div className="triam-price-cta text-center p-5 mb-4" style={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize: 'cover', opacity: 0.1 }}></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>📞 Ready to Order TRIAM A+ TMT Bars?</h2>
              <p style={{ color: '#ccc', marginBottom: '30px' }}>Whether you are a developer, contractor, commercial builder, or individual homeowner, we make buying simple.</p>
              
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/contact" className="triam-btn triam-btn-yellow" style={{ textDecoration: 'none' }}>Purchase Online</Link>
                <Link to="/contact" className="triam-btn triam-btn-outline" style={{ textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', color: '#fff' }}>Request Bulk Quote</Link>
                <Link to="/contact" className="triam-btn triam-btn-outline" style={{ textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', color: '#fff' }}>Become a Dealer</Link>
              </div>
            </div>
          </div>

          {/* Notes Callout */}
          <div className="p-4" style={{ backgroundColor: '#f7f5f2', border: '1px solid #e0dbc5', borderRadius: '8px', color: '#555' }}>
            <h4 style={{ fontWeight: 700, color: '#191919', marginBottom: '10px' }}>Important Notes:</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              <li>Prices are subject to revision without prior notice to reflect steel commodity changes.</li>
              <li>All pricing listed is fully inclusive of standard GST rates.</li>
              <li>Actual retail prices may vary slightly based on final shipping distances, orders size, and warehouse variables.</li>
              <li>All orders are subject to Triam Amit Metaliks sales terms and agreements.</li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}
