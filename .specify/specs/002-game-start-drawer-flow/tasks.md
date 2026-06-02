# Tasks: Game Start & Drawer Flow

**Input**: Design documents from `.specify/specs/002-game-start-drawer-flow/`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Dependencies
- US1 (Name Validation) -> Independent
- US2 (Game Start) -> Depends on US1
- US3 (Secret Word Visibility) -> Depends on US2

## MVP Scope
- User Story 1: Player Name Validation for Room Access

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize feature structure and ensure backend/frontend readiness

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T002 [P] Update Room and Participant model in backend/src/models/game.ts to include drawerId and currentWord

---

## Phase 3: [US1] Player Name Validation for Room Access (Priority: P1)

**Goal**: Ensure room access requires valid, non-empty player names.

**Independent Test**: Can be tested by creating/joining a room with empty/whitespace names and verifying rejection.

- [ ] T003 [P] [US1] Update `createRoom` and `joinRoom` name normalization in backend/src/services/roomStore.ts
- [ ] T004 [US1] Update room creation/join endpoints for error handling in backend/src/api/rooms.ts

---

## Phase 4: [US2] Game Start and Drawer Designation (Priority: P1)

**Goal**: Implement game start mechanics (host drawer, secret word).

**Independent Test**: Can be tested by starting a game as host and verifying drawer designation by looking at the secret word(only visible to drawer).

- [ ] T005 [P] [US2] Implement `startGame` logic (assign host drawer, pick random word) in backend/src/services/roomStore.ts
- [ ] T006 [US2] Add/update start game endpoint in backend/src/api/rooms.ts

---

## Phase 5: [US3] Secret Word Visibility (Priority: P2)

**Goal**: Ensure secret word is visible only to the drawer.

**Independent Test**: Can be tested by checking game state response for the drawer versus other participants.

- [ ] T007 [P] [US3] Update `toRoomSnapshot` in backend/src/services/roomStore.ts to restrict `currentWord` access
- [ ] T008 [US3] Update `RoomSnapshot` interface in frontend/src/services/api.ts to include drawerId/currentWord

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T009 Final review of all changes for compliance with project constitution
