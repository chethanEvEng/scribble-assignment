# Data Model: Room Setup & Lobby

## Entities

### Room
Represents a game session.

| Field | Type | Description |
|-------|------|-------------|
| `code` | `string` | 4-character uppercase alphanumeric code (unique). |
| `status` | `"lobby" \| "game"` | Current state of the room. |
| `hostId` | `string` | The `id` of the participant who is the host. |
| `participants` | `Participant[]` | List of players currently in the room. |
| `createdAt` | `string` | ISO timestamp of creation. |
| `updatedAt` | `string` | ISO timestamp of last update. |

### Participant
Represents a player in a room.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (UUID). |
| `name` | `string` | Player's display name (minimum 1 character). |
| `joinedAt` | `string` | ISO timestamp when the player joined. |

---

## State Transitions

### 1. Lobby Creation
- **Trigger**: `POST /api/rooms`
- **Initial State**: `status: "lobby"`
- **Action**: Generate unique `code`, create first `Participant`, set `hostId` to this participant's `id`.

### 2. Joining Lobby
- **Trigger**: `POST /api/rooms/:code/join`
- **Condition**: Room exists, `status: "lobby"`.
- **Action**: Create new `Participant`, add to `participants` list.

### 3. Starting Game
- **Trigger**: `POST /api/rooms/:code/start` (Host only)
- **Condition**: Room exists, `status: "lobby"`, `participants.length >= 2`.
- **Action**: Set `status: "game"`.

---

## Validation Rules

### Room Code
- Must be exactly 4 characters.
- Must be alphanumeric.
- Must exist in the system for joining.

### Player Name
- Must be between 1 and 20 characters.
- Cannot be just whitespace.
