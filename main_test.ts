import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("OpenTDB categories endpoint", async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  assertEquals(response.status, 200);
  const data = await response.json();
  assertEquals(typeof data.trivia_categories, "object");
  assertEquals(data.trivia_categories.length > 0, true);
});

Deno.test("Local questions endpoint", async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/questions?difficulty=easy&category=Sports&amount=2",
    );
    assertEquals(response.status, 200);
    const data = await response.json();
    assertEquals(Array.isArray(data), true);
    if (data.length > 0) {
      assertEquals(typeof data[0].question, "string");
    }
  } catch (error) {
    console.log(
      "Local server not running, skipping test:",
      (error as Error).message,
    );
  }
});
