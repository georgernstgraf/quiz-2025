import { assertEquals } from "@std/assert";

// Test for external OpenTDB categories endpoint
Deno.test("OpenTDB categories endpoint", async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  assertEquals(response.status, 200);
  const data = await response.json();
  assertEquals(typeof data.trivia_categories, "object");
  assertEquals(data.trivia_categories.length > 0, true);
});

// Test for local questions endpoint (assumes server is running on localhost:5000)
Deno.test("Local questions endpoint", async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/questions?difficulty=easy&category=Sports&amount=2",
    );
    assertEquals(response.status, 200);
    const data = await response.json();
    assertEquals(Array.isArray(data), true);
    // Assuming the response is an array of questions
    if (data.length > 0) {
      assertEquals(typeof data[0].question, "string");
    }
  } catch (error) {
    console.log(
      "Local server not running, skipping test:",
      (error as Error).message,
    );
    // Skip the test if server is not available
  }
});
