# Feature Specification: Game Start & Drawer Flow

**Feature Branch**: `002-game-start-drawer-flow`

**Created**: 2026-06-02

**Status**: Draft

**Input**: User description: "Game Start & Drawer Flow Given a game is starting and player names are trimmed (empty/whitespace-only rejected with a message), When the first round begins, Then the host (or first player) becomes the clearly-identified drawer, and the secret word (deterministically selected from the starter list) is visible only to the drawer."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Player Name Validation for Room Access (Priority: P1)

A user provides a valid player name when creating or joining a room, ensuring no empty or whitespace-only names are accepted.

**Why this priority**: Core prerequisite for session participation.

**Independent Test**: Can be tested by creating/joining a room with empty/whitespace names and verifying rejection.

**Acceptance Scenarios**:

1. **Given** a user is creating or joining a room, **When** they enter an empty or whitespace-only name, **Then** the system rejects the name and displays a clear error message.
2. **Given** a user is creating or joining a room, **When** they enter a valid name (e.g., "Alice"), **Then** the room access is granted.

---

### User Story 2 - Game Start and Drawer Designation (Priority: P1)

The host starts the game, which designates the host as the drawer, who is then identified by being shown the secret word.

**Why this priority**: Core game start mechanic.

**Independent Test**: Can be tested by starting a game as host and verifying drawer designation via secret word visibility.

**Acceptance Scenarios**:

1. **Given** a game is in the lobby, **When** the host starts the game, **Then** the host is designated as the drawer.
2. **Given** a game start, **When** the game starts, **Then** a secret word is deterministically selected for the round from the starter list.
3. **Given** a game has started, **When** the drawer views the game state, **Then** the drawer is shown the secret word, identifying them as the drawer.
4. **Given** a game has started, **When** a non-drawer views the game state, **Then** the non-drawer cannot see the secret word.

### Edge Cases

- *Note: Room joining with an empty name is prevented by US1.*
- *Note: Game start with only 1 player is prevented by existing 001-room-setup-lobby requirements.*
- **Host Disconnection**: If the host disconnects after the game starts, the system MUST end the game immediately and notify all remaining players.
- **Late Joins**: The system MUST disallow players from joining a room after the game has started.


## Clarifications

### Session 2026-06-03
- Q: What happens if the host disconnects immediately after starting the game? → A: End game immediately; notify remaining players.
- Q: What defines "game state" visibility—API endpoint structure or frontend display? → A: Client-side logic (Frontend conditionally renders based on `isDrawer` flag).
- Q: Can players join a room that has already started, and if so, what happens? → A: Disallow late joins; redirect to lobby or error.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST trim player names and reject empty or whitespace-only names during room creation.
- **FR-002**: System MUST designate the host as the drawer upon game start.
- **FR-003**: System MUST deterministically select a secret word from the starter list at the start of the round.
- **FR-004**: System MUST ensure the secret word is accessible only to the designated drawer. The backend provides the word, and the frontend MUST use client-side logic to conditionally hide it for non-drawers.

### Key Entities

- **Room**: Contains game state, `drawerId`, `currentWord`.
- **Participant**: Contains player information and role/drawing status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of room creation requests with invalid names (empty/whitespace) are rejected with a user-friendly error message.
- **SC-002**: Upon game start, a drawer is always assigned to the host.
- **SC-003**: The secret word is visible 100% of the time only to the drawer in the game state (0% leaks).
- **SC-004**: Word selection is consistent and deterministic.

## Assumptions

- The starter list of words is available in `backend/src/seed/starterData.ts`.
- Deterministic selection implies a consistent algorithm or list order.
