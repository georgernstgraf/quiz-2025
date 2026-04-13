import { PrismaClient } from "../prisma/generated/client.ts";

const prisma = new PrismaClient();

export interface SessionInfo {
  roomCode: string;
  status: string;
  creatorId: string;
  creatorName: string;
  createdAt: Date;
  participants: ParticipantInfo[];
}

export interface ParticipantInfo {
  id: string;
  displayName: string;
  totalScore: number;
  joinedAt: Date;
}

function generateRoomCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function findOrCreateAccount(displayName: string) {
  let account = await prisma.account.findFirst({
    where: { displayName },
  });

  if (!account) {
    account = await prisma.account.create({
      data: { displayName },
    });
  }

  return account;
}

export async function createGameSession(creatorId: string): Promise<string> {
  let roomCode = generateRoomCode();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const existing = await prisma.gameSession.findUnique({
      where: { roomCode },
    });

    if (!existing) {
      break;
    }

    roomCode = generateRoomCode();
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error("Failed to generate unique room code");
  }

  const session = await prisma.gameSession.create({
    data: {
      roomCode,
      creatorId,
      status: "WAITING",
    },
  });

  await prisma.gameParticipant.create({
    data: {
      accountId: creatorId,
      gameSessionId: session.id,
      totalScore: 0,
    },
  });

  return roomCode;
}

export async function joinGameSession(
  accountId: string,
  roomCode: string,
): Promise<{ success: boolean; error?: string }> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
  });

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  if (session.status !== "WAITING") {
    return { success: false, error: "Session already in progress" };
  }

  const existingParticipant = await prisma.gameParticipant.findFirst({
    where: {
      accountId,
      gameSessionId: session.id,
    },
  });

  if (existingParticipant) {
    return { success: true };
  }

  await prisma.gameParticipant.create({
    data: {
      accountId,
      gameSessionId: session.id,
      totalScore: 0,
    },
  });

  return { success: true };
}

export async function getGameSession(
  roomCode: string,
): Promise<SessionInfo | null> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
    include: {
      creator: true,
      participants: {
        include: {
          account: true,
        },
        orderBy: {
          joinedAt: "asc",
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  return {
    roomCode: session.roomCode,
    status: session.status,
    creatorId: session.creatorId,
    creatorName: session.creator.displayName,
    createdAt: session.createdAt,
    participants: session.participants.map((p) => ({
      id: p.id,
      displayName: p.account.displayName,
      totalScore: p.totalScore,
      joinedAt: p.joinedAt,
    })),
  };
}

export async function getSessionParticipants(
  roomCode: string,
): Promise<ParticipantInfo[]> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
    include: {
      participants: {
        include: {
          account: true,
        },
        orderBy: {
          joinedAt: "asc",
        },
      },
    },
  });

  if (!session) {
    return [];
  }

  return session.participants.map((p) => ({
    id: p.id,
    displayName: p.account.displayName,
    totalScore: p.totalScore,
    joinedAt: p.joinedAt,
  }));
}

export async function startGameSession(
  roomCode: string,
  creatorId: string,
): Promise<{ success: boolean; error?: string }> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
  });

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  if (session.creatorId !== creatorId) {
    return { success: false, error: "Only creator can start session" };
  }

  if (session.status !== "WAITING") {
    return {
      success: false,
      error: "Session is not in a state that can be started",
    };
  }

  await prisma.gameSession.update({
    where: { id: session.id },
    data: {
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
  });

  return { success: true };
}

export async function advanceGameSession(
  roomCode: string,
): Promise<{
  success: boolean;
  error?: string;
  finished?: boolean;
  currentQuestionIndex?: number;
}> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
    include: {
      questions: true,
    },
  });

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  if (session.status !== "IN_PROGRESS") {
    return {
      success: false,
      error: "Session must be in progress to advance",
    };
  }

  const questionCount = session.questions.length;

  if (questionCount === 0) {
    await prisma.gameSession.update({
      where: { id: session.id },
      data: {
        status: "FINISHED",
        finishedAt: new Date(),
      },
    });
    return { success: true, finished: true, currentQuestionIndex: 0 };
  }

  const nextIndex = session.currentQuestionIndex + 1;

  if (nextIndex >= questionCount) {
    await prisma.gameSession.update({
      where: { id: session.id },
      data: {
        status: "FINISHED",
        finishedAt: new Date(),
        currentQuestionIndex: questionCount,
      },
    });
    return {
      success: true,
      finished: true,
      currentQuestionIndex: questionCount,
    };
  }

  await prisma.gameSession.update({
    where: { id: session.id },
    data: {
      currentQuestionIndex: nextIndex,
    },
  });

  return { success: true, finished: false, currentQuestionIndex: nextIndex };
}

export async function finishGameSession(
  roomCode: string,
): Promise<{ success: boolean; error?: string }> {
  const session = await prisma.gameSession.findUnique({
    where: { roomCode },
  });

  if (!session) {
    return { success: false, error: "Session not found" };
  }

  if (session.status === "FINISHED") {
    return { success: false, error: "Session already finished" };
  }

  await prisma.gameSession.update({
    where: { id: session.id },
    data: {
      status: "FINISHED",
      finishedAt: new Date(),
    },
  });

  return { success: true };
}
