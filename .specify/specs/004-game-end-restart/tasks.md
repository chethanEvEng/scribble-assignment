# Tasks: Round End and Game Restart

**Input**: Design documents from `/.specify/specs/004-game-end-restart/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Vitest unit and integration tests are required as per Principle VI and the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify project structure and branch `004-game-end-restart`
- [ ] T002 Update `GEMINI.md` to point to the current implementation plan (already completed)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T003 [P] Add `RoomStatus` 'ended' and reveal logic in `backend/src/models/game.ts`
- [ ] T004 [P] Update `toRoomSnapshot` in `backend/src/services/roomStore.ts` to reveal `currentWord` when status is 'ended'
- [ ] T005 [P] Implement `endGame(code, participantId)` logic in `backend/src/services/roomStore.ts` (checks if participant is host)
- [ ] T006 [P] Implement `restartGame(code, participantId)` logic in `backend/src/services/roomStore.ts` (checks if participant is host, clears state per data-model.md)
- [ ] T007 Add `end` and `restart` endpoints to `backend/src/api/rooms.ts`
- [ ] T008 [P] Add `endGame` and `restartGame` methods to `frontend/src/services/api.ts`
- [ ] T009 [P] Expose `endGame` and `restartGame` in `frontend/src/state/roomStore.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 5 - Automatic Round Completion (Priority: P1) 🎯 MVP

**Goal**: The system automatically ends the round once all guessers have identified the secret word.

**Independent Test**: Have all guessers submit the correct word and verify the round status transitions to 'ended' immediately.

### Tests for User Story 5

- [ ] T010 [P] [US5] Add unit test for automatic completion logic in `backend/src/services/roomStore.test.ts`
- [ ] T011 [US5] Add integration test for automatic completion via guess endpoint in `backend/src/api/rooms.test.ts`

### Implementation for User Story 5

- [ ] T012 [US5] Implement automatic completion check in `POST /:code/guess` handler in `backend/src/api/rooms.ts`

---

## Phase 4: User Story 1 - Round Results Visibility (Priority: P1)

**Goal**: All players see the correct word, final scores, and full guess history when the round ends.

**Independent Test**: End a round and verify the `RoundEndedModal` appears with all required content.

### Tests for User Story 1

- [ ] T013 [P] [US1] Add unit tests for `RoundEndedModal` rendering in `frontend/src/components/RoundEndedModal.test.tsx`
- [ ] T014 [US1] Add integration test for modal visibility in `frontend/src/pages/GamePage.test.tsx`

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create `frontend/src/components/RoundEndedModal.tsx` with vertical stack layout (Title, Word, Scores, History, Footer)
- [ ] T016 [US1] Integrate `RoundEndedModal` into `frontend/src/pages/GamePage.tsx` based on `room.status === 'ended'`
- [ ] T017 [P] [US1] Apply `panel` and `card` styling to the modal in `frontend/src/styles/app.css`

---

## Phase 5: User Story 4 - Manual Round Termination (Priority: P2)

**Goal**: The host can manually end a round at any time.

**Independent Test**: Host clicks "End Round" and verify round transitions to results.

### Tests for User Story 4

- [ ] T018 [P] [US4] Add unit test for `endGame` host check in `backend/src/services/roomStore.test.ts`
- [ ] T019 [US4] Add integration test for manual end round endpoint in `backend/src/api/rooms.test.ts`

### Implementation for User Story 4

- [ ] T020 [US4] Render "End Round" button beside "Exit Game" in `frontend/src/pages/GamePage.tsx` (Host only)
- [ ] T021 [US4] Add `handleEndRound` action to `frontend/src/pages/GamePage.tsx` calling `roomStore.endGame()`

---

## Phase 6: User Story 2 & 3 - Host Game Restart & Role-Based Actions (Priority: P1/P2)

**Goal**: Host can transition the room back to the lobby state; only host sees the "Restart" button.

**Independent Test**: Host clicks "Restart Game" on results screen and verify everyone returns to lobby with cleared state.

### Tests for User Stories 2 & 3

- [ ] T022 [P] [US2] Add unit test for state clearing in `backend/src/services/roomStore.test.ts`
- [ ] T023 [US2] Add integration test for restart endpoint in `backend/src/api/rooms.test.ts` (Verify SC-003: < 1s latency)

### Implementation for User Stories 2 & 3

- [ ] T024 [US2] Add "Restart Game" button to `RoundEndedModal.tsx` footer (Host only)
- [ ] T025 [US2] Add "Waiting for host..." message to `RoundEndedModal.tsx` footer (Non-hosts)
- [ ] T026 [US2] Implement `handleRestart` in `RoundEndedModal.tsx` calling `roomStore.restartGame()`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T027 [P] Verify 90% code coverage for new logic in `backend/` and `frontend/`
- [ ] T028 [P] Ensure all new UI follows existing `app.css` conventions
- [ ] T029 Run `quickstart.md` validation loop

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup & Foundational (Phases 1-2)**: MUST be completed first.
- **User Stories (Phases 3-6)**: 
  - US5 (Automatic Completion) is a good starting point for backend logic.
  - US1 (Visibility) is the primary UI task.
  - US4 (Manual End) and US2/3 (Restart) build on the 'ended' state.
- **Polish (Final Phase)**: After all stories are verified.

### Parallel Opportunities

- Backend changes in Phase 2 (T003-T007) can be done in parallel with Frontend boilerplate (T008-T009).
- Once Phase 2 is done, US5 (Backend) and US1 (Frontend) can start in parallel.
- All tasks marked [P] have no file conflicts or strict sequential dependencies.

---

## Implementation Strategy

### MVP First (Automatic Completion & Results Visibility)

1. Complete Foundation.
2. Implement US5 (Automatic End) + US1 (Results Modal).
3. **STOP and VALIDATE**: Play a game, guess everything, see the modal with correct word and scores.

### Incremental Delivery

1. Add US4 (Manual End) -> Test host control.
2. Add US2/3 (Restart) -> Test full game loop (Play -> End -> Lobby -> Play again).

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Verify tests fail before implementing
- Commit after each task or logical group
