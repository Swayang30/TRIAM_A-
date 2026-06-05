import React, { useState } from 'react';

const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.67.07-1.08s-.03-.75-.07-1.08l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1.08s.03.75.07 1.08l-2.11 1.62c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.62z" />
  </svg>
);

const GearSvgPath = () => (
  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.67.07-1.08s-.03-.75-.07-1.08l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1.08s.03.75.07 1.08l-2.11 1.62c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.62z" />
);

const benefits = [
  {
    title: '100% Tested',
    desc: 'Resulting in controlled chemical composition of the TMT'
  },
  {
    title: 'Controlled Sulphur & Phosphorus',
    desc: 'Leads to better corrosion control and a tougher, more ductile bar'
  },
  {
    title: 'Conversion Agent of SAIL',
    desc: 'Proof of premium quality — authorised by Steel Authority of India Limited'
  },
  {
    title: 'Flexibility Higher than Standard',
    desc: 'Safeguards from earthquakes and other natural calamities'
  },
  {
    title: 'Greater AR (Area of Rib) Value',
    desc: 'Resulting in superior bonding between steel and concrete'
  },
];

export default function OnsiteAdviceForm() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', inquiry: '', message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill out the required fields (Full Name and Phone Number).');
      return;
    }
    alert(`Thank you, ${formData.fullName}! Your inquiry has been sent successfully.`);
    setFormData({ fullName: '', email: '', phone: '', inquiry: '', message: '' });
  };

  return (
    <section
      className="tmt-benefits-section"
      id="contactwithformbuilder-1772200113725"
      style={{ background: 'var(--c-ink)', backgroundImage: 'none' }}
    >
      {/* Amber gear decorations — replace external background images */}
      <span className="benefits-gear benefits-gear-1" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><GearSvgPath /></svg>
      </span>
      <span className="benefits-gear benefits-gear-2" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><GearSvgPath /></svg>
      </span>
      <span className="benefits-gear benefits-gear-3" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><GearSvgPath /></svg>
      </span>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row g-5 align-items-center">

          {/* Left — Benefits */}
          <div className="col-lg-6" style={{ position: 'relative' }}>
            <div>
              {benefits.map((b, i) => (
                <div key={i} className="tmt-benefit-item">
                  <div className="tmt-benefit-num">
                    <GearIcon />
                  </div>
                  <div>
                    <div className="tmt-benefit-title">{b.title}</div>
                    <p className="tmt-benefit-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="col-lg-6">
            <div className="tmt-form-card">
              <h3 className="tmt-form-title">Book Free Onsite Advice From Our Experts</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="tmt-form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="tmt-form-input"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="tmt-form-input"
                />
                <input
                  type="text"
                  name="inquiry"
                  placeholder="Your Inquiry Topic"
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="tmt-form-input"
                />
                <textarea
                  name="message"
                  placeholder="Write Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="tmt-form-input"
                  style={{ height: '110px', resize: 'none' }}
                />
                <button type="submit" className="tmt-form-submit">
                  Send Inquiry →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
