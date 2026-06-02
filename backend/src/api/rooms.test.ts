import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

const app = createApp();

describe("rooms API integration", () => {
  it("POST /rooms rejects empty playerName with 'Player name invalid'", async () => {
    const response = await request(app)
      .post("/rooms")
      .send({ playerName: "" });
    
    expect(response.status).toBe(400);
    // This will currently fail, as the errorHandler masks the Zod message
    expect(response.body.message).toBe("Player name invalid");
  });

  it("POST /rooms/:code/join rejects whitespace playerName with 'Player name invalid'", async () => {
    // First create a room
    const createRes = await request(app).post("/rooms").send({ playerName: "Host" });
    const code = createRes.body.room.code;

    const joinRes = await request(app)
      .post(`/rooms/${code}/join`)
      .send({ playerName: "   " });
      
    expect(joinRes.status).toBe(400);
    expect(joinRes.body.message).toBe("Player name invalid");
  });
});
