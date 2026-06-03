# Research: Round End and Game Restart

## Decision 1: Frontend Results View (Modal)
- **Decision**: Implement the round results as a **Modal** component.
- **Rationale**: Provides a focused, high-impact view that clearly separates the end-of-round state from the active gameplay. Ensures all players acknowledge the final results before any new actions (like restart) occur.
- **Styling**: MUST strictly follow the existing UI's `panel`, `card`, and `button` CSS variables/classes for seamless visual integration.

## Decision 2: Modal Layout
- **Decision**: Vertical stack layout.
  - **Header**: "Round Ended" title (`section-kicker` style).
  - **Revealed Word**: The secret word displayed prominently (`secret-word` style).
  - **Final Scores**: List of participants and their final points.
  - **Guess History**: Scrollable list of all guesses made.
  - **Footer**: Action buttons or status messages.
- **Rationale**: Logical flow from conclusion (title/word) to detailed results (scores/history) to next steps (actions).

## Decision 3: Host Action - End Round
- **Decision**: Render an "End Round" button beside the existing "Exit Game" button for the host.
- **Rationale**: High visibility and accessibility for the host to manage the game flow. Placing it next to a global action button ("Exit Game") keeps host-specific controls together.
- **Styling**: MUST match the "Exit Game" button's styling.

## Decision 4: Automatic Completion Trigger
- **Decision**: Backend `/guess` handler will check if the number of correct guessers equals `total_participants - 1`.
- **Rationale**: Direct event-driven transition when the win condition is met by all eligible players.

## Decision 5: Data revealing
- **Decision**: Server reveals `currentWord` in the room snapshot only when `status === 'ended'`.
- **Rationale**: Maintains the integrity of the game while ensuring the final result is transparent to all.
