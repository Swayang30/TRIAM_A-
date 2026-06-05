import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FloatingCTA() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnquire = () => {
    // If already on home page, scroll to the form
    if (location.pathname === '/') {
      const formEl = document.getElementById('contactwithformbuilder-1772200113725');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Otherwise navigate to home and scroll after mount
    navigate('/?scrollTo=enquiry-form');
  };

  // Listen for scrollTo query param on mount
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scrollTo') === 'enquiry-form') {
      setTimeout(() => {
        const formEl = document.getElementById('contactwithformbuilder-1772200113725');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="floating-cta-bar" id="floating-cta-bar">
      {/* Call Now Button */}
      <a
        href="tel:18008433333"
        className="floating-cta-btn floating-cta-call"
        aria-label="Call Now"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Call Now</span>
      </a>

      {/* Enquire Now Button */}
      <button
        onClick={handleEnquire}
        className="floating-cta-btn floating-cta-enquire"
        aria-label="Enquire Now"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Enquire Now</span>
      </button>
    </div>
  );
}
