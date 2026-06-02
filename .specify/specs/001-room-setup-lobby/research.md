# Research: Room Setup & Lobby

## Decision 1: Polling Implementation
**Decision**: Use a managed polling cycle within the `RoomStore` triggered by the `LobbyPage`.

**Rationale**: Centralizing the polling logic in the store ensures that state updates are handled consistently. The `LobbyPage` will call `roomStore.startPolling()` on mount and `roomStore.stopPolling()` on unmount. Using `setInterval` inside the store with a guard to prevent overlapping requests is the most robust approach for the requested 2s interval.

**Alternatives considered**:
- `useEffect` with `setInterval` directly in `LobbyPage`: Rejected because it fragments the state management logic and makes it harder to test the polling behavior in isolation.

---

## Decision 2: Host Tracking
**Decision**: Add `hostId: string` to the `Room` object and `isHost: boolean` to the `RoomSnapshot`.

**Rationale**: The `hostId` provides a single source of truth for who has administrative privileges. Including a derived `isHost` flag in the snapshot simplifies the frontend logic, allowing the UI to check `participantId === room.hostId` or use the flag directly.

**Alternatives considered**:
- Make the first participant in the array the host: Rejected because it's fragile if the array order changes or if we later add features to transfer host status.

---

## Decision 3: Start Game Notification
**Decision**: Transition room `status` from `"lobby"` to `"game"`.

**Rationale**: Since all participants are polling the room state every 2s, they will eventually receive the `"game"` status. The `LobbyPage` will have a `useEffect` that navigates to `/game` as soon as the status changes.

---

## Decision 4: Error Handling & Validation
**Decision**: Use Zod on the backend to validate both structure and business rules (e.g., non-empty name), and use a custom `HttpError` with descriptive messages.

**Rationale**: Zod provides a unified way to handle validation. By catching `ZodError` in the backend's central error handler, we can return consistent error objects to the frontend. The `JoinRoomPage` will catch these and display the `message` field to the user.

**Alternatives considered**:
- Manual validation in the route handler: Rejected as it's more verbose and prone to inconsistency.
