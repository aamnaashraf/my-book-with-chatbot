# Component Contract: ConceptCallout

**Feature**: 005-module-1-ros2-chapters
**Component Path**: `src/components/learning/ConceptCallout.tsx`
**Purpose**: Highlight key concepts, definitions, tips, and warnings with styled callout boxes

---

## 1. Overview

The `ConceptCallout` component provides visually distinct callout boxes for:
- Defining new ROS 2 terminology
- Explaining important concepts
- Providing helpful tips (Python, ROS 2 best practices)
- Warning about common pitfalls
- Critical safety/security information

**Difference from Docusaurus Admonitions**: More specific types (definition, concept) tailored to educational content, with custom styling for robotics context.

**Use Case**: In-line concept highlights within chapter content.

---

## 2. Props Interface

```typescript
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
```

---

## 3. Validation Rules

### Required Props
- `type` (required): One of enum values
- `children` (required): Non-empty content

### Optional Props
- `title`: If not provided, defaults to type name (e.g., "Definition", "Concept", "Tip")

### Business Rules
- Each type has default icon, color, and background
- Title defaults but can be overridden for specificity

---

## 4. Usage Examples

### Example 1: Definition

```mdx
<ConceptCallout type="definition" title="What is a Node?">
A **node** is an independent process that performs computation in a ROS 2 system. Nodes communicate via topics, services, and actions.
</ConceptCallout>
```

**Renders**:
```
┌────────────────────────────────────────────┐
│ 📖 What is a Node?                          │
│                                             │
│ A node is an independent process that       │
│ performs computation in a ROS 2 system.     │
│ Nodes communicate via topics, services,     │
│ and actions.                                │
└────────────────────────────────────────────┘
(Blue background, #e7f3ff)
```

### Example 2: Concept (with default title)

```mdx
<ConceptCallout type="concept">
ROS 2 uses **DDS (Data Distribution Service)** as its middleware layer. DDS enables peer-to-peer communication without a central master node, unlike ROS 1.
</ConceptCallout>
```

**Renders**:
```
┌────────────────────────────────────────────┐
│ 💡 Concept                                  │
│                                             │
│ ROS 2 uses DDS (Data Distribution Service) │
│ as its middleware layer. DDS enables...    │
└────────────────────────────────────────────┘
(Green background, #e6f7e6)
```

### Example 3: Tip

```mdx
<ConceptCallout type="tip" title="Python Best Practice">
Always use `rclpy.shutdown()` in a `try-finally` block to ensure clean shutdown even if exceptions occur.

\`\`\`python
try:
    rclpy.spin(node)
finally:
    rclpy.shutdown()
\`\`\`
</ConceptCallout>
```

**Renders**:
```
┌────────────────────────────────────────────┐
│ 💡 Python Best Practice                    │
│                                             │
│ Always use rclpy.shutdown() in a           │
│ try-finally block...                       │
│ [code block]                                │
└────────────────────────────────────────────┘
(Yellow background, #fff9e6)
```

### Example 4: Warning

```mdx
<ConceptCallout type="warning" title="QoS Mismatch">
If publisher and subscriber have incompatible QoS settings (e.g., RELIABLE vs. BEST_EFFORT), messages will not be delivered. Always check QoS with `ros2 topic info`.
</ConceptCallout>
```

**Renders**:
```
┌────────────────────────────────────────────┐
│ ⚠️ QoS Mismatch                             │
│                                             │
│ If publisher and subscriber have           │
│ incompatible QoS settings...               │
└────────────────────────────────────────────┘
(Orange background, #fff4e6)
```

### Example 5: Danger

```mdx
<ConceptCallout type="danger" title="Security Risk">
Never run `ros2` commands with `sudo` unless absolutely necessary. Elevated privileges can expose your system to security vulnerabilities.
</ConceptCallout>
```

**Renders**:
```
┌────────────────────────────────────────────┐
│ 🚨 Security Risk                            │
│                                             │
│ Never run ros2 commands with sudo unless   │
│ absolutely necessary...                    │
└────────────────────────────────────────────┘
(Red background, #ffe6e6)
```

---

## 5. Component Behavior

### 5.1 Type Mappings

| Type | Default Title | Icon | Background Color | Border Color |
|------|--------------|------|------------------|--------------|
| `definition` | "Definition" | 📖 | #e7f3ff (light blue) | #00aeef (ROS 2 blue) |
| `concept` | "Concept" | 💡 | #e6f7e6 (light green) | #28a745 (success green) |
| `tip` | "Tip" | 💡 | #fff9e6 (light yellow) | #ffc107 (warning yellow) |
| `warning` | "Warning" | ⚠️ | #fff4e6 (light orange) | #fd7e14 (warning orange) |
| `danger` | "Danger" | 🚨 | #ffe6e6 (light red) | #dc3545 (danger red) |

### 5.2 Accessibility

**ARIA Attributes**:
```tsx
<aside
  className={`concept-callout concept-callout--${type}`}
  role="note"
  aria-label={title || defaultTitles[type]}
>
  <div className="concept-callout__header">
    <span className="concept-callout__icon" aria-hidden="true">
      {icons[type]}
    </span>
    <strong className="concept-callout__title">
      {title || defaultTitles[type]}
    </strong>
  </div>
  <div className="concept-callout__content">
    {children}
  </div>
</aside>
```

**Screen Reader Behavior**:
- Announced as "Note: [title]"
- Icon hidden from screen readers (decorative)

### 5.3 Visual Design

**CSS Classes**:
```css
.concept-callout {
  padding: 1rem;
  margin: 1.5rem 0;
  border-left: 4px solid;
  border-radius: 4px;
}

.concept-callout__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.concept-callout__icon {
  font-size: 1.25rem;
  line-height: 1;
}

.concept-callout__title {
  font-size: 1.125rem;
  font-weight: 700;
}

.concept-callout__content {
  line-height: 1.6;
}

/* Type-specific styles */
.concept-callout--definition {
  background-color: #e7f3ff;
  border-color: #00aeef;
}

.concept-callout--concept {
  background-color: #e6f7e6;
  border-color: #28a745;
}

.concept-callout--tip {
  background-color: #fff9e6;
  border-color: #ffc107;
}

.concept-callout--warning {
  background-color: #fff4e6;
  border-color: #fd7e14;
}

.concept-callout--danger {
  background-color: #ffe6e6;
  border-color: #dc3545;
}

/* Dark mode support */
[data-theme='dark'] .concept-callout--definition {
  background-color: rgba(0, 174, 239, 0.1);
}

[data-theme='dark'] .concept-callout--concept {
  background-color: rgba(40, 167, 69, 0.1);
}

[data-theme='dark'] .concept-callout--tip {
  background-color: rgba(255, 193, 7, 0.1);
}

[data-theme='dark'] .concept-callout--warning {
  background-color: rgba(253, 126, 20, 0.1);
}

[data-theme='dark'] .concept-callout--danger {
  background-color: rgba(220, 53, 69, 0.1);
}
```

---

## 6. Error Handling

### Invalid Props
```typescript
if (!type || !['definition', 'concept', 'tip', 'warning', 'danger'].includes(type)) {
  console.error(`ConceptCallout: invalid type "${type}"`);
  return null;
}

if (!children) {
  console.warn('ConceptCallout: empty children');
  return null;
}
```

---

## 7. Testing Requirements

### Unit Tests

```typescript
describe('ConceptCallout', () => {
  it('renders with default title for each type', () => {
    const types = ['definition', 'concept', 'tip', 'warning', 'danger'];
    types.forEach(type => {
      const { rerender } = render(
        <ConceptCallout type={type}>
          <p>Content</p>
        </ConceptCallout>
      );
      expect(screen.getByText(/definition|concept|tip|warning|danger/i)).toBeInTheDocument();
      rerender(<></>); // Clean up
    });
  });

  it('renders with custom title', () => {
    render(
      <ConceptCallout type="definition" title="Custom Title">
        <p>Content</p>
      </ConceptCallout>
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('applies correct CSS class for type', () => {
    const { container } = render(
      <ConceptCallout type="warning">
        <p>Content</p>
      </ConceptCallout>
    );
    expect(container.querySelector('.concept-callout--warning')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <ConceptCallout type="tip">
        <p>Test content</p>
      </ConceptCallout>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('has accessible role and label', () => {
    render(
      <ConceptCallout type="concept" title="Test Concept">
        <p>Content</p>
      </ConceptCallout>
    );
    const callout = screen.getByRole('note', { name: 'Test Concept' });
    expect(callout).toBeInTheDocument();
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

- [ ] Create component file: `src/components/learning/ConceptCallout.tsx`
- [ ] Define TypeScript interface
- [ ] Implement type mappings (icons, colors, titles)
- [ ] Style component (CSS)
- [ ] Add dark mode support
- [ ] Add ARIA attributes
- [ ] Write unit tests
- [ ] Update `src/theme/MDXComponents.tsx`
- [ ] Document in `quickstart.md` (already done)
- [ ] Test in Chapter 2 example

---

## 10. Related Contracts

- `ExerciseBlock.md` — May include ConceptCallouts within exercises
- Docusaurus Admonitions — Similar pattern, but ConceptCallout is more specific

---

## 11. Future Enhancements

- [ ] **Collapsible callouts**: Long definitions can be collapsed
- [ ] **Glossary linking**: Auto-link terms to glossary page
- [ ] **Code highlighting**: Syntax highlight inline code in callouts

---

**Status**: Contract Complete ✅
**Implementation**: Pending
