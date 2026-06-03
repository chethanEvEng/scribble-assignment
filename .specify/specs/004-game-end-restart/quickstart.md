# Quickstart: Round End and Restart

## Implementation Order

### 1. Backend: State & Endpoints
- **Service**: Update `roomStore.ts` to reveal word on 'ended' status. Add `endGame` and `restartGame` (with full state reset).
- **Controller**: Update `rooms.ts` to add `/end` and `/restart` endpoints. Add automatic completion check to `/guess`.

### 2. Frontend: API & Action
- **Service**: Add `endGame` and `restartGame` to `api.ts`.
- **Store**: Expose these methods in `roomStore.ts`.

### 3. Frontend: "End Round" Button
- **Page**: `GamePage.tsx`.
- **Action**: Render "End Round" button beside the "Exit Game" button (Host only, `status === 'in-game'`). Use matching styles.

### 4. Frontend: Results Modal
- **Component**: Create `RoundEndedModal.tsx`.
- **Layout**: Vertical stack:
  - Header: "Round Ended" (`section-kicker`).
  - Word: Revealed word (bold, large).
  - Scores: Final scoreboard list.
  - Activity: Scrollable guess history.
  - Footer: "Restart Game" (Host) or Status Message.
- **Styling**: Must match existing `panel` and `card` look.

## Verification
- Host ends round manually -> Modal appears for all.
- All players guess correctly -> Modal appears for all.
- Host restarts -> All returned to lobby, state cleared, scoreboard reset.
