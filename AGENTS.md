# AGENTS.md - Coding Agent Guidelines for Quiz-2025

## Project Overview

A Deno-based trivia quiz application that fetches questions from the OpenTDB API and serves them via a Hono web server. Uses Prisma ORM with SQLite for persistence. Supports single-player and multiplayer game modes.

## Build/Lint/Test Commands

```bash
# Development server with hot reload
deno task dev

# Run server (production)
deno task server

# Type checking
deno task check

# Linting
deno task lint

# Run all tests
deno test -A

# Run a single test file
deno test -A path/to/test.ts

# Run a specific test by name
deno test -A --filter "test name" path/to/test.ts

# Prisma commands
deno task pv       # prisma validate
deno task pg       # prisma generate
deno task pmd      # prisma migrate dev
deno task pmr      # prisma migrate reset
deno task pms      # prisma migrate status
deno task studio   # prisma studio

# Database seeding (~20 min runtime)
deno task seed

# Seed specific categories
deno task seed "Sports" "Geography"
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Run `deno task pmr` (migrate reset - generates client)
3. Run `deno task seed` (populates database)

### Database Configuration

- `DATABASE_URL` in `.env` is relative to the `prisma/` folder
- Example: `DATABASE_URL=file:./dev.db` points to `prisma/dev.db`

### Prisma Schema Changes

After modifying `prisma/schema.prisma`, run these commands in order:

```bash
deno task pg    # prisma generate - regenerate client types
deno task pmd   # prisma migrate dev - create and apply migration
```

## Code Style Guidelines

### Imports

```typescript
// Deno imports use jsr: or npm: specifiers
import { Hono } from "hono";
import { assertEquals } from "@std/assert";
import { PrismaClient } from "../prisma/generated/client.ts";

// Import organization: external -> internal (separated by blank line)
import he from "he";
import { API_MAX_AMOUNT } from "./lib/config.ts";
import * as api from "./lib/apiaccess.ts";
```

- Use `jsr:` for Deno standard library and JSR packages
- Use `npm:` for npm packages not available on JSR
- Use `.ts` extension for local imports
- Use `* as` namespace imports for modules with multiple exports
- Group imports: external dependencies first, then internal modules

### Formatting

- Indent with 4 spaces (deno default)
- Semicolons at end of statements
- Max line length: flexible, but prefer readability
- Trailing commas in multi-line structures

### Types

```typescript
// Prefer explicit interface definitions
export interface QuestionCreateData {
    question: string;
    difficulty: string;
    category: string;
    type: string;
    correct_answer: string;
    incorrect_answers: string[];
}

// Use union types for limited options
type SessionStatus = "WAITING" | "IN_PROGRESS" | "FINISHED";

// Type assertions for external API responses
const result = await response.json() as Response;

// Use Map for key-value lookups
const api_result_codes = new Map<number, string>([
    [0, "Success"],
    [1, "No Results"],
]);
```

### Naming Conventions

- **Files**: lowercase with underscores (`questionservice.ts`, `api_access.ts`)
- **Interfaces**: PascalCase (`QuestionCreateData`, `ApiQuestionData`)
- **Functions**: camelCase (`getAllQuestions`, `findOrCreateAnswer`)
- **Constants**: SCREAMING_SNAKE_CASE for module-level (`API_HUG_MS`, `DATABASE_URL`)
- **Private methods**: prefix with underscore or use `private` keyword
- **Prisma models**: PascalCase singular (`Question`, `Category`, `GameSession`)

### Error Handling

```typescript
// Use try-catch for async operations with meaningful error messages
try {
    const answer = await prisma.answer.create({ data: { answer: answerText } });
} catch (_error) {
    // Handle race conditions gracefully
    const answer = await prisma.answer.findFirst({ where: { answer: answerText } });
    if (!answer) {
        throw new Error(`Failed to create or find answer: ${answerText}`);
    }
}

// Type narrowing for caught errors
catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${errorMessage}`);
}

// Return null for expected "not found" cases
if (existingQuestion) {
    return null; // Not an error, just duplicate
}
```

### Async/Await Patterns

```typescript
// Prefer async/await over .then()
const result = await prisma.question.findMany();

// Parallel operations with Promise.all
const allAnswers = await Promise.all([
    findOrCreateAnswer(new_question.correct_answer),
    ...new_question.incorrect_answers.map(a => findOrCreateAnswer(a)),
]);

// Top-level await is allowed
await reset_token();
```

### API Response Handling

```typescript
// Use interface for API responses
export type Response = {
    response_code: number;
    results?: ApiQuestionData[];
    [key: string]: unknown;
};

// Validate response codes
if (result.response_code !== 0) {
    throw new Error(`Error from API: ${result.response_code}`);
}
```

### Database Patterns

```typescript
// Singleton Prisma client
const prisma = new PrismaClient();

// Cache frequently accessed data
let cachedDifficulties = await prisma.difficulty.findMany();

// Use include for relations
const questions = await prisma.question.findMany({
    include: {
        difficulty: true,
        category: true,
        correct_answer: true,
        incorrect_answers: true,
    },
});

// Use select for specific fields
const results = await prisma.question.findMany({
    select: {
        question: true,
        correct_answer: { select: { answer: true } },
    },
});
```

### Web Server (Hono)

```typescript
// Route handler pattern
app.get("/questions", async (c) => {
    const difficulty = c.req.query("difficulty");
    if (!difficulty) {
        return c.json({ error: "Missing parameter" }, 400);
    }
    return c.json(await questionsDifficultyCategoryAmount(difficulty, category, amount));
});

// Static file serving
app.use("/*", serveStatic({ root: "./static" }));
```

### Testing

```typescript
import { assertEquals } from "@std/assert";

Deno.test("OpenTDB categories endpoint", async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    assertEquals(response.status, 200);
    const data = await response.json();
    assertEquals(Array.isArray(data.trivia_categories), true);
});

// Use try-catch for tests that may fail due to external dependencies
Deno.test("Local questions endpoint", async () => {
    try {
        const response = await fetch("http://localhost:5000/questions");
        assertEquals(response.status, 200);
    } catch (error) {
        console.log("Server not running, skipping test:", (error as Error).message);
    }
});
```

## Project Structure

```text
/
├── main.ts              # Hono server entry point
├── main_test.ts         # Server tests
├── seed.ts              # Database seeding script
├── deno.json            # Deno config with tasks and imports
├── lib/
│   ├── questionservice.ts  # Prisma database operations
│   ├── apiaccess.ts        # OpenTDB API client
│   ├── helpers.ts          # Utility functions
│   ├── config.ts           # Environment configuration
│   └── seeddata.ts         # Static seed data
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── generated/          # Prisma client (gitignored)
└── static/                 # Static web assets
```

## Key Dependencies

- **Hono**: Web framework (jsr:@hono/hono)
- **Prisma**: ORM with SQLite (npm:@prisma/client)
- **he**: HTML entity decoder
- **@std/assert**: Deno standard testing assertions

## Git & GitHub Workflow

### GitHub CLI

Use the `gh` command for GitHub operations - it is authorized.

```bash
# View issue details
gh issue view <number>

# List issues
gh issue list

# Add comment to issue
gh issue comment <number> --body "Your comment"

# Create pull request
gh pr create --title "Title" --body "Description"
```

### Issue Handling

- When work on an issue is completed, add a comment to the issue documenting what was done
- It is permitted and encouraged to update issue descriptions and comment on them during the planning phase to clarify requirements or document decisions

### Commit Guidelines

- Never commit or push unless explicitly asked to do so
- Every commit message must include a reference to the GitHub issue it addresses (e.g., "issue #13")
- If there is no existing issue for the task, ask the user to create one or provide the issue number
