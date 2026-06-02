# Quickstart: Room Setup & Lobby

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development servers:
   ```bash
   npm run dev
   ```

## Manual Verification
1. Open `http://localhost:5173` (Window 1).
2. Click **Create Room**, enter your name, and submit.
3. Observe the Room Code (e.g., `ABCD`) and verify you see "Host" badge.
4. Open a private window or another browser at `http://localhost:5173` (Window 2).
5. Click **Join Room**, enter your name and the Room Code from Window 1.
6. **Verify Polling**: Window 1 should automatically show the new participant within 2 seconds.
7. **Verify Start Restrictions**: 
   - Window 2 should NOT have a "Start Game" button.
   - Window 1 should have a "Start Game" button that is enabled once Window 2 joins.

## Automated Testing
Run the following commands to verify backend and frontend logic:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```
