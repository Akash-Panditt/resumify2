import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/payments/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
      <Navbar />

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
        <div style={{ textAlign: 'center', maxWidth: '850px', marginBottom: '4rem', marginTop: '3rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <span className="badge badge-purple" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              ✨ The #1 AI Resume Builder for 2024
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 4.8rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 800 }}>
            Land Your <span className="text-gradient">Dream Job</span> Faster with AI.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            Create ATS-winning resumes in minutes. Resumify combines professional design with advanced AI to help you stand out to top recruiters.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.15rem', padding: '0.85rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              Get Started Free (Pay Only When Download)
            </button>
            <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="btn btn-secondary" style={{ fontSize: '1.15rem', padding: '0.85rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              See How It Works
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', opacity: 0.6 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>10k+ Happy Users</span>
             </div>
             <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>✓ ATS Friendly</div>
             <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>✓ No Credit Card Required</div>
          </div>
        </div>

        {/* Hero Image / Mockup */}
        <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '8rem', position: 'relative' }}>
           <div className="card" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)' }}>
              <div style={{ background: 'var(--bg-color)', borderRadius: '20px', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', top: '40px', left: '40px', width: '200px', height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}></div>
                 <div style={{ position: 'absolute', top: '80px', right: '40px', width: '600px', height: '400px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--surface-border)', padding: '2rem' }}>
                    <div style={{ width: '150px', height: '20px', background: 'var(--primary)', borderRadius: '4px', marginBottom: '1.5rem', opacity: 0.3 }}></div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--text-muted)', borderRadius: '2px', marginBottom: '0.75rem', opacity: 0.1 }}></div>
                    <div style={{ width: '90%', height: '10px', background: 'var(--text-muted)', borderRadius: '2px', marginBottom: '0.75rem', opacity: 0.1 }}></div>
                    <div style={{ width: '95%', height: '10px', background: 'var(--text-muted)', borderRadius: '2px', marginBottom: '2rem', opacity: 0.1 }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                       <div style={{ height: '100px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' }}></div>
                       <div style={{ height: '100px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' }}></div>
                    </div>
                 </div>
                 <div style={{ zIndex: 2, textAlign: 'center' }}>
                    <div className="badge-popular" style={{ marginBottom: '1rem' }}>AI Powered Preview</div>
                    <p style={{ fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '2px' }}>INTERACTIVE BUILDER</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Trust Section */}
        <div style={{ width: '100%', marginBottom: '8rem', textAlign: 'center' }}>
           <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '2.5rem' }}>Our users have landed jobs at</p>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.4, filter: 'grayscale(1)' }}>
              {['Google', 'Amazon', 'Meta', 'Netflix', 'Microsoft'].map(name => (
                <span key={name} style={{ fontSize: '1.5rem', fontWeight: 900 }}>{name}</span>
              ))}
           </div>
        </div>

        {/* Features Section */}
        <div id="features" style={{ width: '100%', marginBottom: '8rem' }}>
          <div className="section-title">
            <h2 style={{ fontWeight: 800 }}>Powerful Features to <span className="text-gradient">Elevate</span> Your Career</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Everything you need to build a professional presence.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: '✨', title: 'AI Enhancements', desc: 'Our AI intelligently rewrites your experiences to highlight your achievements and beat ATS filters.' },
              { icon: '🎨', title: 'Premium Templates', desc: 'Choose from a curated collection of modern templates designed by recruitment experts.' },
              { icon: '⚡', title: 'Live Preview', desc: 'See your changes in real-time as you build. Pixel-perfect accuracy from start to finish.' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your data is secure and never sold. You have full control over your professional information.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Build and edit your resume on any device. Your progress is synced everywhere.' },
              { icon: '📄', title: 'PDF Export', desc: 'One-click export to professional PDF format, ready to send to any recruiter.' }
            ].map((f, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem 2rem', border: '1px solid var(--surface-border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div style={{ width: '100%', marginBottom: '8rem' }}>
          <div className="section-title">
            <h2 style={{ fontWeight: 800 }}>Loved by <span className="text-gradient">Professionals</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>See what our community has to say about their success.</p>
          </div>
          <div className="grid-3">
            {[
              { name: 'Sarah Jenkins', role: 'Software Engineer', quote: 'Resumify helped me land my dream role at a top tech firm. The AI suggestions were spot on!' },
              { name: 'Michael Chen', role: 'Marketing Manager', quote: 'The templates are incredibly modern and clean. I got 3x more interview callbacks.' },
              { name: 'Elena Rodriguez', role: 'UX Designer', quote: 'Finally a builder that respects design. The export quality is pixel-perfect.' }
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.2 }}></div>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: 0 }}>{t.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ width: '100%', marginBottom: '8rem', maxWidth: '800px', margin: '0 auto 8rem auto' }}>
          <div className="section-title">
            <h2 style={{ fontWeight: 800 }}>Frequently Asked <span className="text-gradient">Questions</span></h2>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--surface-border)' }}>
            {[
              { q: 'Is it really free?', a: 'Yes! You can create and edit your resume using all AI features and premium templates for free. You only pay a small ₹9 fee to download resumes that use these premium features.' },
              { q: 'What is the "Try Before You Buy" model?', a: 'It means you get full access to the AI writer and all templates while building. We only charge you if you decide to download the final result using those features.' },
              { q: 'Can I download as PDF?', a: 'Yes, all plans allow for high-quality PDF downloads. Pro users get unlimited downloads without any per-resume fees.' },
              { q: 'Is my data secure?', a: 'Security is our priority. We use industry-standard encryption and never share your data with third parties.' }
            ].map((faq, i) => (
              <div key={i} className="faq-item" style={i === 3 ? { border: 'none' } : {}}>
                <div className="faq-question">
                   {faq.q}
                   <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>+</span>
                </div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" style={{ width: '100%', marginBottom: '8rem' }}>
          <div className="section-title">
            <h2 style={{ fontWeight: 700 }}>Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find the perfect plan for your career stage.</p>
          </div>
          {loadingPlans ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading plans...</div>
          ) : (
            <div className="responsive-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {plans.map((plan) => {
                const isFeatured = plan.name?.toLowerCase() === 'basic';
                const isPro = plan.name?.toLowerCase() === 'pro';
                const isFree = plan.price === 0;
                
                const period = isFree ? 'forever' : (isPro ? 'year' : 'mo');
                
                return (
                  <div key={plan.id} className={`pricing-card ${isFeatured ? 'featured' : ''}`} style={isFeatured ? { transform: 'scale(1.05)', borderColor: 'var(--primary)' } : {}}>
                    {isFeatured && (
                      <div className="badge-popular" style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>Most Popular</div>
                    )}
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{plan.name}</h3>
                    <div className="price">₹{plan.price}<span>/{period}</span></div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      {isFree ? 'Perfect for getting started.' : isPro ? 'Total career management.' : 'For active job seekers.'}
                    </p>
                    <ul className="feature-list">
                      {(plan.features || []).map((f, i) => (
                        <li key={i} className={f.toLowerCase().includes('no') ? 'disabled' : ''}>{f}</li>
                      ))}
                      {plan.download_limit && <li>{plan.download_limit} Downloads /mo</li>}
                    </ul>
                    <button onClick={() => navigate('/signup')} className={`btn ${isFeatured ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', marginTop: 'auto' }}>
                      {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA Bottom Section */}
        <div style={{ width: '100%', textAlign: 'center', padding: '6rem 2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', borderRadius: 'var(--radius-2xl)', marginBottom: '8rem', border: '1px solid var(--surface-border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 800 }}>Ready to land your <span className="text-gradient">dream job?</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>Join 10,000+ professionals who have already built their careers with Resumify.</p>
            <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3.5rem', borderRadius: 'var(--radius-full)' }}>
              Build Your Resume Now
            </button>
          </div>
        </div>

      </main>

      <footer style={{ 
        borderTop: '1px solid var(--surface-border)', 
        padding: '6rem 2rem 3rem 2rem', 
        background: 'rgba(var(--bg-rgb), 0.8)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '5rem', position: 'relative' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
               <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>R</span>
               </div>
               <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.75rem' }}>Resumify</h2>
            </div>
            <p style={{ maxWidth: '350px', lineHeight: 1.7, fontSize: '1rem', color: 'var(--text-muted)' }}>
              Empowering professionals to land their dream jobs with AI-driven resume optimization and premium templates.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
               <a href="#" className="social-icon" title="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
               </a>
               <a href="#" className="social-icon" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
               </a>
               <a href="#" className="social-icon" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
               </a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.75rem', fontSize: '1.1rem', fontWeight: 700 }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/templates" className="footer-link">Templates</Link></li>
              <li><Link to="/ats-checker" className="footer-link">ATS Checker</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><a href="#" className="footer-link">AI Cover Letter</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.75rem', fontSize: '1.1rem', fontWeight: 700 }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Legal & Privacy</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.75rem', fontSize: '1.1rem', fontWeight: 700 }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Contact Sales</a></li>
              <li><Link to="/login" className="footer-link">Sign In</Link></li>
              <li><a href="#" className="footer-link">API Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Resumify Inc. Crafted with ❤️ for job seekers.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
             <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
             <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Terms of Service</a>
             <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
