import React, { useState } from 'react';

export default function GermanTechnology() {
  const [activeTab, setActiveTab] = useState('tab4');

  const tabs = [
    { id: 'tab4', label: 'Acclaimed German Technology' },
    { id: 'tab1', label: 'Rust and Corrosion Resistance' },
    { id: 'tab2', label: 'Manufactured for Excellence' },
    { id: 'tab3', label: 'Fire Resistance Quality' },
    { id: 'tab5', label: 'Scientific Rib Design' },
    { id: 'tab6', label: 'Made From Quality Billets' },
  ];

  const images = {
    tab1: 'https://wheat-termite-712594.hostingersite.com/storage/media/LsNAs8sCE4kgGANm6MFcxqikeSmUcAVlY9YpppQg.png',
    tab2: 'https://wheat-termite-712594.hostingersite.com/storage/media/bypyrIxVAU8w8mv8ymn0wEybAVvr7rGSr1KKfMBh.png',
    tab3: 'https://wheat-termite-712594.hostingersite.com/storage/media/tKpy70npEIciTrjxH5kGb7M7Tf4BphjBSMrOjmsn.png',
    tab4: 'https://wheat-termite-712594.hostingersite.com/storage/media/ubzBVIN0OWDAkiCmc1hlIez0QOI0US14OrpxLmIl.png',
    tab5: 'https://wheat-termite-712594.hostingersite.com/storage/media/af3qI4Dlqkv3gxeNTKFzwTlo3DJDxVI0ACCbBwXX.png',
    tab6: 'https://wheat-termite-712594.hostingersite.com/storage/media/T3Zg9h4l7uZQEv3XRqIJRc866vkEDcY544jpiI8x.png',
  };

  const descriptions = {
    tab1: (
      <>
        <p>Our TMT bars are made on Thermax technology from HSE, Germany. The controlled heat-treatment process gives each bar a soft ferrite-pearlite core inside a tough tempered martensite outer ring, with the transformation running evenly through the cross-section.</p>
        <p>That uniformity is what prevents the internal stresses that weaken ordinary rebar and accelerate corrosion from within. With no stress concentrations or micro-cracks for moisture and chlorides to exploit, the bar holds up well in coastal air, monsoon humidity, and aggressive soils.</p>
        <p>The result is a structure that stays sound for decades, with low maintenance and a real working life behind every bar.</p>
      </>
    ),
    tab2: (
      <>
        <p>Quality control runs through every stage of our TMT production, from the first melt to the final rolled bar. Steel chemistry is checked at the furnace, the billet is tested before rolling, and finished bars are sampled for yield, tensile strength, and bend before despatch.</p>
        <p>The manufacturing system carries three international certifications: ISO 9001 for quality management, ISO 14001 for environmental practice, and ISO 45001 for occupational health and safety.</p>
        <p>What that adds up to is a bar built with the kind of process discipline you want behind a structure meant to last fifty years.</p>
      </>
    ),
    tab3: (
      <>
        <p>Fire is one structural load you cannot design away — it has to be survived. Our Triam A+ rebars are made with a controlled chemical composition that improves thermal stability, so the steel holds its core mechanical properties under sustained heat.</p>
        <p>The bars retain structural strength up to 600°C, well into the range of an active building fire. That means slower loss of load-bearing capacity in the critical early minutes, when the steel inside columns and beams is doing the real work of keeping the structure standing.</p>
        <p>For a residential or commercial project, that translates into more evacuation time and lower risk of collapse before the fire is brought under control.</p>
      </>
    ),
    tab4: (
      <>
        <p>Our entire TMT range is manufactured on German technology, with the same precision and process discipline applied at every stage of production.</p>
        <p>From 8mm bars to 32mm heavy-duty sizes, every diameter runs through identical process controls. No shortcuts on the smaller bars, no exceptions on the larger ones — each one held to the same standards for strength, dimensional accuracy, and surface finish.</p>
        <p>That consistency is what makes the bars dependable on site, whether the application is residential reinforcement or large-scale infrastructure.</p>
      </>
    ),
    tab5: (
      <>
        <p>In reinforced concrete, the bond between steel and concrete matters as much as the strength of either one alone. Our TMT bars use a scientifically designed rib pattern that increases the contact area at the steel–concrete interface, giving the bar a stronger mechanical grip on the surrounding concrete.</p>
        <p>That grip prevents slippage under load and helps spread stress evenly through the structure, keeping cracks smaller and better controlled.</p>
        <p>The result is reinforcement that works as a single composite section with the concrete around it, the way RCC is meant to behave, for the full life of the structure.</p>
      </>
    ),
    tab6: (
      <>
        <p>Every billet that feeds our rolling mill is tested before it goes into production, not sampled at random. The chemistry is checked for purity and uniformity, so the bar that comes out at the other end behaves consistently along its full length.</p>
        <p>Sulphur and phosphorus are kept tightly within limit. Both elements, in excess, make steel brittle and speed up corrosion, so the lower we hold them, the tougher and more ductile the finished bar.</p>
        <p>That clean starting chemistry is the real reason our TMT bars resist rust well in coastal and high-humidity conditions. Strength comes from heat treatment; corrosion resistance starts much earlier, at the billet.</p>
      </>
    ),
  };

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <section className="gt-section">
      <div className="gt-wrap">

        {/* ── Section Header ── */}
        <div className="gt-header">
          <div className="tmt-eyebrow gt-eyebrow">Technology</div>
          <h2 className="gt-title">Highlights of German Thermex Technology</h2>
          <p className="gt-subtitle">Six ways our process sets a new standard for reinforcement steel in India.</p>
        </div>

        {/* ── Horizontal Tab Bar ── */}
        <div className="gt-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={`gt-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="gt-tab-num">0{i + 1}</span>
              <span className="gt-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Content: Image + Text ── */}
        <div className="gt-body">

          {/* Image pane */}
          <div className="gt-image-pane">
            <div className="gt-image-counter">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="gt-image-counter-total">/ 06</span>
            </div>
            <img
              src={images[activeTab]}
              alt={tabs[activeIndex]?.label}
              key={activeTab}
              className="gt-img"
            />
          </div>

          {/* Text pane */}
          <div className="gt-content-pane" key={activeTab + 'c'}>
            <div className="gt-content-eyebrow">
              {String(activeIndex + 1).padStart(2, '0')} &nbsp;/&nbsp; 06
            </div>
            <h3 className="gt-content-title">{tabs[activeIndex]?.label}</h3>
            <div className="gt-content-rule" />
            <div className="gt-content-text">
              {descriptions[activeTab]}
            </div>

            {/* Nav arrows */}
            <div className="gt-nav">
              <button
                className="gt-nav-btn"
                onClick={() => setActiveTab(tabs[(activeIndex - 1 + tabs.length) % tabs.length].id)}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="gt-nav-btn"
                onClick={() => setActiveTab(tabs[(activeIndex + 1) % tabs.length].id)}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
