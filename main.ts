import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { questionsDifficultyCategoryAmount } from "./lib/questionservice.ts";
import * as gameService from "./lib/gameservice.ts";

const app = new Hono();

app.use("/*", serveStatic({ root: "./static" }));

app.post("/api/create-game", async (c) => {
    const body = await c.req.json<{ displayName: string }>();
    const displayName = body.displayName?.trim();

    if (!displayName) {
        return c.json({ error: "Display name is required" }, 400);
    }

    const account = await gameService.findOrCreateAccount(displayName);
    const roomCode = await gameService.createGameSession(account.id);

    return c.json({ roomCode, accountId: account.id });
});

app.post("/api/join-game", async (c) => {
    const body = await c.req.json<{ displayName: string; roomCode: string }>();
    const displayName = body.displayName?.trim();
    const roomCode = body.roomCode?.trim();

    if (!displayName) {
        return c.json({ error: "Display name is required" }, 400);
    }

    if (!roomCode) {
        return c.json({ error: "Room code is required" }, 400);
    }

    const account = await gameService.findOrCreateAccount(displayName);
    const result = await gameService.joinGameSession(account.id, roomCode);

    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }

    return c.json({ roomCode, accountId: account.id });
});

app.get("/api/session/:roomCode", async (c) => {
    const roomCode = c.req.param("roomCode");
    const session = await gameService.getGameSession(roomCode);

    if (!session) {
        return c.json({ error: "Session not found" }, 404);
    }

    return c.json(session);
});

app.get("/questions", async (c) => {
  // difficulty=easy&category=Sports&amount=3
  const difficulty = c.req.query("difficulty");
  const category = c.req.query("category");
  if (!difficulty || !category) {
    return c.json({ error: "Missing difficulty or category parameter" }, 400);
  }
  const amount = parseInt(c.req.query("amount") || "1");
  return c.json(
    await questionsDifficultyCategoryAmount(difficulty, category, amount),
  );
});
Deno.serve({ port: 5000 }, app.fetch);
