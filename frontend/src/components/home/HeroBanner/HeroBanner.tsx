import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './HeroBanner.css';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  onCtaClick?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  backgroundVideo,
  onCtaClick
}) => {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('#categories');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-background">
        {backgroundVideo ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="hero-image"
            style={{
              backgroundImage: `url(${backgroundImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80'})`
            }}
          />
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Todo en tecnología al mejor precio
            </h1>
            <p className="hero-subtitle">
              Celulares, PCs, software original y más. Descubre la mejor tecnología
              con garantía y soporte técnico especializado.
            </p>
            <Link to="/products"
              className="hero-cta-btn"
              onClick={onCtaClick}
            >
              Ver catálogo
              <ArrowRight className="hero-cta-icon" size={20} />
            </Link>

          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={handleScrollDown}>
        <ChevronDown className="scroll-arrow" size={24} />
      </div>
    </section>
  );
};

export default HeroBanner;