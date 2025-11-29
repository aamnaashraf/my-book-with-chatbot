import React from 'react';
import Link from '@docusaurus/Link';

interface ModuleCardProps {
  id: string;
  title: string;
  weekRange: string;
  description: string;
  learningOutcomes: string[];
}

export default function ModuleCard({
  id,
  title,
  weekRange,
  description,
  learningOutcomes,
}: ModuleCardProps): JSX.Element {
  return (
    <Link to={`/docs/${id}/`} className="module-card" style={{textDecoration: 'none'}}>
      <div className="week-range">{weekRange}</div>
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div className="learning-outcomes">
        <strong>Learning Outcomes:</strong>
        <ul>
          {learningOutcomes.slice(0, 3).map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
