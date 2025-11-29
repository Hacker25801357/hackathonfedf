import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-nav">
          <div className="logo">📚 Educational Library</div>
          <div className="nav-links">
            {isAuthenticated ? (
              <Link to={isAdmin() ? '/admin' : '/dashboard'} className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hero-section">
        <h1 className="hero-title">Welcome to Educational Resource Library</h1>
        <p className="hero-subtitle">
          Access thousands of educational resources including textbooks, research papers, 
          study guides, and more. All in one place.
        </p>
        
        {!isAuthenticated && (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Sign In
            </Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Vast Collection</h3>
            <p>Access thousands of educational resources across multiple subjects and disciplines</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>Find exactly what you need with powerful search and filtering options</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>User Ratings</h3>
            <p>See what other learners think with our community rating and feedback system</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Easy Downloads</h3>
            <p>Download resources instantly and access them anytime, anywhere</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>Join our community of learners today</p>
        {!isAuthenticated && (
          <Link to="/register" className="btn btn-primary btn-large">
            Create Free Account
          </Link>
        )}
      </div>

      <footer className="home-footer">
        <p>&copy; 2025 Educational Resource Library. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
