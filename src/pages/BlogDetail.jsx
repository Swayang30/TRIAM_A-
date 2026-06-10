import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

export default function BlogDetail() {
  const { slug } = useParams();

  const post = blogData.find(p => p.slug === slug);
  const recentPosts = blogData.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <main className="py-5 text-center">
        <div className="container py-5">
          <i className="fa-solid fa-triangle-exclamation mb-4" style={{ fontSize: '64px', color: '#e48915' }}></i>
          <h2>Blog Post Not Found</h2>
          <p className="text-muted mb-4">The article you are looking for might have been moved or deleted.</p>
          <Link to="/blog" className="triam-btn triam-btn-yellow" style={{ textDecoration: 'none' }}>
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

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
                  <h1 className="rs-breadcrumb-title" style={{ fontWeight: 800 }}>{post.title}</h1>
                </div>
                <div className="rs-breadcrumb-menu">
                  <nav>
                    <ul>
                      <li><span><Link to="/">Home</Link></span></li>
                      <li><span><Link to="/blog">Blog</Link></span></li>
                      <li><span>{post.title}</span></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Detail Article section */}
      <section className="py-5" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Left Column - Article Content */}
            <div className="col-lg-8">
              <article className="p-4 p-md-5" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                {/* Meta details */}
                <div className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  <span style={{ backgroundColor: '#e48915', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginRight: '15px' }}>
                    {post.category}
                  </span>
                  <span>
                    <i className="fa-regular fa-calendar-days" style={{ marginRight: '6px', color: '#e48915' }}></i> {post.date}
                  </span>
                  <span className="mx-3">|</span>
                  <span>
                    <i className="fa-regular fa-user" style={{ marginRight: '6px', color: '#e48915' }}></i> By {post.author}
                  </span>
                </div>

                {/* Banner Thumbnail */}
                <div className="mb-5 blog-detail-img-wrap" style={{ height: '380px', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Article Body */}
                <h2 className="mb-4" style={{ fontWeight: 800, fontSize: '32px', color: '#191919' }}>{post.title}</h2>
                <div 
                  className="blog-post-body" 
                  style={{ lineHeight: '1.8', fontSize: '16px', color: '#444' }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share widgets */}
                <div className="mt-5 pt-4 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ borderTop: '1px solid #eee' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontWeight: 700, color: '#191919' }}>Tags:</span>
                    <span style={{ backgroundColor: '#f7f5f2', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', color: '#666' }}>TMT Rebars</span>
                    <span style={{ backgroundColor: '#f7f5f2', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', color: '#666' }}>Construction</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontWeight: 700, color: '#191919' }}>Share:</span>
                    <a href="#" className="text-muted"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="text-muted"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#" className="text-muted"><i className="fa-brands fa-linkedin-in"></i></a>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
                
                {/* Recent Posts widget */}
                <div className="p-4 mb-4" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '20px', borderBottom: '2px solid #e48915', paddingBottom: '8px' }}>Recent Posts</h4>
                  
                  <div className="d-flex flex-column gap-4">
                    {recentPosts.map((rPost) => (
                      <div key={rPost.id} className="d-flex gap-3 align-items-center">
                        <img 
                          src={rPost.thumbnail} 
                          alt={rPost.title} 
                          style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} 
                        />
                        <div>
                          <span style={{ fontSize: '11px', color: '#999' }}>{rPost.date}</span>
                          <h5 style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 0', lineHeight: '1.4' }}>
                            <Link to={`/blog/${rPost.slug}`} style={{ color: '#191919', textDecoration: 'none' }} className="blog-title-link">
                              {rPost.title}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dealership Banner */}
                <div className="p-4 text-center text-white" style={{ backgroundColor: '#191919', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://phpstack-715630-6150587.cloudwaysapps.com/storage/media/5ed2PbhFs4YyBh8d3SVZEQO6x8lUeKsJxY22nHCt.jpg)', backgroundSize: 'cover', opacity: 0.15 }}></div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h4 style={{ fontWeight: 800, marginBottom: '10px' }}>Become a Dealer</h4>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>Grow your business across West Bengal with premium Triam A+ TMT bars.</p>
                    <Link to="/contact" className="triam-btn triam-btn-yellow mt-2" style={{ height: '38px', minWidth: '120px', fontSize: '13px', textDecoration: 'none' }}>
                      Enquire Now
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
