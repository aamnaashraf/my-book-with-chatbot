import React from 'react';
import Link from '@docusaurus/Link';

export default function QuickLinks(): JSX.Element {
  const links = [
    { title: 'Workstation Setup', to: '/docs/setup/workstation' },
    { title: 'Edge Kit Setup', to: '/docs/setup/edge-kit' },
    { title: 'Cloud Setup', to: '/docs/setup/cloud' },
    { title: 'Glossary', to: '/docs/references/glossary' },
    { title: 'Module 1: ROS 2', to: '/docs/module-1-ros2' },
    { title: 'Module 2: Digital Twin', to: '/docs/module-2-digital-twin' },
    { title: 'Module 3: Isaac Sim', to: '/docs/module-3-isaac' },
    { title: 'Module 4: VLA & Humanoids', to: '/docs/module-4-vla-humanoids' },
  ];

  return (
    <div className="quick-links-sidebar">
      <h3>Quick Links</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
