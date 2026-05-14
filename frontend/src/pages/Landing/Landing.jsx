import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [showSupport, setShowSupport] = useState(false);

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
        <div style={{ textAlign: 'center', maxWidth: '850px', marginBottom: '4rem', marginTop: '5rem' }}>
          <div className="promo-badge-container" style={{ marginBottom: '2.5rem' }}>
            <span className="promo-badge">
              2 Months Free Premium Access
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
        <div className="hero-mockup-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '8rem', position: 'relative', perspective: '1000px' }}>

          {/* Animated background glow */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', background: 'rgba(99, 102, 241, 0.4)', filter: 'blur(100px)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.3)', filter: 'blur(120px)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite reverse' }}></div>

          <div className="card hero-mockup-card" style={{
            padding: '0.4rem',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 50px 100px -20px rgba(99, 102, 241, 0.35)',
            border: '1px solid rgba(255,255,255,0.3)',
            maxWidth: '880px', // Slightly more minimized for elegance
            margin: '0 auto',
            transform: 'rotateX(4deg) rotateY(-1deg)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ background: 'var(--surface)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--surface-border)', position: 'relative' }}>
              {/* Mac-style Browser Header */}
              <div style={{ height: '32px', background: 'var(--surface-border)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.5rem', opacity: 0.8 }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <div style={{ flex: 1, height: '18px', background: 'rgba(var(--bg-rgb), 0.5)', borderRadius: '4px', margin: '0 3rem' }}></div>
              </div>

              {/* Actual App Screenshot */}
              <img
                src="/app-mockup.png"
                alt="Resumify Builder Interface"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(1.02) brightness(1.02)'
                }}
              />

              {/* Subtle AI Badge Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'var(--primary)',
                color: 'white',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)',
                zIndex: 10
              }}>
                <span style={{ fontSize: '1rem' }}>✨</span>
                AI POWERED EDITOR
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
              { icon: '🚀', title: 'AI Enhancements', desc: 'Our AI intelligently rewrites your experiences to highlight your achievements and beat ATS filters.' },
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
              { name: 'Sarah Jenkins', role: 'Software Engineer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'Resumify helped me land my dream role at a top tech firm. The AI suggestions were spot on!' },
              { name: 'Michael Chen', role: 'Marketing Manager', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'The templates are incredibly modern and clean. I got 3x more interview callbacks.' },
              { name: 'Elena Rodriguez', role: 'UX Designer', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', quote: 'Finally a platform that respects design. The export quality is pixel-perfect.' }
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--surface-border)' }} />
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
          <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontWeight: 800 }}>Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>Everything you need to know about Resumify.</p>
          </div>
          <div className="faq-container">
            {[
              { q: 'Is it really free?', a: 'Yes! You can create and edit your resume using all AI features and premium templates for free. You only pay a small ₹9 fee to download resumes that use these premium features.' },
              { q: 'What is the "Try Before You Buy" model?', a: 'It means you get full access to the AI writer and all templates while building. We only charge you if you decide to download the final result using those features.' },
              { q: 'Can I download as PDF?', a: 'Yes, all plans allow for high-quality PDF downloads. Pro users get unlimited downloads without any per-resume fees.' },
              { q: 'Is my data secure?', a: 'Security is our priority. We use industry-standard encryption and never share your data with third parties.' }
            ].map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  {faq.q}
                  <div className="faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="faq-answer">
                  {faq.a}
                </div>
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
                  <div key={plan.id} className={`pricing-card ${isFeatured ? 'featured' : ''}`}>
                    {isFeatured && (
                      <div className="badge-popular" style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>Most Popular</div>
                    )}
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', textTransform: 'capitalize', color: isFeatured ? 'var(--primary)' : 'var(--text-main)' }}>{plan.name}</h3>
                    <div className="price">₹{plan.price}<span>/{period}</span></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                      {isFree ? 'Perfect for getting started.' : isPro ? 'Total career management.' : 'For active job seekers.'}
                    </p>
                    <ul className="feature-list">
                      {(plan.features || []).map((f, i) => {
                        const isNo = f.toLowerCase().includes('no');
                        return (
                          <li key={i} className={isNo ? 'disabled' : ''}>
                            <span style={{ color: isNo ? 'var(--text-muted)' : 'var(--primary)', fontWeight: 800 }}>
                              {isNo ? '✕' : '✓'}
                            </span>
                            {f}
                          </li>
                        );
                      })}
                      {plan.download_limit && <li><span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> {plan.download_limit} Downloads /mo</li>}
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
        {/* CTA Bottom Section */}
        <div className="cta-premium-section" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto 8rem auto', position: 'relative' }}>

          {/* Ambient Glows */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'var(--primary)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, opacity: 0.15 }}></div>

          <div style={{ background: 'var(--surface)', borderRadius: '32px', padding: '3.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.2)', zIndex: 1 }}>

            {/* Very light elegant background pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%236366f1\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', opacity: 0.8 }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <span style={{ fontSize: '1rem' }}>🚀</span> Start for free
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Ready to land your <br />
                <span className="text-gradient" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>dream job?</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6, fontWeight: 500 }}>
                Join 10,000+ professionals who have already built their careers with Resumify. Build a stunning resume in minutes.
              </p>

              <button onClick={() => navigate('/signup')} className="btn" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%)', color: '#ffffff', fontSize: '1.1rem', padding: '1rem 3rem', fontWeight: 800, borderRadius: '50px', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', transform: 'translateY(0)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(99, 102, 241, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)'; }}
              >
                Build Your Resume Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex' }}>
                  {['https://randomuser.me/api/portraits/women/44.jpg', 'https://randomuser.me/api/portraits/men/32.jpg', 'https://randomuser.me/api/portraits/women/68.jpg', 'https://randomuser.me/api/portraits/men/46.jpg', 'https://randomuser.me/api/portraits/women/12.jpg'].map((img, idx) => (
                    <img key={idx} src={img} alt="User avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--surface)', marginLeft: idx === 0 ? '0' : '-16px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ color: '#fbbf24', fontSize: '1rem', letterSpacing: '2px', marginBottom: '4px' }}>★★★★★</div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>Trusted by 10,000+ users</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support Section */}
        {showSupport && (
          <div id="support" style={{ 
            width: '100%', 
            marginBottom: '8rem', 
            maxWidth: '800px', 
            margin: '0 auto 8rem auto',
            animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontWeight: 800 }}>Help & <span className="text-gradient">Support</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>We're here to help you build your future. Reach out anytime.</p>
            </div>
            
            <div className="card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: '3rem 2rem',
              background: 'rgba(var(--bg-rgb), 0.5)',
              border: '2px solid var(--primary)',
              boxShadow: '0 20px 50px rgba(99, 102, 241, 0.15)'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onClick={() => window.location.href = 'mailto:resumifysupport@gmail.com'}
              >
                <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.33l-9 6.75-9-6.75V21H1.5c-.85 0-1.5-.65-1.5-1.5v-15c0-.4.15-.75.45-1.05.3-.3.65-.45 1.05-.45H3l9 6.75 9-6.75h1.5c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05z" fill="#EA4335"/>
                </svg>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact our Team</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>For technical issues, billing inquiries, or template requests.</p>
              
              <a 
                href="mailto:resumifysupport@gmail.com" 
                style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700, 
                  color: 'var(--primary)', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                resumifysupport@gmail.com
              </a>
            </div>
          </div>
        )}
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

        <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '5rem', position: 'relative' }}>
          <div className="footer-brand" style={{ gridColumn: 'span 2', minWidth: '280px' }}>
            <div className="footer-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>R</span>
              </div>
              <h2 className="text-gradient brand-logo">Resumify</h2>
            </div>
            <p style={{ maxWidth: '400px', lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              At Resumify, we believe everyone deserves a chance to land their dream job. Our AI-powered platform simplifies the resume-building process, combining professional design with data-driven optimization to help you stand out in the modern job market.
            </p>
            <div className="social-icon-container" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <a href="#" className="social-icon" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className="social-icon" title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
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
              <li><span 
                className="footer-link" 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setShowSupport(true);
                  setTimeout(() => {
                    document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >Help & Support</span></li>
              <li><a href="#" className="footer-link">Legal & Privacy</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1.75rem', fontSize: '1.1rem', fontWeight: 700 }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>Join our newsletter for career tips and template updates.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Email address"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  fontSize: '0.85rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <button className="btn btn-primary" style={{ padding: '0.6rem 1rem', minHeight: 'unset', fontSize: '0.85rem' }}>Go</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '2.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div>
              <h5 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Privacy Commitment</h5>
              <p>Your data is yours. We encrypt all personal information and never sell your data to third-party advertisers. We only use your information to improve your resume-building experience.</p>
            </div>
            <div>
              <h5 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Terms of Service</h5>
              <p>By using Resumify, you agree to our fair-use policy. We provide the tools to build resumes, but the final content responsibility lies with the user. Premium features are subject to our transparent pricing model.</p>
            </div>
            <div>
              <h5 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Cookie Usage</h5>
              <p>We use essential cookies to keep you logged in and functional cookies to remember your theme preferences. No invasive tracking cookies are used on our platform.</p>
            </div>
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

      <style>{`
        @keyframes promo-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .promo-badge {
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
          backdrop-filter: blur(10px);
          color: var(--primary);
          padding: 0.6rem 1.75rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          animation: promo-pulse 4s infinite ease-in-out;
          box-shadow: 0 4px 15px rgba(var(--primary-rgb, 99, 102, 241), 0.1);
          border: 1px solid rgba(var(--primary-rgb, 99, 102, 241), 0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .promo-icon {
          background: var(--primary);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: white;
          box-shadow: 0 2px 5px rgba(var(--primary-rgb, 99, 102, 241), 0.4);
        }

        .promo-badge-container {
          perspective: 1000px;
        }

        /* FAQ Enhanced Styles */
        .faq-item {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-xl);
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-sm);
        }
        
        .faq-item:hover {
          border-color: rgba(var(--primary-rgb, 99, 102, 241), 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        
        .faq-item.active {
          border-color: var(--primary);
          box-shadow: 0 8px 25px rgba(var(--primary-rgb, 99, 102, 241), 0.15);
        }
        
        .faq-question {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-main);
          user-select: none;
        }
        
        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
          color: var(--primary);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }
        
        .faq-item.active .faq-icon {
          background: var(--primary);
          color: white;
          transform: rotate(180deg);
        }
        
        .faq-answer {
          padding: 0 1.5rem;
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
          max-height: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-item.active .faq-answer {
          padding: 0 1.5rem 1.5rem 1.5rem;
          max-height: 300px;
          opacity: 1;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        .hero-mockup-card:hover .mockup-paper {
          transform: rotateY(0deg) rotateX(0deg) translateZ(40px) scale(1.02) !important;
          box-shadow: 0 35px 70px rgba(0,0,0,0.5) !important;
        }

        @media (max-width: 768px) {
          .mockup-sidebar { display: none !important; }
          .mockup-ai-box { display: none !important; }
          .mockup-paper { transform: scale(0.9) translateZ(0) !important; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
