import React from 'react';

interface Update {
  date: string;
  title: string;
  description: string;
}

export default function RecentUpdates(): JSX.Element {
  // Placeholder updates - in production, this would come from a data source
  const updates: Update[] = [
    {
      date: '2025-11-29',
      title: 'Textbook Structure Initialized',
      description: 'Complete textbook structure with 4 modules and dashboard homepage is now live.',
    },
    {
      date: '2025-11-29',
      title: 'Setup Guides Available',
      description: 'Hardware setup guides for Workstation, Edge Kit, and Cloud are now available.',
    },
  ];

  return (
    <div className="recent-updates">
      <h3>Recent Updates</h3>
      {updates.map((update, index) => (
        <div key={index} className="update-item">
          <div className="date">{update.date}</div>
          <div className="title">{update.title}</div>
          <div className="description">{update.description}</div>
        </div>
      ))}
    </div>
  );
}
