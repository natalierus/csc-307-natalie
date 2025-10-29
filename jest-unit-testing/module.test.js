// module.test.js
import mut from "./module.js"; // MUT = Module Under Test

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("divides 10 by 2 and gets 5", () => {
  const result = mut.div(10, 2);
  expect(result).toBe(5);
});

test("string has numbers", () => {
  const result = mut.containsNumbers("abc123");
  expect(result).toBe(true);
});

test("string does not have numbers", () => {
  const result = mut.containsNumbers("hello");
  expect(result).toBe(false);
});

test("dividing by zero returns Infinity", () => {
  const result = mut.div(10, 0);
  expect(result).toBe(Infinity);
});

test("containsNumbers returns false for empty string", () => {
  const result = mut.containsNumbers("");
  expect(result).toBe(false);
});

test("containsNumbers returns true if number is at the start", () => {
  const result = mut.containsNumbers("7cats");
  expect(result).toBe(true);
});

test("containsNumbers returns true if number is at the end", () => {
  const result = mut.containsNumbers("cat9");
  expect(result).toBe(true);
});
