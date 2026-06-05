import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.9.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="tmt-footer">
      <div className="tmt-footer-top">
        <div className="container">
          <div className="row g-4">

            {/* Brand Column */}
            <div className="col-lg-4 col-md-6">
              <div className="tmt-footer-logo">
                <img
                  src="https://wheat-termite-712594.hostingersite.com/storage/media/nCS4zfNIkPQagMi24GBWRCD7t6qUQDETrC39U7S5.png"
                  alt="Triam TMT"
                />
              </div>
              <p className="tmt-footer-desc">
                At Triam TMT, we are driven by an unwavering commitment to strength, precision, and progress. Premium reinforcing steel — benchmarked for the future of India.
              </p>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-6 col-6">
              <span className="tmt-footer-heading">Useful Links</span>
              <ul className="tmt-footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/Fe-550D-Grade-TMT-16mm-20mm">Products</Link></li>
                <li><Link to="/quality">Quality Checks</Link></li>
                <li><Link to="/price">Price List</Link></li>
                <li><Link to="/blog">Blog &amp; Updates</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <span className="tmt-footer-heading">Contact Info</span>
              <div className="tmt-footer-contact-item">
                <div className="tmt-footer-contact-icon"><PinIcon /></div>
                <div className="tmt-footer-contact-text">
                  238 B, AJC Bose Road, 3rd Floor,<br />Bhowanipore, Kolkata-700020,<br />West Bengal, India
                </div>
              </div>
              <div className="tmt-footer-contact-item">
                <div className="tmt-footer-contact-icon"><PhoneIcon /></div>
                <div className="tmt-footer-contact-text">
                  <a href="tel:18008433333">1800 843 3333</a><br />
                  <a href="tel:03340063942">(033) 4006 3942/43/44</a>
                </div>
              </div>
              <div className="tmt-footer-contact-item">
                <div className="tmt-footer-contact-icon"><MailIcon /></div>
                <div className="tmt-footer-contact-text">
                  <a href="mailto:info@triamtmt.com">info@triamtmt.com</a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <span className="tmt-footer-heading">Newsletter</span>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', marginBottom: '14px', lineHeight: '1.7' }}>
                Subscribe for latest pricing revisions, product updates, and industry insights.
              </p>
              <form onSubmit={handleSubscribe}>
                <div className="tmt-newsletter-row">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="tmt-newsletter-input"
                  />
                  <button type="submit" className="tmt-newsletter-btn">Join</button>
                </div>
              </form>

              <div className="tmt-footer-social">
                {[
                  { href: 'https://www.facebook.com/TriamTMT', label: 'f' },
                  { href: 'https://www.linkedin.com/showcase/triam-tmt', label: 'in' },
                  { href: 'https://x.com/TriamTMT', label: '𝕏' },
                  { href: 'https://www.instagram.com/triamtmt', label: '◎' },
                ].map(s => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tmt-footer-social-btn"
                    aria-label={s.label}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700 }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="tmt-footer-bottom">
        <div className="container">
          <p className="tmt-footer-copyright">
            © 2026 Amit Metaliks Limited. All Rights Reserved. &nbsp;·&nbsp; Triam TMT — Engineered with Intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
