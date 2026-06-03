# API Contract: Game End and Restart

## New Endpoints

### POST /api/rooms/:code/end
Ends the current round manually. Available only to the host.

- **Headers**:
  - `x-participant-id`: The ID of the participant (must be host)
- **Response**:
  - `200 OK`: `{ "success": true }`
  - `403 Forbidden`: If not host.

### POST /api/rooms/:code/restart
Restarts the game to the lobby state. Available only to the host.

- **Headers**:
  - `x-participant-id`: The ID of the participant (must be host)
- **Response**:
  - `200 OK`: `{ "success": true }`
  - `403 Forbidden`: If not host.

## Modified Behavior

### GET /api/rooms/:code
- **Behavior**: If `status === 'ended'`, `currentWord` is revealed to all participants.

### POST /api/rooms/:code/guess
- **Behavior**: Server checks for automatic completion after each guess. 
- **Condition**: All guessers have correctly identified the word.
- **Effect**: Room status transitions to `ended`.
