import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ModuleCard from '@site/src/components/ModuleCard';
import QuickLinks from '@site/src/components/QuickLinks';
import InteractiveSection from '@site/src/components/InteractiveSection';
import RecentUpdates from '@site/src/components/RecentUpdates';
import modules from '@site/src/data/modules.json';
import ChatWidget from '@site/src/components/ChatWidget';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Comprehensive 13-week textbook for industry practitioners learning Physical AI and Humanoid Robotics"
    >
      <header className="hero hero--primary" style={{ padding: '60px 20px' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', // allows stacking on small screens
            gap: '20px',
          }}
        >
          {/* Left side: text */}
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
              style={{ marginTop: '20px', display: 'inline-block' }}
            >
              Start Reading →
            </Link>
          </div>

          {/* Right side: image (no box, no shadow) */}
          <div
            style={{
              flex: '1 1 250px',
              minWidth: '200px',
              textAlign: 'center',
              background: 'transparent',
              padding: 0,
            }}
          >
            <img
              src="/img/liftapp.png"
              alt="AI Book Cover"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: 0,
                objectFit: 'cover',
                transition: 'transform 0.45s ease, filter 0.45s ease',
                boxShadow: 'none',
                border: 'none',
                display: 'inline-block',
                animation: 'float 1s ease-in-out infinite',
                background: 'transparent',
              }}
            />
            <style>
              {`
                @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                  100% { transform: translateY(0px); }
                }

                img:hover {
                  transform: translateY(-6px) scale(1.03);
                  filter: drop-shadow(0 12px 24px rgba(0,0,0,0.08));
                }

                @media (max-width: 480px) {
                  img { animation: none; transform: none; }
                  img:hover { transform: none; filter: none; }
                }
              `}
            </style>
          </div>
        </div>
      </header>

      {/* ====== NEW: Highlights section (3 points) - placed right below the header ====== */}
      <section className="container highlights-section" aria-label="Why this book">
        <div className="highlights-inner">
          <div className="highlights-intro">
            <h3 className="highlights-title text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
              Why this textbook?🚀
            </h3>

            <div className="highlights-box">
              <p className="highlights-sub-upgraded">
                A <span className="highlight-keyword">practical and structured pathway</span> through <span className="highlight-keyword">Physical AI & Humanoid Robotics</span>, designed to take you from <span className="highlight-keyword">fundamentals</span> to <span className="highlight-keyword">real-world applications</span>.  
                Each module is carefully curated to include <span className="highlight-keyword">hands-on labs</span>, <span className="highlight-keyword">interactive simulations</span>, and <span className="highlight-keyword">industry-relevant projects</span>, so you can learn by doing while building a strong foundation for advanced humanoid robotics development.
              </p>
            </div>
          </div>

          <div className="highlights-grid" role="list">
            <article className="highlight-card" role="listitem" aria-labelledby="h1">
              <div className="highlight-icon">📘</div>
              <h4 id="h1" className="highlight-heading">Complete Curriculum</h4>
              <p className="highlight-text">From ROS 2 fundamentals to advanced humanoid control — structured for progressive learning.</p>
            </article>

            <article className="highlight-card" role="listitem" aria-labelledby="h2">
              <div className="highlight-icon">🤖</div>
              <h4 id="h2" className="highlight-heading">Hands-on Projects</h4>
              <p className="highlight-text">Practical labs and simulation exercises that bridge theory with real robotics workflows.</p>
            </article>

            <article className="highlight-card" role="listitem" aria-labelledby="h3">
              <div className="highlight-icon">🎯</div>
              <h4 id="h3" className="highlight-heading">Industry Ready</h4>
              <p className="highlight-text">Focus on tools and patterns used in research & industry — ready to take to real projects.</p>
            </article>
          </div>
        </div>
      </section>
      {/* ====== END Highlights section ====== */}

      <main>
        <div className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <div className="homepage-container">
            <div>
              <h2 className="modules-title">Explore the 4-Module Learning Path</h2>
              <p className="modules-subtitle">
                A hands-on curriculum guiding you from ROS 2 basics to VLA and humanoid robotics — with practical exercises and real-world examples.
              </p>

              <div className="module-grid">
                {modules.map((module, index) => (
                  <ModuleCard key={index} {...module} />
                ))}
              </div>
            </div>
            <div>
              <QuickLinks />
            </div>
          </div>
          <RecentUpdates />
        </div>

        <div>
          <InteractiveSection />
        </div>
      </main>
      <ChatWidget />
    </Layout>
  );
}
