import React from 'react';

function LandingPage({ onLaunch, onGetStarted }) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-brand">
          <span className="landing-logo">🌩️</span>
          <span className="landing-title">Risk Optima AI</span>
        </div>
        <nav className="landing-menu">
          <a href="#home" className="landing-menu-item">Home</a>
          <a href="#features" className="landing-menu-item">Features</a>
          <a href="#dashboard" className="landing-menu-item">Dashboard</a>
          <a href="#docs" className="landing-menu-item">Documentation</a>
          <a href="#contact" className="landing-menu-item">Contact</a>
        </nav>
        <div className="landing-cta">
          <button className="btn btn-primary" onClick={onLaunch}>
            Launch Dashboard
          </button>
        </div>
      </header>

      <main className="landing-hero" id="home">
        <div className="hero-content">
          <h1>Optimize Project Risk with Intelligent Cloud Insights</h1>
          <p>
            Risk Optima AI helps project managers and cloud teams monitor project risks,
            forecast delays, and optimize cloud resource usage through intelligent analytics.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={onLaunch}>
              View Dashboard
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-mock">
            <div className="dashboard-mock-header" />
            <div className="dashboard-mock-grid">
              <div className="dashboard-mock-card" />
              <div className="dashboard-mock-card" />
              <div className="dashboard-mock-card" />
              <div className="dashboard-mock-card" />
            </div>
          </div>
        </div>
      </main>

      <section className="landing-section" id="features">
        <h2 className="section-title">Features</h2>
        <p className="section-subtitle">
          Powerful analytics designed for modern cloud teams and project leaders.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Risk Monitoring</h3>
            <p>
              Analyze project inputs and operational metrics to identify potential risks early.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Delay Prediction</h3>
            <p>
              Estimate the probability of delays based on project complexity and resource allocation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Profit Forecasting</h3>
            <p>
              Evaluate projected profitability and cost efficiency across project operations.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Resource Optimization</h3>
            <p>
              Detect idle instances and unused storage resources to reduce cloud infrastructure waste.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section" id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Enter Data</h4>
            <p>Enter project and cloud usage data.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Analyze</h4>
            <p>The system analyzes the data to evaluate project performance indicators.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Decide</h4>
            <p>The dashboard presents clear insights for project managers to make better decisions.</p>
          </div>
        </div>
      </section>

      <section className="landing-section" id="dashboard">
        <h2 className="section-title">Dashboard Preview</h2>
        <p className="section-subtitle">
          Get a quick look at the analytics your team will rely on.
        </p>

        <div className="preview-grid">
          <div className="preview-card">
            <h4>Project Risk Level</h4>
            <p>Medium risk detected across current initiatives.</p>
          </div>
          <div className="preview-card">
            <h4>Delay Probability</h4>
            <p>Estimated 40% chance of schedule slips.</p>
          </div>
          <div className="preview-card">
            <h4>Profit Forecast</h4>
            <p>Projected profit sits at 18% if timelines are met.</p>
          </div>
          <div className="preview-card">
            <h4>Cloud Resource Waste</h4>
            <p>Idle instances and unused storage are increasing costs.</p>
          </div>
          <div className="preview-card">
            <h4>Executive Summary</h4>
            <p>Manage risk and optimize resources to hit your outcome targets.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta" id="contact">
        <h2>Start Optimizing Your Projects Today</h2>
        <button className="btn btn-primary" onClick={onLaunch}>
          Open Dashboard
        </button>
      </section>

      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#docs">Documentation</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#docs">API Docs</a>
            <a href="#contact">Support</a>
            <a href="#contact">Community</a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#contact">About</a>
            <a href="#contact">Careers</a>
            <a href="#contact">Legal</a>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="mailto:support@riskoptima.ai">support@riskoptima.ai</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Risk Optima AI</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
