# Component Contract: ExerciseBlock

**Feature**: 005-module-1-ros2-chapters
**Component Path**: `src/components/learning/ExerciseBlock.tsx`
**Purpose**: Container for structured hands-on exercises with objectives, hints, difficulty rating, and solution reveal

---

## 1. Overview

The `ExerciseBlock` component provides a standardized format for hands-on practice exercises in ROS 2 chapters. It includes:
- Clear problem statement
- Learning objectives checklist
- Difficulty badge and time estimate
- Collapsible hints section
- Starter code and solution links
- Testing instructions

**Use Case**: 15-45 minute hands-on coding exercises where students practice ROS 2 concepts.

---

## 2. Props Interface

```typescript
export interface ExerciseBlockProps {
  /** Exercise title (e.g., "Build a Multi-Node System") */
  title: string;

  /** Unique identifier for linking (e.g., "chapter3-exercise-multi-node") */
  id?: string;

  /** Exercise type */
  type?: 'guided' | 'challenge' | 'debugging' | 'extension';

  /** Difficulty level (shows badge) */
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  /** Estimated time to complete in minutes */
  estimatedTime: number;

  /** Array of learning objectives (displayed as checkboxes) */
  objectives: string[];

  /** Array of hint strings (displayed in collapsible section) */
  hints?: string[];

  /** Path to starter code file (relative to static/) */
  starterCode?: string;

  /** Path to complete solution file (relative to static/) */
  solutionCode?: string;

  /** Exercise content (MDX children: problem, requirements, testing) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string;
}
```

---

## 3. Validation Rules

### Required Props
- `title` (required): Non-empty string, 10-80 characters
- `difficulty` (required): One of enum values
- `estimatedTime` (required): Positive integer ≥ 5, preferably multiple of 5
- `objectives` (required): Array with 1-5 objectives, each non-empty string
- `children` (required): MDX content (problem statement, requirements)

### Optional Props
- `type`: Defaults to `'guided'`
- `hints`: If provided, must be array of non-empty strings
- `starterCode`: If provided, must be valid file path
- `solutionCode`: If provided, must be valid file path

### Business Rules
- If `hints` provided, show "Hints" collapsible section
- If `starterCode` provided, show "Get Starter Code" button/link
- If `solutionCode` provided, show "View Solution" button (collapsed by default)
- `objectives` rendered as interactive checkboxes (stateful, localStorage)

---

## 4. Usage Examples

### Example 1: Guided Exercise (Basic)

```mdx
<ExerciseBlock
  title="Build a Temperature Monitor"
  difficulty="beginner"
  estimatedTime={30}
  type="guided"
  objectives={[
    "Create a publisher that emits temperature readings",
    "Create a subscriber that logs temperature values",
    "Test with ros2 topic echo"
  ]}
  hints={[
    "Use Float32 message type from std_msgs",
    "Set publish rate to 1 Hz with create_timer(1.0, callback)"
  ]}
  starterCode="code-examples/module-1/skeleton/chapter3_temperature_monitor_skeleton.py"
  solutionCode="code-examples/module-1/complete/chapter3_temperature_monitor.py"
>

## Problem Statement
You are building a temperature monitoring system for a humanoid robot's joint motors. Create a ROS 2 publisher that simulates temperature sensor readings and a subscriber that logs them.

## Requirements
1. **Publisher Node** (`temp_publisher`):
   - Publishes to `/motor/temperature` topic
   - Message type: `std_msgs/msg/Float32`
   - Publish rate: 1 Hz
   - Simulated temperature: 30.0 + random noise

2. **Subscriber Node** (`temp_subscriber`):
   - Subscribes to `/motor/temperature`
   - Logs temperature to console with warning if > 80°C

## Testing
\`\`\`bash
# Terminal 1: Run publisher
python3 temp_publisher.py

# Terminal 2: Echo topic
ros2 topic echo /motor/temperature

# Terminal 3: Run subscriber
python3 temp_subscriber.py
\`\`\`

Expected output: Temperature values logged every second.

</ExerciseBlock>
```

**Renders**:
```
┌────────────────────────────────────────────────────────────┐
│ 🎯 Exercise: Build a Temperature Monitor                   │
│    Beginner  ⏱ ~30 min  Type: Guided                      │
├────────────────────────────────────────────────────────────┤
│ Learning Objectives:                                        │
│ ☐ Create a publisher that emits temperature readings       │
│ ☐ Create a subscriber that logs temperature values         │
│ ☐ Test with ros2 topic echo                                │
├────────────────────────────────────────────────────────────┤
│ [Get Starter Code] [View Hints] [View Solution]            │
├────────────────────────────────────────────────────────────┤
│ Problem Statement                                           │
│ You are building a temperature monitoring system...        │
│                                                             │
│ Requirements                                                │
│ 1. Publisher Node (temp_publisher):                        │
│    - Publishes to /motor/temperature topic                 │
│    - ...                                                    │
└────────────────────────────────────────────────────────────┘
```

### Example 2: Challenge Exercise (No Scaffolding)

```mdx
<ExerciseBlock
  title="Implement a Service-Based Calculator"
  difficulty="intermediate"
  estimatedTime={45}
  type="challenge"
  objectives={[
    "Define a custom service type",
    "Implement a service server",
    "Implement a service client",
    "Test with ros2 service call"
  ]}
  solutionCode="code-examples/module-1/complete/chapter3_calculator_service.py"
>

## Challenge
Build a ROS 2 service that performs arithmetic operations (add, subtract, multiply, divide) on two numbers.

## Specifications
- Service name: `/calculator`
- Request: Two floats (`a`, `b`) and an operation string (`"add"`, `"subtract"`, etc.)
- Response: Result (float) and success flag (bool)

No starter code provided. Design and implement from scratch.

## Bonus
- [ ] Handle division by zero gracefully
- [ ] Support additional operations (power, modulo)
- [ ] Add unit tests using pytest

</ExerciseBlock>
```

### Example 3: Debugging Exercise

```mdx
<ExerciseBlock
  title="Fix the Broken Subscriber"
  difficulty="beginner"
  estimatedTime={20}
  type="debugging"
  objectives={[
    "Identify why the subscriber isn't receiving messages",
    "Fix the QoS mismatch issue"
  ]}
  hints={[
    "Check QoS settings (publisher vs. subscriber)",
    "Use ros2 topic info /sensor_data to inspect QoS",
    "RELIABLE vs. BEST_EFFORT QoS must match"
  ]}
  starterCode="code-examples/module-1/broken/chapter3_broken_subscriber.py"
  solutionCode="code-examples/module-1/complete/chapter3_fixed_subscriber.py"
>

## Problem
The provided subscriber code compiles and runs, but never receives messages. Why?

## Your Task
1. Download the broken code
2. Identify the bug (hint: it's QoS-related)
3. Fix it and verify messages are received

</ExerciseBlock>
```

---

## 5. Component Behavior

### 5.1 State Management

**Internal State**:
```typescript
interface ExerciseBlockState {
  objectivesCompleted: boolean[];  // Track checkbox states
  hintsExpanded: boolean;          // Toggle hints section
  solutionExpanded: boolean;       // Toggle solution section
}
```

**Persistence** (localStorage):
```typescript
// Key format: "exercise-{id}-objectives"
const storageKey = `exercise-${id}-objectives`;
const savedState = localStorage.getItem(storageKey);
if (savedState) {
  setObjectivesCompleted(JSON.parse(savedState));
}
```

**State Transitions**:
- Check objective → Save to localStorage, update progress %
- Click "View Hints" → Toggle `hintsExpanded`
- Click "View Solution" → Toggle `solutionExpanded`, warn if objectives incomplete

### 5.2 Accessibility

**ARIA Attributes**:
```tsx
<section
  className="exercise-block"
  role="complementary"
  aria-label={`Exercise: ${title}`}
>
  <h3 id={`exercise-${id}-title`}>{title}</h3>

  <div role="group" aria-labelledby={`exercise-${id}-objectives-label`}>
    <h4 id={`exercise-${id}-objectives-label`}>Learning Objectives</h4>
    {objectives.map((obj, i) => (
      <label key={i}>
        <input
          type="checkbox"
          checked={objectivesCompleted[i]}
          onChange={() => handleObjectiveToggle(i)}
          aria-label={obj}
        />
        {obj}
      </label>
    ))}
  </div>

  {hints && (
    <details>
      <summary aria-label="Show hints">Hints</summary>
      <ul>
        {hints.map((hint, i) => <li key={i}>{hint}</li>)}
      </ul>
    </details>
  )}
</section>
```

**Keyboard Navigation**:
- Tab: Navigate through checkboxes, buttons
- Space: Toggle checkbox / Expand details
- Enter: Activate buttons (Get Starter Code, View Solution)

### 5.3 Visual Design

**CSS Classes**:
```css
.exercise-block {
  border: 2px solid var(--ifm-color-primary);
  border-radius: 8px;
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--ifm-color-emphasis-50);
}

.exercise-block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.exercise-block__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ifm-color-primary);
}

.exercise-block__title::before {
  content: '🎯 ';
}

.exercise-block__meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.exercise-block__badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.exercise-block__badge--beginner {
  background-color: #28a745;
  color: white;
}

.exercise-block__badge--intermediate {
  background-color: #ffc107;
  color: black;
}

.exercise-block__badge--advanced {
  background-color: #dc3545;
  color: white;
}

.exercise-block__objectives {
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
}

.exercise-block__objectives h4 {
  margin-top: 0;
  color: var(--ifm-color-primary);
}

.exercise-block__objective {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.exercise-block__objective input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.exercise-block__progress {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--ifm-color-gray-700);
}

.exercise-block__actions {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.exercise-block__button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 4px;
  background-color: var(--ifm-color-primary);
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.exercise-block__button--secondary {
  background-color: white;
  color: var(--ifm-color-primary);
}

.exercise-block__hints {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.exercise-block__hints summary {
  cursor: pointer;
  font-weight: 600;
  user-select: none;
}

.exercise-block__solution {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #d4edda;
  border-left: 4px solid #28a745;
  border-radius: 4px;
}

.exercise-block__solution summary {
  cursor: pointer;
  font-weight: 600;
  user-select: none;
}

.exercise-block__content {
  margin-top: 1rem;
}
```

---

## 6. Error Handling

### Invalid Props
```typescript
if (!title || !difficulty || !estimatedTime || !objectives) {
  console.error('ExerciseBlock: title, difficulty, estimatedTime, and objectives are required');
  return null;
}

if (objectives.length === 0 || objectives.length > 5) {
  console.warn(`ExerciseBlock: objectives should have 1-5 items, got ${objectives.length}`);
}

if (estimatedTime < 5) {
  console.warn(`ExerciseBlock: estimatedTime (${estimatedTime}) should be ≥ 5 minutes`);
}
```

### Missing Files
```typescript
if (starterCode && !fileExists(starterCode)) {
  console.error(`ExerciseBlock: starterCode file not found: ${starterCode}`);
  // Render button as disabled with tooltip
}

if (solutionCode && !fileExists(solutionCode)) {
  console.error(`ExerciseBlock: solutionCode file not found: ${solutionCode}`);
  // Render button as disabled with tooltip
}
```

---

## 7. Testing Requirements

### Unit Tests

```typescript
describe('ExerciseBlock', () => {
  it('renders exercise with title and metadata', () => {
    render(
      <ExerciseBlock
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1", "Objective 2"]}
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    expect(screen.getByText(/Test Exercise/)).toBeInTheDocument();
    expect(screen.getByText(/Beginner/)).toBeInTheDocument();
    expect(screen.getByText(/~30 min/)).toBeInTheDocument();
  });

  it('renders objectives as checkboxes', () => {
    render(
      <ExerciseBlock
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1", "Objective 2"]}
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
  });

  it('persists objective completion to localStorage', () => {
    render(
      <ExerciseBlock
        id="test-exercise"
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1"]}
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(localStorage.getItem('exercise-test-exercise-objectives')).toBe('[true]');
  });

  it('shows hints when provided', () => {
    render(
      <ExerciseBlock
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1"]}
        hints={["Hint 1", "Hint 2"]}
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    expect(screen.getByText(/Hints/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Hints/));
    expect(screen.getByText("Hint 1")).toBeInTheDocument();
  });

  it('shows solution button when solutionCode provided', () => {
    render(
      <ExerciseBlock
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1"]}
        solutionCode="solution.py"
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    expect(screen.getByRole('button', { name: /view solution/i })).toBeInTheDocument();
  });

  it('calculates progress percentage', () => {
    render(
      <ExerciseBlock
        title="Test Exercise"
        difficulty="beginner"
        estimatedTime={30}
        objectives={["Objective 1", "Objective 2", "Objective 3"]}
      >
        <p>Exercise content</p>
      </ExerciseBlock>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(screen.getByText(/Progress: 33%/)).toBeInTheDocument();
    fireEvent.click(checkboxes[1]);
    expect(screen.getByText(/Progress: 67%/)).toBeInTheDocument();
  });
});
```

---

## 8. Dependencies

**NPM Packages**:
- `react@^18.3.1`
- `react-dom@^18.3.1`

**Internal Dependencies**:
- `@site/src/css/custom.css` — Component styles
- `CodeExample` component (may be embedded in solution)

---

## 9. Implementation Checklist

- [ ] Create component file: `src/components/learning/ExerciseBlock.tsx`
- [ ] Define TypeScript interfaces (Props, State)
- [ ] Implement objectives checklist with localStorage persistence
- [ ] Implement progress calculation (% complete)
- [ ] Add collapsible hints section (<details>)
- [ ] Add collapsible solution section
- [ ] Add "Get Starter Code" and "View Solution" buttons
- [ ] Style component (CSS in `src/css/custom.css`)
- [ ] Add ARIA attributes
- [ ] Write unit tests
- [ ] Update `src/theme/MDXComponents.tsx`
- [ ] Document in `quickstart.md` (already done)
- [ ] Test in Chapter 3 example

---

## 10. Related Contracts

- `CodeExample.md` — Used in solution section
- `AssessmentChecklist.md` — Similar checklist pattern

---

## 11. Future Enhancements

- [ ] **Auto-grading**: Submit solution and run automated tests
- [ ] **Leaderboard**: Track fastest completion times
- [ ] **Peer review**: Request code review from other students
- [ ] **Discussion forum link**: Link to exercise-specific forum thread

---

**Status**: Contract Complete ✅
**Implementation**: Pending
