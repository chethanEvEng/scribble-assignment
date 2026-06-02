# Research: Game Start & Drawer Flow

## Decisions

- **Decision**: Reject empty/whitespace-only player names during room creation and joining.
- **Rationale**: Ensures meaningful participant names and consistent data quality, improving UX.
- **Alternatives considered**: Allow empty names (bad UX), trim and assign default (potential for duplicate names/confusion).

- **Decision**: Host is designated as the drawer on game start.
- **Rationale**: Simplest and most intuitive flow for initial game rounds.
- **Alternatives considered**: Random assignment (host is more predictable), rotating drawer (not needed for first round).

- **Decision**: Secret word is deterministically selected from the starter list.
- **Rationale**: Simplifies testing and predictability for initial rounds.
- **Alternatives considered**: Random word selection (harder to test), dynamic word list (out of scope).

- **Decision**: Secret word visibility restricted to drawer.
- **Rationale**: Essential for game integrity (drawer must know it, guessers must not).
- **Alternatives considered**: Pass word to all (ruins game), server-only knowledge (drawer needs to know it to start drawing).
