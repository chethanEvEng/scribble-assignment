# Tasks: Gameplay Interaction

**Input**: Design documents from `.specify/specs/003-gameplay-interaction/`

## Phase 1: Setup

- [ ] T001 Create component structure for canvas and activity in frontend/src/components/
- [ ] T002 Update API service for new endpoints in frontend/src/services/api.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Update backend models for game round in backend/src/models/game.ts
- [ ] T004 Update room store state in backend/src/services/roomStore.ts
- [ ] T005 Setup API endpoints for canvas and guessing in backend/src/api/rooms.ts

---

## Phase 3: User Story 1 - Drawer Visual Expression (Priority: P1) 🎯 MVP

**Goal**: Implement drawer canvas interaction

**Independent Test**: Verify drawer canvas actions are rendered

- [ ] T006 [P] [US1] Implement Canvas component in frontend/src/components/Canvas.tsx
- [ ] T007 [P] [US1] Update room store for canvas state in frontend/src/state/roomStore.ts
- [ ] T008 [US1] Implement canvas update API in backend/src/api/rooms.ts

---

## Phase 4: User Story 2 - Guesser Participation and Validation (Priority: P1)

**Goal**: Implement guessing and scoring

**Independent Test**: Verify guess validation and scoring

- [ ] T009 [P] [US2] Implement GuessForm component in frontend/src/components/GuessForm.tsx
- [ ] T010 [US2] Implement guess submission API in backend/src/api/rooms.ts
- [ ] T011 [US2] Add scoring logic in backend/src/services/roomStore.ts

---

## Phase 5: User Story 3 - Role-Based Canvas and UI Interaction (Priority: P1)

**Goal**: Adapt UI based on drawer/guesser role

**Independent Test**: Verify view-only canvas, drawer name, and UI sections for roles

- [ ] T012 [P] [US3] Add drawer role detection in frontend/src/services/api.ts
- [ ] T013 [US3] Implement UI adaptation in frontend/src/components/Canvas.tsx
- [ ] T014 [US3] Implement UI adaptation in frontend/src/components/GuessForm.tsx

---

## Phase 6: User Story 4 - Scoreboard and Activity Synchronization (Priority: P2)

**Goal**: Synchronize scoreboard and guess history

**Independent Test**: Verify scoreboard and activity updates via polling

- [ ] T015 [P] [US4] Implement Activity tracking in frontend/src/components/ResultPanel.tsx
- [ ] T016 [US4] Implement state synchronization polling in frontend/src/services/api.ts

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T017 [P] Disable Guess form on round completion in frontend/src/components/GuessForm.tsx
- [ ] T018 Code cleanup and verify constitution compliance

---

## Dependencies & Execution Order

- **Setup & Foundational (Phases 1-2)**: MUST complete first.
- **User Stories (Phases 3-6)**: Can proceed after foundational phase is complete.

---

## Parallel Opportunities

- T006, T007 (US1)
- T009 (US2)
- T012 (US3)
- T015 (US4)
