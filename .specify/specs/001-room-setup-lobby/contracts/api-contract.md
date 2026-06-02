# API Contract: Room Management

## Base URL: `/api/rooms`

### 1. Create Room
`POST /`

**Request Body**:
```json
{
  "playerName": "Alice"
}
```

**Response (201 Created)**:
```json
{
  "participantId": "uuid-1",
  "room": {
    "code": "ABCD",
    "status": "lobby",
    "hostId": "uuid-1",
    "isHost": true,
    "participants": [
      { "id": "uuid-1", "name": "Alice", "joinedAt": "timestamp" }
    ]
  }
}
```

---

### 2. Join Room
`POST /:code/join`

**Request Body**:
```json
{
  "playerName": "Bob"
}
```

**Response (200 OK)**:
```json
{
  "participantId": "uuid-2",
  "room": {
    "code": "ABCD",
    "status": "lobby",
    "hostId": "uuid-1",
    "isHost": false,
    "participants": [
      { "id": "uuid-1", "name": "Alice", "joinedAt": "timestamp" },
      { "id": "uuid-2", "name": "Bob", "joinedAt": "timestamp" }
    ]
  }
}
```

**Errors**:
- `400 Bad Request`: "Player name is required"
- `404 Not Found`: "Room not found"

---

### 3. Fetch Room (Polling)
`GET /:code?participantId=uuid`

**Response (200 OK)**:
```json
{
  "room": {
    "code": "ABCD",
    "status": "lobby",
    "hostId": "uuid-1",
    "isHost": false,
    "participants": [...]
  }
}
```

---

### 4. Start Game
`POST /:code/start`

**Request Headers**:
- `x-participant-id`: `uuid` (must match `hostId`)

**Response (200 OK)**:
```json
{
  "success": true
}
```

**Errors**:
- `403 Forbidden`: "Only the host can start the game"
- `400 Bad Request`: "At least 2 players are required to start"
