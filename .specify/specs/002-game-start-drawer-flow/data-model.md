# Data Model: Game Start & Drawer Flow

## Entities

### Room
- `code`: string (4-char unique identifier)
- `status`: "lobby" | "game"
- `hostId`: string
- `participants`: Participant[]
- `createdAt`: string
- `updatedAt`: string
- `drawerId`: string | null
- `currentWord`: string | null

### Participant
- `id`: string
- `name`: string
- `joinedAt`: string

## State Transitions
- `lobby` -> `game`: Triggered by `startGame`. On transition:
    - `drawerId` is set to `hostId`.
    - `currentWord` is set to the next available word in the starter list.
