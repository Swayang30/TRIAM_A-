import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'TMT Bars', 'Seismic Grade', 'Dealership'];

  const filteredPosts = blogData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>Latest Blogs & Updates</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span><Link to="/">Home</Link></span></li>
                      <li><span>Blog</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Page Layout */}
      <section className="py-5" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container py-4">
          <div className="row g-4">
            
            {/* Left Column - Articles Grid */}
            <div className="col-lg-8">
              <div className="row g-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="col-md-6">
                      <div className="card h-100 border-0" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                        <div className="blog-img-wrap" style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                          <img 
                            src={post.thumbnail} 
                            alt={post.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          <span 
                            style={{ 
                              position: 'absolute', 
                              top: '15px', 
                              left: '15px', 
                              backgroundColor: '#e48915', 
                              color: '#fff', 
                              padding: '5px 12px', 
                              borderRadius: '20px', 
                              fontSize: '12px', 
                              fontWeight: 700 
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="text-muted mb-2" style={{ fontSize: '13px' }}>
                            <i className="fa-regular fa-calendar-days" style={{ marginRight: '6px', color: '#e48915' }}></i> {post.date}
                            <span className="mx-2">|</span>
                            <i className="fa-regular fa-user" style={{ marginRight: '6px', color: '#e48915' }}></i> By {post.author}
                          </div>
                          <h3 className="card-title h5 mb-3" style={{ fontWeight: 800, lineHeight: '1.4' }}>
                            <Link to={`/blog/${post.slug}`} style={{ color: '#191919', textDecoration: 'none' }} className="blog-title-link">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="card-text text-muted mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            {post.summary}
                          </p>
                          <div className="mt-auto">
                            <Link to={`/blog/${post.slug}`} className="triam-btn triam-btn-yellow" style={{ minWidth: '120px', height: '40px', fontSize: '13px', borderRadius: '6px', padding: '0 15px', textDecoration: 'none' }}>
                              Read Full Article →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <i className="fa-regular fa-folder-open mb-3" style={{ fontSize: '48px', color: '#ccc' }}></i>
                    <h3>No articles found</h3>
                    <p className="text-muted">Try adjusting your keywords or category filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar Filters */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
                
                {/* Search Widget */}
                <div className="p-4 mb-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '15px' }}>Search Posts</h4>
                  <div className="input-group">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type keywords..." 
                      className="form-control"
                      style={{ height: '48px' }}
                    />
                    <span className="input-group-text" style={{ backgroundColor: '#f7f5f2' }}>
                      <i className="fa-solid fa-magnifying-glass" style={{ color: '#e48915' }}></i>
                    </span>
                  </div>
                </div>

                {/* Categories Widget */}
                <div className="p-4 mb-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '15px' }}>Categories</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {categories.map((cat) => (
                      <li key={cat} style={{ marginBottom: '10px' }}>
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontWeight: selectedCategory === cat ? 700 : 500,
                            color: selectedCategory === cat ? '#fff' : '#555',
                            backgroundColor: selectedCategory === cat ? '#e48915' : 'transparent',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          {cat}
                          {selectedCategory === cat && <i className="fa-solid fa-circle-check" style={{ fontSize: '12px' }}></i>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info CTA Box */}
                <div className="p-4 text-center text-white" style={{ backgroundColor: '#191919', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize: 'cover', opacity: 0.15 }}></div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h4 style={{ fontWeight: 800, marginBottom: '10px' }}>Looking for Steel rates?</h4>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>Get immediate pricing tables and download regional rate lists now.</p>
                    <Link to="/price" className="triam-btn triam-btn-yellow mt-2" style={{ height: '38px', minWidth: '120px', fontSize: '13px', textDecoration: 'none' }}>
                      View Price List
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
