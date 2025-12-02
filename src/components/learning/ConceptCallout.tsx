import React from 'react';

export interface ConceptCalloutProps {
  /** Type of callout (determines icon and color) */
  type: 'definition' | 'concept' | 'tip' | 'warning' | 'danger';

  /** Callout title (optional, defaults based on type) */
  title?: string;

  /** Callout content */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string;
}

const defaultTitles: Record<string, string> = {
  definition: 'Definition',
  concept: 'Concept',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
};

const icons: Record<string, string> = {
  definition: '📖',
  concept: '💡',
  tip: '💡',
  warning: '⚠️',
  danger: '🚨',
};

export default function ConceptCallout({
  type,
  title,
  children,
  className = '',
}: ConceptCalloutProps): JSX.Element | null {
  // Validation
  if (!type || !['definition', 'concept', 'tip', 'warning', 'danger'].includes(type)) {
    console.error(`ConceptCallout: invalid type "${type}"`);
    return null;
  }

  if (!children) {
    console.warn('ConceptCallout: empty children');
    return null;
  }

  const displayTitle = title || defaultTitles[type];

  return (
    <aside
      className={`concept-callout concept-callout--${type} ${className}`}
      role="note"
      aria-label={displayTitle}
    >
      <div className="concept-callout__header">
        <span className="concept-callout__icon" aria-hidden="true">
          {icons[type]}
        </span>
        <strong className="concept-callout__title">{displayTitle}</strong>
      </div>
      <div className="concept-callout__content">{children}</div>
    </aside>
  );
}
