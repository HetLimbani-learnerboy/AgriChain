import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [showAbout, setShowAbout] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShowAbout(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const savedY = sessionStorage.getItem('scrollY');
        if (savedY) window.scrollTo(0, parseInt(savedY, 10));

        const handleUnload = () => sessionStorage.setItem('scrollY', window.scrollY);
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const team = [
        { name: 'Het Limbani', role: 'Project Lead & FrontendWebAPP-Backend Developer' },
        { name: 'Abhi Patel', role: 'BlockChain Developer' },
        { name: 'Anuj Raval', role: 'Blockchain Developer' },
        { name: 'Tirtha Jhaveri', role: 'Frontend-APP Developer' },
        { name: 'Harsh Patel', role: 'FrontendWebAPP-Backend Developer' },
        { name: 'Meet Babariya', role: 'Frontend-APP Developer' },
    ];

    return (
        <div className="landing-wrapper">
            {/* ---------- HERO ---------- */}
            <section className="hero-box">
                <img src="/MainLogo.png" alt="logo" className="logo-landingpage" />
                <h1 className="hero-title">Welcome to AgriChain 🔗</h1>
                <p className="hero-tagline">
                    <span className="typewriter-text">
                        Track the supply chain from farm to fork with transparency.
                    </span>
                </p>

                <div className="auth-btn-group">
                    <button className="hero-btn" onClick={() => navigate('/siginpage')}>Sign In</button>
                    <button className="hero-btn" onClick={() => navigate('/signuppage')}>Sign Up</button>
                    <button className="hero-btn" onClick={() => navigate('/maindashboardpage')}>Get Started</button>
                </div>
            </section>

            <section
                ref={aboutRef}
                className={`about-area ${showAbout ? 'show' : ''}`}
            >
                <h2>About Us</h2>
                <p>Meet the dedicated team behind AgriChain, driving transparency in agriculture.</p>
                <div className="team-grid">
                    {team.map((member) => (
                        <div key={member.name} className="team-member-card">
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer-bar">
                <p>© 2025 AgriChain. All Rights Reserved.</p>
                <button className="footer-link" onClick={() => navigate('/contactuspage')}>Contact Us</button>
                <button className="footer-link" onClick={scrollToAbout}>About Us</button>
                <button className="footer-link" onClick={() => navigate('/helpdeskpage')}>Help Desk</button>
            </footer>
        </div>
    );
};

export default LandingPage;
