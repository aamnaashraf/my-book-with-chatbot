import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

export interface CodeExampleProps {
  /** Programming language for syntax highlighting */
  language: 'python' | 'bash' | 'xml' | 'yaml' | 'json';

  /** Code content to display (skeleton version) */
  children: string;

  /** Optional complete solution code (enables "View Solution" button) */
  solutionCode?: string;

  /** File name to display in header */
  filename?: string;

  /** Unique identifier for linking (e.g., "chapter3-minimal-publisher") */
  id?: string;

  /** Difficulty level (shows badge) */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

  /** Estimated time to complete in minutes (shows badge) */
  estimatedTime?: number;

  /** Array of related concepts with links */
  relatedConcepts?: string[];

  /** Show line numbers in gutter */
  showLineNumbers?: boolean;

  /** Highlight specific lines (e.g., [5, 12, 15] or ranges [12-15]) */
  highlightLines?: number[];

  /** Title to display above code block */
  title?: string;

  /** Additional CSS class names */
  className?: string;
}

export default function CodeExample({
  language,
  children,
  solutionCode,
  filename,
  id,
  difficulty,
  estimatedTime,
  relatedConcepts,
  showLineNumbers = true,
  highlightLines = [],
  title,
  className = '',
}: CodeExampleProps): JSX.Element | null {
  const [showingSolution, setShowingSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  // Validation
  if (!language || !children) {
    console.error('CodeExample: language and children are required');
    return null;
  }

  if (solutionCode && solutionCode === children) {
    console.warn('CodeExample: solutionCode is identical to children (skeleton). Solution toggle hidden.');
  }

  if (estimatedTime && estimatedTime < 5) {
    console.warn(`CodeExample: estimatedTime (${estimatedTime}) should be ≥ 5 minutes`);
  }

  const currentCode = showingSolution && solutionCode ? solutionCode : children;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code. Please manually select and copy.');
    }
  };

  const getDifficultyClass = (level: string) => {
    const classes: Record<string, string> = {
      beginner: 'code-example__badge--beginner',
      intermediate: 'code-example__badge--intermediate',
      advanced: 'code-example__badge--advanced',
    };
    return classes[level] || '';
  };

  return (
    <div
      className={`code-example ${className}`}
      role="region"
      aria-label={`Code example: ${filename || title || 'untitled'}`}
      id={id}
    >
      {/* Header */}
      <div className="code-example__header">
        <div className="code-example__meta">
          {filename && (
            <span className="code-example__filename">{filename}</span>
          )}
          {title && !filename && (
            <span className="code-example__title">{title}</span>
          )}
          <div className="code-example__badges">
            {difficulty && (
              <span
                className={`code-example__badge ${getDifficultyClass(difficulty)}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            )}
            {estimatedTime && (
              <span className="code-example__badge code-example__badge--time">
                ⏱ ~{estimatedTime} min
              </span>
            )}
          </div>
        </div>
        <div className="code-example__actions">
          {solutionCode && solutionCode !== children && (
            <button
              className="code-example__button"
              onClick={() => setShowingSolution(!showingSolution)}
              aria-label={
                showingSolution
                  ? 'View skeleton code'
                  : 'View complete solution'
              }
            >
              {showingSolution ? 'View Skeleton' : 'View Solution'}
            </button>
          )}
          <button
            className="code-example__button"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <Highlight theme={themes.vsDark} code={currentCode.trim()} language={language}>
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${highlightClassName} code-example__content`} style={style}>
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlightLines.includes(lineNumber);
              const lineProps = getLineProps({ line });

              return (
                <div
                  key={i}
                  {...lineProps}
                  className={`${lineProps.className} ${
                    isHighlighted ? 'highlight-line' : ''
                  }`}
                >
                  {showLineNumbers && (
                    <span className="code-example__line-number">{lineNumber}</span>
                  )}
                  <span className="code-example__line-content">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>

      {/* Related Concepts */}
      {relatedConcepts && relatedConcepts.length > 0 && (
        <div className="code-example__related">
          <strong>Related:</strong>{' '}
          {relatedConcepts.map((concept, i) => (
            <span key={i}>
              {concept}
              {i < relatedConcepts.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
