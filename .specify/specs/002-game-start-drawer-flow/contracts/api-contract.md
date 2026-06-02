# API Contract: Game Start & Drawer Flow

## Room Creation and Join
- **Endpoint**: `POST /rooms` or `POST /rooms/:code/join`
- **Request Body**: `{ playerName: string }`
- **Validation**: `playerName` must be trimmed; empty/whitespace-only strings result in 400 Bad Request.

## Game Start
- **Endpoint**: `POST /rooms/:code/start`
- **Headers**: `x-participant-id` (Host ID required)
- **Response**: `{ success: boolean }`

## Game State (Room Snapshot)
- **Endpoint**: `GET /rooms/:code`
- **Response**: 
```json
{
  "code": "ABCD",
  "status": "game",
  "hostId": "...",
  "isHost": boolean,
  "participants": [...],
  "availableWords": [...],
  "roles": [...],
  "drawerId": "...",
  "currentWord": "..." // Only visible if viewer is the drawer
}
```
