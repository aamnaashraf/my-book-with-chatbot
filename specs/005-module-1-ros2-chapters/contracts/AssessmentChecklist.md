# Component Contract: AssessmentChecklist

**Feature**: 005-module-1-ros2-chapters
**Component Path**: `src/components/learning/AssessmentChecklist.tsx`
**Purpose**: Interactive checklist for tracking assessment completion progress with rubric criteria

---

## 1. Overview

The `AssessmentChecklist` component provides students with a self-assessment checklist aligned with grading rubric criteria. Features:
- Interactive checkboxes for each requirement
- Progress percentage tracker
- localStorage persistence (per-assessment)
- Rubric criteria preview
- Submission readiness indicator

**Use Case**: End-of-chapter assessments where students track completion of functional and technical requirements.

---

## 2. Props Interface

```typescript
export interface AssessmentChecklistProps {
  /** Assessment identifier (e.g., "module-1-assessment-2") */
  assessmentId: string;

  /** Checklist items grouped by category */
  items: {
    category: string;
    criteria: Array<{
      id: string;
      description: string;
      points: number;
    }>;
  }[];

  /** Total points for the assessment */
  totalPoints: number;

  /** Optional submission instructions */
  submissionInstructions?: string;

  /** Additional CSS class names */
  className?: string;
}
```

---

## 3. Validation Rules

### Required Props
- `assessmentId` (required): Non-empty string, unique per assessment
- `items` (required): Array with ≥1 category, each category with ≥1 criterion
- `totalPoints` (required): Positive integer matching sum of all criteria points

### Optional Props
- `submissionInstructions`: If provided, displayed below checklist

### Business Rules
- Sum of all `points` must equal `totalPoints`
- Checklist state persisted to localStorage: `assessment-{assessmentId}-checklist`
- Progress percentage calculated as (completed items / total items) × 100
- "Ready to Submit" indicator when 100% complete

---

## 4. Usage Examples

### Example 1: Assessment 2 Checklist

```mdx
<AssessmentChecklist
  assessmentId="module-1-assessment-2"
  totalPoints={20}
  items={[
    {
      category: "Functionality (40%)",
      criteria: [
        { id: "sensor-node", description: "Sensor node publishes to /sensors/imu and /sensors/camera_status", points: 3 },
        { id: "monitor-node", description: "Monitor node subscribes to sensor topics and detects anomalies", points: 3 },
        { id: "client-node", description: "Client node calls /diagnostics service every 5 seconds", points: 2 }
      ]
    },
    {
      category: "Code Quality (30%)",
      criteria: [
        { id: "pep8", description: "Code follows PEP 8 style guidelines", points: 2 },
        { id: "docstrings", description: "All classes and functions have docstrings", points: 2 },
        { id: "error-handling", description: "Proper error handling for service calls", points: 2 }
      ]
    },
    {
      category: "ROS 2 Best Practices (20%)",
      criteria: [
        { id: "qos", description: "Appropriate QoS settings for each topic", points: 2 },
        { id: "node-lifecycle", description: "Proper node initialization and shutdown", points: 2 }
      ]
    },
    {
      category: "Documentation (10%)",
      criteria: [
        { id: "readme", description: "README.md with usage instructions and requirements", points: 2 }
      ]
    }
  ]}
  submissionInstructions="Submit your GitHub repository URL via Canvas. Ensure all code runs on ROS 2 Humble with Ubuntu 22.04."
/>
```

**Renders**:
```
┌────────────────────────────────────────────────────────────┐
│ 📋 Assessment Checklist                    Progress: 30%   │
│                                            6 / 20 points    │
├────────────────────────────────────────────────────────────┤
│ Functionality (40%)                                         │
│ ☑ Sensor node publishes to /sensors/imu...         (3 pts) │
│ ☑ Monitor node subscribes to sensor topics...      (3 pts) │
│ ☐ Client node calls /diagnostics service...        (2 pts) │
│                                                             │
│ Code Quality (30%)                                          │
│ ☐ Code follows PEP 8 style guidelines              (2 pts) │
│ ☐ All classes and functions have docstrings        (2 pts) │
│ ☐ Proper error handling for service calls          (2 pts) │
│                                                             │
│ ROS 2 Best Practices (20%)                                 │
│ ☐ Appropriate QoS settings for each topic          (2 pts) │
│ ☐ Proper node initialization and shutdown          (2 pts) │
│                                                             │
│ Documentation (10%)                                         │
│ ☐ README.md with usage instructions...             (2 pts) │
├────────────────────────────────────────────────────────────┤
│ ⚠️ Incomplete (70% remaining)                               │
│ Submit when all criteria are met.                          │
│                                                             │
│ Submission Instructions:                                    │
│ Submit your GitHub repository URL via Canvas...            │
└────────────────────────────────────────────────────────────┘
```

**When 100% Complete**:
```
┌────────────────────────────────────────────────────────────┐
│ 📋 Assessment Checklist                   Progress: 100%   │
│                                           20 / 20 points    │
├────────────────────────────────────────────────────────────┤
│ [All items checked]                                         │
├────────────────────────────────────────────────────────────┤
│ ✅ Ready to Submit!                                         │
│ All criteria met. Review your work and submit via Canvas.  │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Component Behavior

### 5.1 State Management

**Internal State**:
```typescript
interface AssessmentChecklistState {
  completed: Record<string, boolean>;  // Map of criterion ID → completion status
}
```

**Persistence** (localStorage):
```typescript
const storageKey = `assessment-${assessmentId}-checklist`;
const savedState = localStorage.getItem(storageKey);
if (savedState) {
  setCompleted(JSON.parse(savedState));
}
```

**State Transitions**:
- Check criterion → Save to localStorage, update progress
- Uncheck criterion → Update progress
- 100% complete → Show "Ready to Submit" message

### 5.2 Progress Calculation

```typescript
const totalItems = items.reduce((sum, category) => sum + category.criteria.length, 0);
const completedItems = Object.values(completed).filter(Boolean).length;
const progressPercentage = Math.round((completedItems / totalItems) * 100);

const completedPoints = items
  .flatMap(category => category.criteria)
  .filter(criterion => completed[criterion.id])
  .reduce((sum, criterion) => sum + criterion.points, 0);
```

### 5.3 Accessibility

**ARIA Attributes**:
```tsx
<section
  className="assessment-checklist"
  role="group"
  aria-labelledby="checklist-title"
>
  <h3 id="checklist-title">Assessment Checklist</h3>
  <div role="status" aria-live="polite" aria-atomic="true">
    Progress: {progressPercentage}% ({completedPoints} / {totalPoints} points)
  </div>

  {items.map(category => (
    <fieldset key={category.category}>
      <legend>{category.category}</legend>
      {category.criteria.map(criterion => (
        <label key={criterion.id}>
          <input
            type="checkbox"
            checked={completed[criterion.id] || false}
            onChange={() => handleToggle(criterion.id)}
            aria-label={`${criterion.description} (${criterion.points} points)`}
          />
          {criterion.description} ({criterion.points} pts)
        </label>
      ))}
    </fieldset>
  ))}
</section>
```

**Screen Reader Announcements**:
- "Progress: 30%" when items are checked/unchecked
- "Ready to Submit" when 100% complete

### 5.4 Visual Design

**CSS Classes**:
```css
.assessment-checklist {
  border: 2px solid var(--ifm-color-primary);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  background-color: var(--ifm-color-emphasis-50);
}

.assessment-checklist__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.assessment-checklist__title {
  font-size: 1.25rem;
  font-weight: 700;
}

.assessment-checklist__progress {
  text-align: right;
}

.assessment-checklist__progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--ifm-color-emphasis-300);
  border-radius: 4px;
  margin: 0.5rem 0;
  overflow: hidden;
}

.assessment-checklist__progress-fill {
  height: 100%;
  background-color: var(--ifm-color-primary);
  transition: width 0.3s ease;
}

.assessment-checklist__category {
  margin: 1.5rem 0;
}

.assessment-checklist__category legend {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--ifm-color-primary);
  margin-bottom: 0.5rem;
}

.assessment-checklist__criterion {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.75rem 0;
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
}

.assessment-checklist__criterion input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.assessment-checklist__criterion-description {
  flex: 1;
}

.assessment-checklist__criterion-points {
  color: var(--ifm-color-gray-700);
  font-size: 0.875rem;
  white-space: nowrap;
}

.assessment-checklist__status {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.assessment-checklist__status--incomplete {
  background-color: #fff4e6;
  border: 1px solid #ffc107;
  color: #856404;
}

.assessment-checklist__status--complete {
  background-color: #d4edda;
  border: 1px solid #28a745;
  color: #155724;
}

.assessment-checklist__instructions {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e7f3ff;
  border-left: 4px solid #00aeef;
  border-radius: 4px;
  font-size: 0.9375rem;
}
```

---

## 6. Error Handling

### Invalid Props
```typescript
if (!assessmentId || !items || !totalPoints) {
  console.error('AssessmentChecklist: assessmentId, items, and totalPoints are required');
  return null;
}

const calculatedTotal = items
  .flatMap(category => category.criteria)
  .reduce((sum, criterion) => sum + criterion.points, 0);

if (calculatedTotal !== totalPoints) {
  console.error(`AssessmentChecklist: totalPoints (${totalPoints}) does not match sum of criteria points (${calculatedTotal})`);
}
```

---

## 7. Testing Requirements

### Unit Tests

```typescript
describe('AssessmentChecklist', () => {
  const mockItems = [
    {
      category: "Category 1",
      criteria: [
        { id: "c1", description: "Criterion 1", points: 5 },
        { id: "c2", description: "Criterion 2", points: 5 }
      ]
    }
  ];

  it('renders all criteria', () => {
    render(
      <AssessmentChecklist
        assessmentId="test"
        totalPoints={10}
        items={mockItems}
      />
    );
    expect(screen.getByText("Criterion 1")).toBeInTheDocument();
    expect(screen.getByText("Criterion 2")).toBeInTheDocument();
  });

  it('calculates progress correctly', () => {
    render(
      <AssessmentChecklist
        assessmentId="test"
        totalPoints={10}
        items={mockItems}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(screen.getByText(/Progress: 50%/)).toBeInTheDocument();
    expect(screen.getByText(/5 \/ 10 points/)).toBeInTheDocument();
  });

  it('persists state to localStorage', () => {
    render(
      <AssessmentChecklist
        assessmentId="test"
        totalPoints={10}
        items={mockItems}
      />
    );
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(localStorage.getItem('assessment-test-checklist')).toContain('"c1":true');
  });

  it('shows "Ready to Submit" when 100% complete', () => {
    render(
      <AssessmentChecklist
        assessmentId="test"
        totalPoints={10}
        items={mockItems}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect(screen.getByText(/Ready to Submit/)).toBeInTheDocument();
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

- [ ] Create component file: `src/components/learning/AssessmentChecklist.tsx`
- [ ] Define TypeScript interfaces
- [ ] Implement progress calculation
- [ ] Implement localStorage persistence
- [ ] Add progress bar visualization
- [ ] Add "Ready to Submit" status indicator
- [ ] Style component (CSS)
- [ ] Add ARIA attributes
- [ ] Write unit tests
- [ ] Update `src/theme/MDXComponents.tsx`
- [ ] Document in `quickstart.md` (already done)
- [ ] Test in Assessment 2 example

---

## 10. Related Contracts

- `ExerciseBlock.md` — Similar checklist pattern for objectives
- Assessment MDX files — Primary usage location

---

## 11. Future Enhancements

- [ ] **Export progress**: Download checklist as PDF for offline tracking
- [ ] **Sync with LMS**: API integration to auto-submit when 100% complete
- [ ] **Time tracking**: Record time spent per criterion
- [ ] **Peer review**: Request peer review when checklist complete

---

**Status**: Contract Complete ✅
**Implementation**: Pending
