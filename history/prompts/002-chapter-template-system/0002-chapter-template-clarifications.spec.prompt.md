---
id: 0002
title: Chapter Template Clarifications
stage: spec
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-chapter-template-system
branch: 002-chapter-template-system
user: Ameen Alam
command: /sp.clarify
labels: ["clarification", "spec", "template", "interactive-components", "validation"]
links:
  spec: specs/002-chapter-template-system/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-chapter-template-system/spec.md
tests:
  - Three clarification questions asked and answered
  - All answers integrated into spec (Clarifications section + relevant FRs/SCs/Assumptions)
---

## Prompt

User requested: "/sp.clarify 002-chapter-template-system" (Option B from previous spec completion)

Context: After completing the chapter template system specification, user chose to run clarification workflow before proceeding to planning phase. The spec was already comprehensive with 6 user stories, 17 functional requirements, 10 success criteria, and no [NEEDS CLARIFICATION] markers. Clarification session aimed to identify any remaining ambiguities or unstated assumptions that could impact implementation.

## Response snapshot

Conducted structured ambiguity scan across 10 taxonomy categories:
1. Functional Scope & Behavior - Clear
2. Domain & Data Model - Clear
3. Interaction & UX Flow - **Partial** (Exercise Block hint reveal behavior)
4. Non-Functional Quality Attributes - Clear
5. Integration & External Dependencies - Clear
6. Edge Cases & Failure Handling - Clear
7. Constraints & Tradeoffs - **Partial** (Template structure for content variants)
8. Terminology & Consistency - Clear
9. Completion Signals - **Partial** (Metadata validation timing)
10. Misc / Placeholders - Clear

**Questions Asked (3 of 5 max)**:

**Q1: Exercise Block Hints Behavior** (Interaction & UX Flow)
- Presented 5 options: A) All hints visible but collapsed, B) Sequential one-at-a-time, C) Timer-based, D) Attempt-based, Short answer
- Recommended: Option B (Sequential reveal for progressive learning)
- **User Answer: D** (Attempt-based reveal - hints unlock after submit attempt)
- **Integration**: Updated FR-014 to specify "hints unlock sequentially after users attempt to submit code/answer (requires attempt tracking)"; Added assumption clarifying client-side state management only (no server-side persistence or correctness validation)

**Q2: Content Type Variant Template Structure** (Constraints & Tradeoffs)
- Presented 5 options: A) Four separate files, B) Base + variants with inheritance, C) Single template with conditional comments, D) Single template all sections required, Short answer
- Recommended: Option C (Single template with comments - easier maintenance)
- **User Answer: yes** (accepted recommendation - Option C)
- **Integration**: Updated FR-002 to specify "single file with inline comments that define guidance for four content type variants... Comments explain which sections are required/optional/emphasized for each type"

**Q3: Metadata Validation Timing** (Completion Signals)
- Presented 5 options: A) On file save, B) On build, C) On commit (pre-commit hook), D) Manual command, Short answer
- Recommended: Option B (On build - CI/CD best practice)
- **User Answer: yes** (accepted recommendation - Option B)
- **Integration**: Updated FR-016 to specify "validate... during the build process (`npm run build`). Build MUST fail with clear error messages if any chapter has invalid metadata"; Updated SC-002 to note "validation runs automatically in `npm run build`"; Updated SC-009 to include "invalid metadata" in zero build failures criterion

**All clarifications documented in new "Clarifications" section**:
```markdown
## Clarifications *(optional)*

### Session 2025-11-30

- Q: How should Exercise Block progressive hints be revealed to learners? → A: Attempt-based reveal - hints unlock after users try submitting code/answer (requires tracking)
- Q: Should content type variants have separate template files or be part of one template? → A: Single template with conditional comments explaining which sections apply to which content type
- Q: When should chapter metadata validation occur in the authoring workflow? → A: On build - validation runs during `npm run build` as a pre-deployment check
```

## Outcome

- ✅ Impact: Resolved 3 critical implementation ambiguities that would have required rework during planning/development. Clarifications enable planners to: (1) Design Exercise Block component with attempt tracking state management, (2) Create single comprehensive template with content-type guidance comments, (3) Integrate metadata validation into build pipeline. All answers aligned with Docusaurus static site architecture and best practices.

- 🧪 Tests: Sequential questioning workflow validated: Each question presented with recommended option → User provided answer (D, yes, yes) → Answer immediately integrated into spec → Next question presented. No validation errors or conflicts. All 3 answers successfully incorporated into FR-014, FR-002, FR-016, SC-002, SC-009, and Assumptions section.

- 📁 Files: Updated `specs/002-chapter-template-system/spec.md` with: (1) New "Clarifications" section with Session 2025-11-30 subsection containing 3 Q&A pairs, (2) Modified FR-002, FR-014, FR-016 to incorporate clarified decisions, (3) Modified SC-002, SC-009 to reflect build-time validation, (4) Added assumption about client-side attempt tracking.

- 🔁 Next prompts: Ready for `/sp.plan 002-chapter-template-system` to create implementation plan. Clarifications provide concrete guidance for: (1) Exercise Block component design (attempt state management, hint unlock logic), (2) Template file structure (single file with inline comments per content type), (3) Build pipeline integration (metadata validation script, error reporting).

- 🧠 Reflection: Clarification workflow successfully identified 3 high-impact decisions hidden in otherwise comprehensive spec. User's choice of "attempt-based reveal" (D) over recommended "sequential reveal" (B) indicates preference for more sophisticated learner engagement, requiring client-side state but avoiding server infrastructure. Acceptance of both recommendations (Q2, Q3) shows alignment with best practices. All 3 clarifications are independently testable and don't conflict with existing requirements.

## Evaluation notes (flywheel)

- Failure modes observed: None. All 3 questions answered clearly. User provided one alternative choice (D instead of recommended B) and two acceptances of recommendations. Integration workflow succeeded without conflicts or ambiguities.

- Graders run and results (PASS/FAIL):
  - Question relevance: PASS (all 3 questions materially impact implementation architecture or UX behavior)
  - Answer integration: PASS (all clarifications successfully incorporated into FRs, SCs, and Assumptions without contradictions)
  - Spec consistency: PASS (updated sections maintain formatting, no orphaned placeholders, no contradictory statements)
  - Markdown validity: PASS (Clarifications section properly formatted, Q&A pairs readable)

- Prompt variant (if applicable): N/A - Standard clarification workflow

- Next experiment (smallest change to try): For future clarification sessions, consider starting with "no questions mode" announcement if spec coverage is >95% (all categories Clear/Deferred). This spec had 7/10 Clear, 3/10 Partial, 0/10 Missing, suggesting optional clarification. However, user explicitly requested clarification (Option B), validating the interactive questioning approach.
