# Component Contract: CodeExample

**Feature**: 005-module-1-ros2-chapters
**Component Path**: `src/components/learning/CodeExample.tsx`
**Purpose**: Display syntax-highlighted code examples with optional solution toggle, difficulty badges, and metadata

---

## 1. Overview

The `CodeExample` component extends Docusaurus code blocks with educational features:
- Syntax highlighting via Prism.js
- Copy-to-clipboard button
- "View Solution" toggle (when `solutionCode` provided)
- Difficulty and time estimate badges
- Line number highlighting
- File name display in header

**Use Case**: Embedding ROS 2 Python/URDF/Bash code with skeleton/complete versions for hands-on learning.

---

## 2. Props Interface

```typescript
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
```

---

## 3. Validation Rules

### Required Props
- `language` (required): Must be one of supported languages
- `children` (required): Must be non-empty string

### Optional Props
- `solutionCode`: If provided, must be non-empty string different from `children`
- `filename`: If provided, must match pattern `*.py`, `*.xml`, `*.sh`, `*.yaml`, `*.json`
- `difficulty`: Must be one of enum values
- `estimatedTime`: Must be positive integer ≥ 5
- `highlightLines`: Must be array of positive integers
- `showLineNumbers`: Boolean (default: true)

### Business Rules
- If `solutionCode` is provided, "View Solution" button appears
- If `difficulty` is provided, difficulty badge appears
- If `estimatedTime` is provided, time badge appears
- `relatedConcepts` links use Docusaurus `<Link>` component for internal routing

---

## 4. Usage Examples

### Example 1: Basic Code Block (Skeleton Only)

```mdx
<CodeExample
  language="python"
  filename="minimal_publisher.py"
  showLineNumbers={true}
>
{`#!/usr/bin/env python3
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        # TODO: Create publisher here
`}
</CodeExample>
```

**Renders**:
```
┌──────────────────────────────────────────────────┐
│ minimal_publisher.py                     [Copy]  │
├──────────────────────────────────────────────────┤
│ 1  #!/usr/bin/env python3                        │
│ 2  import rclpy                                  │
│ 3  from rclpy.node import Node                   │
│ 4                                                 │
│ 5  class MinimalPublisher(Node):                 │
│ 6      def __init__(self):                       │
│ 7          super().__init__('minimal_publisher') │
│ 8          # TODO: Create publisher here         │
└──────────────────────────────────────────────────┘
```

### Example 2: With Solution Toggle

```mdx
<CodeExample
  language="python"
  filename="minimal_publisher.py"
  difficulty="beginner"
  estimatedTime={15}
  highlightLines={[8]}
  solutionCode={require('!!raw-loader!@site/static/code-examples/module-1/complete/chapter3_minimal_publisher.py').default}
>
{require('!!raw-loader!@site/static/code-examples/module-1/skeleton/chapter3_minimal_publisher_skeleton.py').default}
</CodeExample>
```

**Renders** (skeleton mode):
```
┌──────────────────────────────────────────────────┐
│ minimal_publisher.py      Beginner ⏱ ~15 min    │
│                           [View Solution] [Copy] │
├──────────────────────────────────────────────────┤
│ 1  #!/usr/bin/env python3                        │
│ 2  import rclpy                                  │
│ 3  from rclpy.node import Node                   │
│ 4                                                 │
│ 5  class MinimalPublisher(Node):                 │
│ 6      def __init__(self):                       │
│ 7          super().__init__('minimal_publisher') │
│ 8          # TODO: Create publisher here     ← highlighted │
└──────────────────────────────────────────────────┘
```

**Renders** (after clicking "View Solution"):
```
┌──────────────────────────────────────────────────┐
│ minimal_publisher.py      Beginner ⏱ ~15 min    │
│                    [View Skeleton] [Copy]        │
├──────────────────────────────────────────────────┤
│ 1  #!/usr/bin/env python3                        │
│ 2  import rclpy                                  │
│ 3  from rclpy.node import Node                   │
│ 4  from std_msgs.msg import String               │
│ 5                                                 │
│ 6  class MinimalPublisher(Node):                 │
│ 7      def __init__(self):                       │
│ 8          super().__init__('minimal_publisher') │
│ 9          self.publisher_ = self.create_publisher(String, 'topic', 10) │
│ 10         self.timer = self.create_timer(0.5, self.timer_callback) │
└──────────────────────────────────────────────────┘
```

### Example 3: URDF XML Example

```mdx
<CodeExample
  language="xml"
  filename="humanoid_arm.urdf"
  difficulty="intermediate"
  relatedConcepts={["Chapter 4.2: Links and Joints", "URDF Specification"]}
>
{`<?xml version="1.0"?>
<robot name="humanoid_arm">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.1"/>
      </geometry>
    </visual>
  </link>
  <!-- TODO: Add shoulder joint and link -->
</robot>`}
</CodeExample>
```

### Example 4: Bash Command Example

```mdx
<CodeExample
  language="bash"
  filename="ros2_commands.sh"
  showLineNumbers={false}
>
{`# List all active nodes
ros2 node list

# Echo topic messages
ros2 topic echo /sensor_data

# Call a service
ros2 service call /diagnostics std_srvs/srv/Trigger
`}
</CodeExample>
```

---

## 5. Component Behavior

### 5.1 State Management

**Internal State**:
```typescript
interface CodeExampleState {
  showingSolution: boolean;  // Toggle between skeleton and solution
  copied: boolean;           // Clipboard feedback state
}
```

**State Transitions**:
- Click "View Solution" → `showingSolution = true`, display `solutionCode`
- Click "View Skeleton" → `showingSolution = false`, display `children`
- Click "Copy" → Copy code to clipboard, `copied = true` for 2 seconds

### 5.2 Accessibility

**ARIA Attributes**:
```tsx
<div role="region" aria-label={`Code example: ${filename || 'untitled'}`}>
  <button
    aria-label="Copy code to clipboard"
    onClick={handleCopy}
  >
    {copied ? 'Copied!' : 'Copy'}
  </button>
  {solutionCode && (
    <button
      aria-label={showingSolution ? 'View skeleton code' : 'View complete solution'}
      onClick={() => setShowingSolution(!showingSolution)}
    >
      {showingSolution ? 'View Skeleton' : 'View Solution'}
    </button>
  )}
</div>
```

**Keyboard Navigation**:
- Tab: Focus copy button
- Tab: Focus solution toggle (if present)
- Enter/Space: Activate focused button

**Screen Reader Support**:
- Announce filename and language
- Announce state changes ("Showing solution", "Copied to clipboard")

### 5.3 Visual Design

**CSS Classes** (to be defined in `src/css/custom.css`):
```css
.code-example {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 8px;
  margin: 1.5rem 0;
}

.code-example__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--ifm-color-emphasis-100);
  border-bottom: 1px solid var(--ifm-color-emphasis-300);
}

.code-example__filename {
  font-family: var(--ifm-font-family-monospace);
  font-weight: 600;
}

.code-example__badges {
  display: flex;
  gap: 0.5rem;
}

.code-example__badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.code-example__badge--beginner {
  background-color: #28a745;
  color: white;
}

.code-example__badge--intermediate {
  background-color: #ffc107;
  color: black;
}

.code-example__badge--advanced {
  background-color: #dc3545;
  color: white;
}

.code-example__actions {
  display: flex;
  gap: 0.5rem;
}

.code-example__button {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 4px;
  background-color: var(--ifm-color-primary);
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
}

.code-example__button:hover {
  background-color: var(--ifm-color-primary-dark);
}

.code-example__content {
  padding: 1rem;
}

/* Highlight lines */
.code-example__content .highlight-line {
  background-color: rgba(0, 174, 239, 0.1);
  border-left: 4px solid #00aeef;
  margin-left: -1rem;
  padding-left: calc(1rem - 4px);
}
```

---

## 6. Error Handling

### Invalid Props
```typescript
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
```

### Clipboard API Failure
```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(showingSolution ? solutionCode : children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
    // Fallback: Show "Copy failed" message
    alert('Failed to copy code. Please manually select and copy.');
  }
};
```

---

## 7. Testing Requirements

### Unit Tests (Jest + React Testing Library)

```typescript
describe('CodeExample', () => {
  it('renders code with syntax highlighting', () => {
    render(
      <CodeExample language="python">
        {`print("Hello World")`}
      </CodeExample>
    );
    expect(screen.getByText(/print/)).toBeInTheDocument();
  });

  it('shows solution toggle when solutionCode provided', () => {
    render(
      <CodeExample
        language="python"
        solutionCode={`print("Complete solution")`}
      >
        {`# TODO: Implement`}
      </CodeExample>
    );
    expect(screen.getByRole('button', { name: /view solution/i })).toBeInTheDocument();
  });

  it('toggles between skeleton and solution', () => {
    render(
      <CodeExample
        language="python"
        solutionCode={`print("Solution")`}
      >
        {`# TODO`}
      </CodeExample>
    );
    const toggleButton = screen.getByRole('button', { name: /view solution/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Solution/)).toBeInTheDocument();
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument();
  });

  it('copies code to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
    render(
      <CodeExample language="python">
        {`print("Test")`}
      </CodeExample>
    );
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`print("Test")`);
    });
  });

  it('displays difficulty and time badges', () => {
    render(
      <CodeExample
        language="python"
        difficulty="beginner"
        estimatedTime={15}
      >
        {`print("Test")`}
      </CodeExample>
    );
    expect(screen.getByText(/Beginner/)).toBeInTheDocument();
    expect(screen.getByText(/~15 min/)).toBeInTheDocument();
  });
});
```

### Accessibility Tests

```typescript
it('has accessible labels', () => {
  render(
    <CodeExample language="python" filename="test.py">
      {`print("Test")`}
    </CodeExample>
  );
  expect(screen.getByRole('region', { name: /code example: test.py/i })).toBeInTheDocument();
});

it('supports keyboard navigation', () => {
  render(
    <CodeExample
      language="python"
      solutionCode={`print("Solution")`}
    >
      {`# TODO`}
    </CodeExample>
  );
  const copyButton = screen.getByRole('button', { name: /copy/i });
  copyButton.focus();
  expect(document.activeElement).toBe(copyButton);
  userEvent.tab();
  const toggleButton = screen.getByRole('button', { name: /view solution/i });
  expect(document.activeElement).toBe(toggleButton);
});
```

---

## 8. Dependencies

**NPM Packages**:
- `prism-react-renderer@^2.4.0` — Syntax highlighting
- `react@^18.3.1` — Component framework
- `react-dom@^18.3.1` — DOM rendering

**Internal Dependencies**:
- `@site/src/css/custom.css` — Component styles
- Docusaurus theme (inherits dark/light mode)

---

## 9. Implementation Checklist

- [ ] Create component file: `src/components/learning/CodeExample.tsx`
- [ ] Define TypeScript interface (Props, State)
- [ ] Implement copy-to-clipboard functionality
- [ ] Implement solution toggle functionality
- [ ] Add difficulty and time badges
- [ ] Style component (CSS in `src/css/custom.css`)
- [ ] Add ARIA attributes for accessibility
- [ ] Write unit tests (Jest + RTL)
- [ ] Write accessibility tests (axe-core)
- [ ] Update `src/theme/MDXComponents.tsx` to register component
- [ ] Document usage in `quickstart.md` (already done)
- [ ] Test in Chapter 3 example (manual verification)

---

## 10. Related Contracts

- `ExerciseBlock.md` — Uses CodeExample for starter/solution code
- `ConceptCallout.md` — May include inline code snippets
- `AssessmentChecklist.md` — May reference code examples by ID

---

## 11. Future Enhancements (Out of Scope for Phase 1)

- [ ] **Line-by-line annotations**: Hover over line numbers to show explanations
- [ ] **Run in browser**: Execute Python code via Pyodide WASM
- [ ] **Diff view**: Show diff between skeleton and solution
- [ ] **Download button**: Download code as `.py` file
- [ ] **GitHub link**: Link to code example in repository

---

**Status**: Contract Complete ✅
**Implementation**: Pending (to be done in `/sp.implement` phase)
