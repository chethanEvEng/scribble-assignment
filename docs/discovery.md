# Discovery

This document outlines the findings, architectural analysis, starter codebase gaps, and implementation assumptions identified during the initial code discovery phase for **Scribble** — a multiplayer drawing and guessing game.

## Tech Stack:
Scribble is a brownfield project consisting of:
*   **Backend**: A Node.js + Express service in TypeScript. It manages game rooms in memory using an ES modules setup.
*   **Frontend**: A React (v18) + React Router (v6) client built using Vite, using standard CSS for styles and a custom store (`RoomStore`) for synchronized state management.

## What's already implemented:
- The code base currently implements basic scaffold
- Starter routes and screens for Start, Create Room, Join Room, Lobby, and Game are implemented
- Starter room API with in-memory state is implemented
- The words to be used in the game are defined in Starter seed data

### Starter seed data:
- words: rocket, pizza, castle, guitar, sunflower
- roles: drawer, guesser

### Features implemented
- app shell and page routing
- branded landing page and cleaned starter UI
- create room flow
- join room by code flow
- fetch room snapshot flow
- in-memory room storage on the backend
- lobby participant display from the latest fetched snapshot
- game screen placeholders for canvas, guess input, scoreboard, and results
- basic light UI styling

### Backend endpoints currently available:
- GET /health
- POST /rooms
- POST /rooms/:code/join
- GET /rooms/:code

## Features not implemented yet:

- host behavior or host-only permissions
- automatic lobby polling
- start game flow
- drawer assignment
- secret word visibility rules
- drawing interaction
- clear canvas action
- guess submission and synced history
- scoring
- result state
- restart flow

## Issues Found:
- Lobby not refreshing when participants exit.
- There is no way to go back to home page from Lobby

## Business Scenarios to be implemented
### Scenario 1 — Room Setup & Lobby
Given a player wants to host or join a drawing game, When they create or join a room via a unique code, Then the creator is automatically the host; invalid/empty codes are rejected with clear feedback; rooms are fully isolated; the lobby refreshes via polling (~2s); and only the host can start the game once at least 2 players are present.

### Scenario 2 — Game Start & Drawer Flow
Given a game is starting and player names are trimmed (empty/whitespace-only rejected with a message), When the first round begins, Then the host (or first player) becomes the clearly-identified drawer, and the secret word (deterministically selected from the starter list) is visible only to the drawer.

### Scenario 3 — Gameplay Interaction
Given a round is active with a drawer and guessers (all scores start at 0), When the drawer draws/clears the canvas and guessers submit their guesses, Then the drawing is visible on the drawer's screen; guesses are trimmed, case-insensitively compared, and empty ones rejected; the guess history is synced to all players via polling; correct guesses score 100 (incorrect add 0).

### Scenario 4 — Result, Restart & Final Validation
Given a round has ended, When the result state is displayed and the host restarts, Then all players see the correct word, final scores, and full guess history; on restart, everyone returns to the lobby with players preserved and all round state cleared.


## Assumptions
The following items are intentionally out of scope for this lab:
- WebSockets or real-time sync
- databases or persistent storage
- authentication, accounts, or sessions
- deployment, hosting, CI, or Docker work
- new state-management or routing libraries beyond what the starter ships
- multiple rounds, drawer rotation, timers, countdowns, speed bonuses, or drawer bonuses
- custom or random word packs. Only the words from seed data are used
- spectator mode
- moderation features such as kick or mute
- room passwords or invite links
- rewriting the starter from scratch
- unjustified top-level dependencies
- unrelated refactors

## Relevant Files
- `backend/src/models/game.ts` - Defines backend room, participant, and role types.
- `backend/src/services/roomStore.ts` - In-memory room map, CRUD helpers, and snapshot converters.
- `backend/src/api/rooms.ts` - Implements REST endpoints for creating, joining, and fetching rooms.
- `backend/src/api/schemas.ts` - Request body validation using Zod.
- `backend/src/seed/starterData.ts` - Starter seed data for words and roles.
- `frontend/src/services/api.ts` - Fetch-based HTTP request helper for communication with the backend.
- `frontend/src/state/roomStore.ts` - React store managing current room, participant ID, loading state, and errors.
