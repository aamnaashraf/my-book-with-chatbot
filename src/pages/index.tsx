import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ModuleCard from '@site/src/components/ModuleCard';
import QuickLinks from '@site/src/components/QuickLinks';
import RecentUpdates from '@site/src/components/RecentUpdates';

import modules from '@site/src/data/modules.json';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Comprehensive 13-week textbook for industry practitioners learning Physical AI and Humanoid Robotics">
      <header className={clsx('hero hero--primary')}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Start Learning →
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="container" style={{marginTop: '3rem', marginBottom: '3rem'}}>
          <div className="homepage-container">
            <div>
               <h2 className="modules-title">Explore the 4-Module Learning Path</h2>
    <p className="modules-subtitle">
      A hands-on curriculum — from ROS 2 basics to VLA & humanoid integration.
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
      </main>
    </Layout>
  );
}
