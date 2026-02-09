-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "creatorId" TEXT NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "finishedAt" DATETIME,
    CONSTRAINT "GameSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameParticipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameParticipant_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameParticipant_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameSessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    CONSTRAINT "GameQuestion_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "participantId" TEXT NOT NULL,
    "gameQuestionId" TEXT NOT NULL,
    "selectedAnswerId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeToAnswer" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlayerAnswer_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "GameParticipant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerAnswer_gameQuestionId_fkey" FOREIGN KEY ("gameQuestionId") REFERENCES "GameQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerAnswer_selectedAnswerId_fkey" FOREIGN KEY ("selectedAnswerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_roomCode_key" ON "GameSession"("roomCode");

-- CreateIndex
CREATE UNIQUE INDEX "GameParticipant_accountId_gameSessionId_key" ON "GameParticipant"("accountId", "gameSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "GameQuestion_gameSessionId_orderIndex_key" ON "GameQuestion"("gameSessionId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAnswer_participantId_gameQuestionId_key" ON "PlayerAnswer"("participantId", "gameQuestionId");
