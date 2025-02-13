const isPalindrome = require("../tdd.js")

test("no input -> null", () => {
  const result = isPalindrome();
  expect(result).toBeNull();
});

test("null -> null", () => {
  const result = isPalindrome(null);
  expect(result).toBeNull();
});

test("single char -> true", () => {
  const result = isPalindrome("a");
  expect(result).toBe(true);
});

test("length > 10 -> null", () => {
  const result = isPalindrome("abafjskljsjfsllsldfsldjf");
  expect(result).toBe(null);
});

test("bool, {}, [], ()=>{} -> null", () => {
  const result = isPalindrome({});
  expect(result).toBe(null);
});

test("abc -> false", () => {
  const result = isPalindrome('abc');
  expect(result).toBe(false)
})

test("aba -> true", () => {
  const result = isPalindrome("aba");
  expect(result).toBe(true)
})

test("case in-sensitive Aba -> true", () => {
  const result = isPalindrome("Aba");
  expect(result).toBe(true);
});

test("extra spaces '          aba        ' -> true", () => {
  const result = isPalindrome("    aba    ");
  expect(result).toBe(true);
});

test("multiple inputs -> take only first input", () => {
  const result = isPalindrome("mom is here");
  expect(result).toBe(true);
});

test("num 123 -> false", () => {
  const result = isPalindrome(123);
  expect(result).toBe(false);
});

test("num 121 -> true", () => {
  const result = isPalindrome(121);
  expect(result).toBe(true);
});

test("negative num -121 -> true", () => {
  const result = isPalindrome(-121);
  expect(result).toBe(true);
});

