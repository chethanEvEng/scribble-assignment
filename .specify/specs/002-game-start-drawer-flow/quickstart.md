# Quickstart: Game Start & Drawer Flow

This feature implements room access validation, game start drawer designation, and secret word privacy.

## Key Changes
1. **Name Validation**: `createRoom` and `joinRoom` now trim name inputs and reject empty/whitespace-only values.
2. **Game Start**: Starting the game assigns the host as the drawer and selects a secret word.
3. **Privacy**: The `currentWord` is sensitive and only provided in the `RoomSnapshot` to the assigned drawer.
