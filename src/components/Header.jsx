import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/Fe-550D-Grade-TMT-6mm-32mm', label: 'Product' },
    { to: '/quality', label: 'Quality' },
    { to: '/price', label: 'Price' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`tmt-site-header${scrolled ? ' scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="tmt-topbar">
          <div className="tmt-topbar-inner">
            <a href="tel:18008433333" className="tmt-topbar-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              1800 843 3333 &nbsp;/&nbsp; (033) 4006 3942
            </a>
            <a href="mailto:info@triamtmt.com" className="tmt-topbar-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@triamtmt.com
            </a>
          </div>
        </div>

        {/* Main Nav */}
        <div className="tmt-main-header">
          <div className="tmt-main-header-inner">
            {/* Logo */}
            <Link className="tmt-logo" to="/">
              <img src="https://wheat-termite-712594.hostingersite.com/storage/media/nCS4zfNIkPQagMi24GBWRCD7t6qUQDETrC39U7S5.png" alt="Triam TMT" />
            </Link>

            {/* Desktop Nav */}
            <nav className="tmt-nav">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `tmt-nav-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="tmt-nav-right">
              <Link to="/contact" className="tmt-nav-cta">Get a Quote</Link>

              {/* Hamburger */}
              <button
                className={`tmt-hamburger${mobileOpen ? ' open' : ''}`}
                onClick={() => setMobileOpen(p => !p)}
                aria-label="Toggle menu"
              >
                <span /><span /><span />
              </button>

              {/* Sidebar trigger */}
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', color: 'var(--c-slate)', marginLeft: '2px' }}
                aria-label="Open sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <nav className={`tmt-mobile-nav${mobileOpen ? ' open' : ''}`}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `tmt-mobile-nav-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="tmt-mobile-nav-cta-row">
              <Link to="/contact" className="tmt-mobile-nav-cta">Get a Quote</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`tmt-sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Drawer */}
      <aside className={`tmt-sidebar${sidebarOpen ? ' open' : ''}`}>
        <button className="tmt-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close">✕</button>

        <div className="tmt-sidebar-logo">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src="https://wheat-termite-712594.hostingersite.com/storage/media/nCS4zfNIkPQagMi24GBWRCD7t6qUQDETrC39U7S5.png" alt="Triam TMT" />
          </Link>
        </div>

        <div className="tmt-sidebar-tagline">Do you have a project in mind? Stay connected with us.</div>

        <div className="tmt-sidebar-section-title">Contact Us</div>
        <div className="tmt-sidebar-contact-item">
          <div className="tmt-sidebar-contact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.9.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <a href="tel:18008433333">1800 843 3333</a>
        </div>
        <div className="tmt-sidebar-contact-item">
          <div className="tmt-sidebar-contact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <a href="mailto:info@triamtmt.com">info@triamtmt.com</a>
        </div>
        <div className="tmt-sidebar-contact-item">
          <div className="tmt-sidebar-contact-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          238 B, AJC Bose Road, 3rd Floor, Bhowanipore, Kolkata-700020
        </div>

        <div className="tmt-sidebar-divider" />

        <div className="tmt-sidebar-section-title">Subscribe</div>
        <form onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!'); setEmail(''); }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="tmt-sidebar-newsletter-input"
          />
          <button type="submit" className="tmt-sidebar-newsletter-btn">Subscribe Now →</button>
        </form>

        <div className="tmt-sidebar-divider" />

        <div className="tmt-sidebar-section-title">Follow Us</div>
        <div className="tmt-sidebar-social">
          {[
            { href: 'https://www.facebook.com/TriamTMT', label: 'f' },
            { href: 'https://www.linkedin.com/showcase/triam-tmt', label: 'in' },
            { href: 'https://x.com/TriamTMT', label: '𝕏' },
            { href: 'https://www.instagram.com/triamtmt', label: '◎' },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="tmt-sidebar-social-btn" aria-label={s.label}>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>{s.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
