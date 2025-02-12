const sortUsersByAge = require("../app.js")

test("check sort", () => {
  const data = sortUsersByAge();
  expect(data[0].name).toBe("jkl");
})