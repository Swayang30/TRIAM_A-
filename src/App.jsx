import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Quality from './pages/Quality';
import Price from './pages/Price';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Hardcoded product paths */}
            <Route path="/Fe-500D-Grade-TMT-8mm-12mm" element={<ProductDetail />} />
            <Route path="/Fe-550D-Grade-TMT-6mm-32mm" element={<ProductDetail />} />
            <Route path="/Fe-550D-Grade-TMT-25mm-32mm" element={<ProductDetail />} />
            
            {/* Dynamic fallback product slug */}
            <Route path="/product/:slug" element={<ProductDetail />} />

            <Route path="/quality" element={<Quality />} />
            <Route path="/price" element={<Price />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

export default App;

