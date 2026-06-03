# Implementation Plan: Round End and Game Restart

**Branch**: `004-game-end-restart` | **Date**: 2026-06-03 | **Spec**: [.specify/specs/004-game-end-restart/spec.md](spec.md)

## Summary
The goal is to implement round termination logic (manual by host and automatic when everyone guesses correctly) and a game restart flow that returns participants to the lobby while clearing round-specific state. This involves updating the backend state management, exposing new API endpoints for host actions, and enhancing the frontend `GamePage` with a **host "End Round" control** and a **focused results modal** for all participants.

## Technical Context
**Language/Version**: TypeScript 5.x, Node.js 18+

**Primary Dependencies**: React 18, Vite, Express, Zod, Vitest

**Storage**: In-memory (Room Store)

**Testing**: Vitest (Unit and Integration)

**Target Platform**: Modern Web Browsers

**Project Type**: Web Application

**Performance Goals**: Restart to lobby < 1s; UI updates via polling (2s frequency)

**Constraints**: Principle II (HTTP Polling), Principle VI (90% Coverage)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Ensure compliance with [Scribble Assignment Constitution](.specify/memory/constitution.md):
1. **TypeScript**: Strict mode enabled (Principle I). ✅
2. **Stack**: Frontend (React 18/Vite), Backend (Node/Express/Zod/HTTP Polling). No WebSockets, DBs, Auth (Principle II). ✅
3. **Architecture**: Clean separation (api/services/models/state), functional components, immutable structures (Principle III). ✅
4. **Minimalism**: Minimal memory footprint, no extra features, no unjustified dependencies (Principle IV). ✅
5. **Scope**: Strictly adhere to defined features. No unrelated refactors (Principle V). ✅
6. **Testing**: Vitest for all tests, minimum 90% code coverage, and mandatory automated verification before merge (Principle VI). ✅

## Project Structure

### Documentation (this feature)

```text
.specify/specs/004-game-end-restart/
├── plan.md              # This file
├── research.md          # Modal decisions and UI placement
├── data-model.md        # State transition triggers
├── quickstart.md        # Detailed implementation guide
├── contracts/           
│   └── api.md           # /end and /restart endpoints
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── services/        # roomStore.ts
│   └── api/             # rooms.ts
└── tests/

frontend/
├── src/
│   ├── components/      # RoundEndedModal.tsx
│   ├── pages/           # GamePage.tsx
│   ├── services/        # api.ts
│   └── state/           # roomStore.ts
└── tests/
```

**Structure Decision**: Standard full-stack web structure as detected.

## Complexity Tracking

*No violations.*
