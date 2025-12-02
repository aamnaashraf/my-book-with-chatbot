# Component Contract: ROSVersionBadge

**Feature**: 005-module-1-ros2-chapters
**Component Path**: `src/components/learning/ROSVersionBadge.tsx`
**Purpose**: Inline badge displaying ROS 2 distribution version to clarify content versioning

---

## 1. Overview

The `ROSVersionBadge` component displays a small, inline badge indicating the ROS 2 distribution version. This helps readers understand which ROS 2 version the content targets, avoiding confusion with other distributions (Foxy, Iron, Rolling, etc.).

**Use Case**: First mention of ROS 2 in each chapter, or when discussing version-specific features.

**Priority**: P3 (Low) — Nice-to-have, not critical for MVP.

---

## 2. Props Interface

```typescript
export interface ROSVersionBadgeProps {
  /** ROS 2 distribution name */
  distribution?: 'humble' | 'foxy' | 'iron' | 'rolling';

  /** Display format */
  format?: 'short' | 'long';

  /** Additional CSS class names */
  className?: string;
}
```

---

## 3. Validation Rules

### Required Props
- None (all props optional)

### Optional Props
- `distribution`: Defaults to `'humble'` (per spec: Module 1 uses Humble exclusively)
- `format`: Defaults to `'short'` (e.g., "ROS 2 Humble")

### Business Rules
- `format='short'`: "ROS 2 Humble"
- `format='long'`: "ROS 2 Humble Hawksbill (LTS)"

---

## 4. Usage Examples

### Example 1: Short Format (Default)

```mdx
This chapter covers <ROSVersionBadge /> concepts applicable to all LTS distributions.
```

**Renders**:
```
This chapter covers [ROS 2 Humble] concepts applicable to all LTS distributions.
```
(Inline badge with blue background, white text)

### Example 2: Long Format

```mdx
<ROSVersionBadge format="long" /> is the recommended distribution for production systems.
```

**Renders**:
```
[ROS 2 Humble Hawksbill (LTS)] is the recommended distribution for production systems.
```

### Example 3: Explicit Distribution

```mdx
Note: This feature was introduced in <ROSVersionBadge distribution="iron" /> and is not available in earlier versions.
```

**Renders**:
```
Note: This feature was introduced in [ROS 2 Iron] and is not available in earlier versions.
```

---

## 5. Component Behavior

### 5.1 Distribution Mappings

```typescript
const distributions = {
  humble: {
    name: 'Humble Hawksbill',
    shortName: 'Humble',
    releaseDate: 'May 2022',
    eolDate: 'May 2027',
    lts: true,
    color: '#00aeef', // ROS 2 blue
  },
  foxy: {
    name: 'Foxy Fitzroy',
    shortName: 'Foxy',
    releaseDate: 'June 2020',
    eolDate: 'May 2023',
    lts: true,
    color: '#ff6f00',
  },
  iron: {
    name: 'Iron Irwini',
    shortName: 'Iron',
    releaseDate: 'May 2023',
    eolDate: 'November 2024',
    lts: false,
    color: '#607d8b',
  },
  rolling: {
    name: 'Rolling Ridley',
    shortName: 'Rolling',
    releaseDate: 'June 2020',
    eolDate: 'Continuous',
    lts: false,
    color: '#9c27b0',
  },
};
```

### 5.2 Rendering Logic

```typescript
const distribution = distributions[props.distribution || 'humble'];
const displayText = props.format === 'long'
  ? `ROS 2 ${distribution.name}${distribution.lts ? ' (LTS)' : ''}`
  : `ROS 2 ${distribution.shortName}`;

return (
  <span
    className="ros-version-badge"
    style={{ backgroundColor: distribution.color }}
    role="img"
    aria-label={`ROS 2 ${distribution.name} distribution`}
  >
    {displayText}
  </span>
);
```

### 5.3 Accessibility

**ARIA Attributes**:
```tsx
<span
  className="ros-version-badge"
  role="img"
  aria-label={`ROS 2 ${distribution.name} distribution`}
>
  {displayText}
</span>
```

**Screen Reader Behavior**:
- Announces: "ROS 2 Humble Hawksbill distribution"

### 5.4 Visual Design

**CSS Classes**:
```css
.ros-version-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  vertical-align: middle;
  margin: 0 0.25rem;
}

/* Distribution-specific colors */
.ros-version-badge--humble {
  background-color: #00aeef;
}

.ros-version-badge--foxy {
  background-color: #ff6f00;
}

.ros-version-badge--iron {
  background-color: #607d8b;
}

.ros-version-badge--rolling {
  background-color: #9c27b0;
}

/* Hover tooltip (optional) */
.ros-version-badge:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 1000;
  margin-top: 0.25rem;
}
```

**Tooltip Data** (optional enhancement):
```tsx
<span
  className="ros-version-badge"
  data-tooltip={`Released: ${distribution.releaseDate} | EOL: ${distribution.eolDate}`}
>
  {displayText}
</span>
```

---

## 6. Error Handling

### Invalid Props
```typescript
if (props.distribution && !distributions[props.distribution]) {
  console.warn(`ROSVersionBadge: unknown distribution "${props.distribution}"`);
  // Fallback to 'humble'
}
```

---

## 7. Testing Requirements

### Unit Tests

```typescript
describe('ROSVersionBadge', () => {
  it('renders with default distribution (humble)', () => {
    render(<ROSVersionBadge />);
    expect(screen.getByText(/Humble/)).toBeInTheDocument();
  });

  it('renders short format by default', () => {
    render(<ROSVersionBadge />);
    expect(screen.getByText('ROS 2 Humble')).toBeInTheDocument();
  });

  it('renders long format with LTS indicator', () => {
    render(<ROSVersionBadge format="long" />);
    expect(screen.getByText(/Humble Hawksbill \(LTS\)/)).toBeInTheDocument();
  });

  it('renders different distributions', () => {
    const { rerender } = render(<ROSVersionBadge distribution="iron" />);
    expect(screen.getByText(/Iron/)).toBeInTheDocument();

    rerender(<ROSVersionBadge distribution="foxy" />);
    expect(screen.getByText(/Foxy/)).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<ROSVersionBadge />);
    const badge = screen.getByRole('img', { name: /ROS 2 Humble Hawksbill distribution/ });
    expect(badge).toBeInTheDocument();
  });

  it('applies correct CSS class for distribution', () => {
    const { container } = render(<ROSVersionBadge distribution="humble" />);
    expect(container.querySelector('.ros-version-badge--humble')).toBeInTheDocument();
  });
});
```

---

## 8. Dependencies

**NPM Packages**:
- `react@^18.3.1`
- `react-dom@^18.3.1`

**Internal Dependencies**:
- `@site/src/css/custom.css`

---

## 9. Implementation Checklist

- [ ] Create component file: `src/components/learning/ROSVersionBadge.tsx`
- [ ] Define TypeScript interface
- [ ] Implement distribution mappings
- [ ] Style component (CSS)
- [ ] Add ARIA attributes
- [ ] Write unit tests
- [ ] Update `src/theme/MDXComponents.tsx`
- [ ] Document in `quickstart.md` (already done)
- [ ] Test in Chapter 1 (first ROS 2 mention)

---

## 10. Related Contracts

- None (standalone component)

---

## 11. Future Enhancements

- [ ] **Tooltip**: Hover to show release date, EOL date, Ubuntu version
- [ ] **Comparison**: Click to show comparison table of distributions
- [ ] **Auto-detection**: Read distribution from docusaurus.config.js

---

## 12. Design Decision: Why This Component?

**Problem**: Students may confuse ROS 1 vs. ROS 2, or different ROS 2 distributions (Humble, Foxy, Iron).

**Solution**: Inline badge clearly indicates "ROS 2 Humble" at first mention.

**Alternative Considered**: Text-only (e.g., "ROS 2 Humble (LTS)")
- **Rejected**: Less visually distinct, easy to miss

**Priority Rationale**: P3 (Low) because:
- Module 1 uses Humble exclusively (per spec)
- Chapter front matter already specifies `ros2_distribution: humble`
- Nice-to-have for visual clarity, not critical functionality

**Recommendation**: Implement if time permits after P1/P2 components (CodeExample, ExerciseBlock, ConceptCallout, AssessmentChecklist) are complete.

---

**Status**: Contract Complete ✅
**Implementation**: Pending (P3, defer to later phase if needed)
