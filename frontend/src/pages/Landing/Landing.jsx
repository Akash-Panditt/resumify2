import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import GoldStar from '../../components/GoldStar';
import Navbar from '../../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in for Navbar
    const storedUser = localStorage.getItem('resumify_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    // Trigger entrance animation loop
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Navbar user={user} />

      {/* Main Content Area */}
      <main className="section-padding" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem', marginTop: '2rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <span className="badge badge-purple" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
              ✨ Meet the Future of Resumes
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
            Build a <span className="text-gradient">Professional Resume</span> in Minutes.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Stand out to recruiters and breeze past Applicant Tracking Systems. Resumify empowers you with intelligent templates, smart AI enhancements, and easy-to-use tools.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Create Your Resume Free
            </button>
            <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Explore Features
            </button>
          </div>
        </div>

        {/* Hero Image Mockup Area */}
        <div style={{ width: '100%', maxWidth: '900px', height: '400px', marginBottom: '6rem', position: 'relative' }}>
           <div className="card" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(192,132,252,0.05))', overflow: 'hidden' }}>
              {/* Decorative abstract elements */}
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(99,102,241,0.2)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '250px', height: '250px', background: 'rgba(16,185,129,0.15)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
              
              <div style={{ textAlign: 'center', zIndex: 1, color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📄</span>
                <p style={{ fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>App Preview Here</p>
              </div>
           </div>
        </div>

        {/* Features / Glassmorphism Cards */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: 700 }}>Why Choose <span className="text-gradient">Resumify?</span></h2>
        </div>
        <div className="responsive-grid" style={{ width: '100%', paddingBottom: '6rem' }}>
          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              ✨
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>AI Smart Enhancements</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Writer's block? Our AI intelligently rewrites and upgrades your summary and experiences, tailoring them to beat ATS filters.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              🎨
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Premium Templates</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Choose from a curated collection of modern, responsive templates designed to impress recruiters in every industry.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Instant Export</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Download your polished resume in pixel-perfect PDF format instantly, ensuring it looks exactly right on any device.
            </p>
          </div>
        </div>

        {/* How it Works Section */}
        <div style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>How it <span className="text-gradient">Works</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Three simple steps to your next interview.</p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
             {[
               { step: '01', title: 'Pick a Template', desc: 'Select from our ATS-friendly collection.' },
               { step: '02', title: 'Fill & Enhance', desc: 'Input your details and let AI refine the tone.' },
               { step: '03', title: 'Download & Apply', desc: 'Export to PDF and send it to your dream job.' }
             ].map((item, id) => (
               <div key={id} style={{ flex: '1 1 250px', maxWidth: '350px', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', position: 'relative' }}>
                  <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(99, 102, 241, 0.1)', position: 'absolute', top: '10px', right: '20px', lineHeight: 1 }}>{item.step}</div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem', position: 'relative', zIndex: 1 }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>{item.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontWeight: 700 }}>Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find the perfect plan for your career stage.</p>
          </div>

          <div className="responsive-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Free Plan */}
            <div className="pricing-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Basic</h3>
              <div className="price">$0<span>/forever</span></div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Perfect for getting started.</p>
              <ul className="feature-list">
                <li>1 Resume Draft</li>
                <li>3 Basic Templates</li>
                <li>Standard PDF Export</li>
                <li>Community Support</li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card featured" style={{ transform: 'scale(1.05)', borderColor: 'var(--primary)' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '2px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Pro</h3>
              <div className="price">$9.99<span>/mo</span></div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>For active job seekers.</p>
              <ul className="feature-list">
                <li>Unlimited Resumes</li>
                <li>All 50+ Templates</li>
                <li>AI "Smart Enhance"</li>
                <li>Priority Email Support</li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Upgrade Now</button>
            </div>

            {/* Premium Plan */}
            <div className="pricing-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Premium</h3>
              <div className="price">$19.99<span>/mo</span></div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Total career management.</p>
              <ul className="feature-list">
                <li>Everything in Pro</li>
                <li>ATS Keyword Guide</li>
                <li>Custom Domain Hosting</li>
                <li>1-on-1 Resume Review</li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Go Premium</button>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div style={{ width: '100%', textAlign: 'center', padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(192, 132, 252, 0.08))', borderRadius: 'var(--radius-xl)', marginBottom: '6rem', border: '1px solid var(--surface-border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800, position: 'relative' }}>Ready to land your <span className="text-gradient">dream job?</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', position: 'relative' }}>Join 10,000+ professionals who have already built their careers with Resumify.</p>
          <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.85rem 3rem', borderRadius: 'var(--radius-full)', position: 'relative' }}>
            Build Your Resume Now
          </button>
        </div>

      </main>

      <footer style={{ 
        borderTop: '1px solid var(--surface-border)', 
        padding: '5rem 2rem 3rem 2rem', 
        background: 'rgba(var(--bg-rgb), 0.8)',
        backdropFilter: 'blur(20px)',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', marginBottom: '1rem' }}>Resumify</h2>
            <p style={{ maxWidth: '300px', lineHeight: 1.6, fontSize: '0.95rem' }}>
              The #1 AI-powered resume builder designed to help you stand out and get hired faster.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/templates" style={{ color: 'inherit', textDecoration: 'none' }}>Templates</Link></li>
              <li><Link to="/ats-checker" style={{ color: 'inherit', textDecoration: 'none' }}>ATS Checker</Link></li>
              <li><Link to="/pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Legal</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Help Center</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
              <li><Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Sign In</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} Resumify Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
             <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
             <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
