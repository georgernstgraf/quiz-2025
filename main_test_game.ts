import { assertEquals } from "@std/assert";

const BASE_URL = "http://localhost:5000";

let testServer: Deno.ChildProcess | null = null;

async function startServer(): Promise<void> {
  testServer = new Deno.Command("deno", {
    args: ["run", "-A", "--env-file=.env", "main.ts"],
  }).spawn();
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

function stopServer(): void {
  if (testServer) {
    testServer.kill();
    testServer = null;
  }
}

Deno.test(
  "Game Service - Create Game API",
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  async (t) => {
    await startServer();

    await t.step("creates game with valid displayName", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: "TestPlayer1" }),
      });

      assertEquals(response.status, 200);
      const data = await response.json();
      assertEquals(typeof data.roomCode, "string");
      assertEquals(data.roomCode.length, 6);
      assertEquals(/^\d{6}$/.test(data.roomCode), true);
      assertEquals(typeof data.accountId, "string");
    });

    await t.step("rejects empty displayName", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: "" }),
      });

      assertEquals(response.status, 400);
      const data = await response.json();
      assertEquals(data.error, "Display name is required");
    });

    await t.step("rejects missing displayName", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      assertEquals(response.status, 400);
    });

    await t.step("trims whitespace from displayName", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: "  TrimmedName  " }),
      });

      assertEquals(response.status, 200);
    });

    await stopServer();
  },
);

Deno.test(
  "Game Service - Join Game API",
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  async (t) => {
    await startServer();

    let roomCode: string;

    await t.step("setup: create a game first", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: "HostPlayer" }),
      });
      const data = await response.json();
      roomCode = data.roomCode;
    });

    await t.step("joins existing game with valid room code", async () => {
      const response = await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: "JoiningPlayer",
          roomCode,
        }),
      });

      assertEquals(response.status, 200);
      const data = await response.json();
      assertEquals(data.roomCode, roomCode);
      assertEquals(typeof data.accountId, "string");
    });

    await t.step("rejects invalid room code", async () => {
      const response = await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: "TestPlayer",
          roomCode: "999999",
        }),
      });

      assertEquals(response.status, 400);
      const data = await response.json();
      assertEquals(data.error, "Session not found");
    });

    await t.step("rejects missing room code", async () => {
      const response = await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: "TestPlayer",
        }),
      });

      assertEquals(response.status, 400);
      const data = await response.json();
      assertEquals(data.error, "Room code is required");
    });

    await t.step("rejects missing displayName", async () => {
      const response = await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode: "123456",
        }),
      });

      assertEquals(response.status, 400);
      const data = await response.json();
      assertEquals(data.error, "Display name is required");
    });

    await t.step("allows same player to rejoin", async () => {
      const response = await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: "HostPlayer",
          roomCode,
        }),
      });

      assertEquals(response.status, 200);
    });

    await stopServer();
  },
);

Deno.test(
  "Game Service - Session API",
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  async (t) => {
    await startServer();

    let roomCode: string;
    let creatorId: string;

    await t.step("setup: create a game", async () => {
      const response = await fetch(`${BASE_URL}/api/create-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: "SessionHost" }),
      });
      const data = await response.json();
      roomCode = data.roomCode;
      creatorId = data.accountId;
    });

    await t.step("returns session info for valid room code", async () => {
      const response = await fetch(`${BASE_URL}/api/session/${roomCode}`);

      assertEquals(response.status, 200);
      const data = await response.json();
      assertEquals(data.roomCode, roomCode);
      assertEquals(data.status, "WAITING");
      assertEquals(data.creatorId, creatorId);
      assertEquals(data.creatorName, "SessionHost");
      assertEquals(Array.isArray(data.participants), true);
      assertEquals(data.participants.length, 1);
      assertEquals(data.participants[0].displayName, "SessionHost");
    });

    await t.step("returns 404 for invalid room code", async () => {
      const response = await fetch(`${BASE_URL}/api/session/999999`);

      assertEquals(response.status, 404);
      const data = await response.json();
      assertEquals(data.error, "Session not found");
    });

    await t.step("shows multiple participants after join", async () => {
      await fetch(`${BASE_URL}/api/join-game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: "SecondPlayer",
          roomCode,
        }),
      });

      const response = await fetch(`${BASE_URL}/api/session/${roomCode}`);
      const data = await response.json();
      assertEquals(data.participants.length, 2);
      assertEquals(data.participants[0].displayName, "SessionHost");
      assertEquals(data.participants[1].displayName, "SecondPlayer");
    });

    await t.step("starts the session with creator", async () => {
      const response = await fetch(
        `${BASE_URL}/api/session/${roomCode}/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accountId: creatorId }),
        },
      );

      assertEquals(response.status, 200);
      const data = await response.json();
      assertEquals(data.success, true);

      const statusResponse = await fetch(`${BASE_URL}/api/session/${roomCode}`);
      const statusData = await statusResponse.json();
      assertEquals(statusData.status, "IN_PROGRESS");
    });

    await t.step("advances and finishes session", async () => {
      const advanceResponse = await fetch(
        `${BASE_URL}/api/session/${roomCode}/advance`,
        {
          method: "POST",
        },
      );
      assertEquals(advanceResponse.status, 200);
      const advanceData = await advanceResponse.json();
      assertEquals(typeof advanceData.finished, "boolean");

      const finishResponse = await fetch(
        `${BASE_URL}/api/session/${roomCode}/finish`,
        {
          method: "POST",
        },
      );
      assertEquals(finishResponse.status, 200);
      const finishData = await finishResponse.json();
      assertEquals(finishData.success, true);

      const endedResponse = await fetch(`${BASE_URL}/api/session/${roomCode}`);
      const endedData = await endedResponse.json();
      assertEquals(endedData.status, "FINISHED");
    });

    await stopServer();
  },
);
