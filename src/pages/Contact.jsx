import React from 'react';
import { Link } from 'react-router-dom';
import OnsiteAdviceForm from '../components/OnsiteAdviceForm';

export default function Contact() {
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
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>Contact Us</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span><Link to="/">Home</Link></span></li>
                      <li><span>Contact Us</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Details and Maps Section */}
      <section className="py-5" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container py-4">
          <div className="row g-0" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
            
            {/* Left black column */}
            <div className="col-lg-5 p-5 text-white" style={{ backgroundColor: '#191919' }}>
              <span style={{ color: '#e48915', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>Coordinates</span>
              <h2 className="mt-3 mb-4" style={{ fontWeight: 800, fontSize: '32px', color: '#fff' }}>Corporate Office</h2>
              <p className="text-muted mb-5">Mon - Sat 10:00 AM - 6:00 PM</p>

              <div className="mb-4">
                <span className="text-muted d-block" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</span>
                <a href="tel:18008433333" style={{ fontSize: '20px', fontWeight: 700, color: '#fff', textDecoration: 'none' }} className="contact-link-hover">
                  1800 843 3333
                </a>
              </div>

              <div className="mb-4">
                <span className="text-muted d-block" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</span>
                <a href="mailto:info@triamtmt.com" style={{ fontSize: '20px', fontWeight: 700, color: '#fff', textDecoration: 'none' }} className="contact-link-hover">
                  info@triamtmt.com
                </a>
              </div>

              <div className="mb-5">
                <span className="text-muted d-block mb-2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Address</span>
                <p style={{ fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                  📍 238 B, AJC Bose Road, 3rd Floor, Bhowanipore, Kolkata-700020, West Bengal, India
                </p>
              </div>

              <a 
                href="https://maps.google.com/?q=238+B,+AJC+Bose+Road,+Kolkata+700020" 
                target="_blank" 
                rel="noreferrer"
                className="triam-btn triam-btn-yellow w-100 text-decoration-none"
              >
                View Location
              </a>
            </div>

            {/* Right Map column */}
            <div className="col-lg-7" style={{ minHeight: '450px', backgroundColor: '#fff' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7370.0374129429065!2d88.348565!3d22.540972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277160eba3e0d%3A0x1814953910ade550!2s238B%2C%20Acharya%20Jagdish%20Chandra%20Bose%20Rd%2C%20Sreepally%2C%20Bhowanipore%2C%20Kolkata%2C%20West%20Bengal%20700020%2C%20India!5e0!3m2!1sen!2sus!4v1772177549487!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '450px', display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Triam TMT Office Location Map"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* Inquiry Form Wrapper */}
      <OnsiteAdviceForm />
    </main>
  );
}
