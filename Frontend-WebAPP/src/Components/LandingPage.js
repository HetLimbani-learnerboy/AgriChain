import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Particle = ({ style }) => <div className="particle" style={style}></div>;

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    { name: 'Het Limbani', role: 'Project Lead & Full-Stack Developer' },
    { name: 'Abhi Patel', role: 'Blockchain Developer' },
    { name: 'Anuj Raval', role: 'Blockchain Developer' },
    { name: 'Tirtha Jhaveri', role: 'Mobile App Developer' },
    { name: 'Harsh Patel', role: 'Full-Stack Developer' },
    { name: 'Meet Babariya', role: 'Mobile App Developer' },
  ];

  const processSteps = [
    { title: 'Cultivation', description: 'Farmers register their produce, creating the first digital link in the chain.' },
    { title: 'Processing', description: 'Processors log every step, from cleaning to packaging, ensuring quality control.' },
    { title: 'Distribution', description: 'Distributors track shipments in real-time, maintaining the integrity of the supply line.' },
    { title: 'Retail', description: 'Retailers provide consumers with a scannable QR code for full product history.' }
  ];

  const particles = Array.from({ length: 50 }).map((_, i) => {
    const style = {
      '--x': `${Math.random() * 100}vw`,
      '--y': `${Math.random() * 100}vh`,
      '--s': `${Math.random() * 0.5 + 0.5}`,
      '--d': `${Math.random() * 20 + 10}s`,
    };
    return <Particle key={i} style={style} />;
  });

  return (
    <div className="landing-wrapper">
      <section className="hero-box">
        <div className="particle-container">{particles}</div>
        <div className="hero-content">
          <img src="/MainLogo.png" alt="AgriChain Logo" className="logo-landingpage" />
          <h1 className="hero-title">Welcome to AgriChain 🔗</h1>
          <p className="hero-tagline">
            <span className="typewriter-text">
              Track the supply chain from farm to fork with transparency.
            </span>
          </p>
          <p className="hero-description">
            AgriChain leverages blockchain to bring radical transparency to the agricultural supply chain.
          </p>
          <div className="auth-btn-group">
            <button className="hero-btn primary" onClick={() => navigate('/dashboard')}>Get Started</button>
            <button className="hero-btn" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="hero-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </section>

      <section className="how-it-works-area">
        <h2 className="section-title">How AgriChain Works 🚀</h2>
        <p className="section-subtitle">A simple, four-step process to ensure complete transparency.</p>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div key={step.title} className="process-card" style={{ '--delay': `${index * 0.15}s` }}>
              <div className="process-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-area">
        <h2 className="section-title">Meet the Innovators</h2>
        <p className="section-subtitle">The dedicated team building the future of agricultural transparency.</p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={member.name} className="team-member-card" style={{ '--delay': `${index * 0.1}s` }}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-bar">
        <p>© 2025 AgriChain. All Rights Reserved.</p>
        <div className="footer-links">
          <button className="footer-link" onClick={() => navigate('/contactuspage')}>Contact Us</button>
          <button className="footer-link" onClick={() => navigate('/helpdeskpage')}>Help Desk</button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
