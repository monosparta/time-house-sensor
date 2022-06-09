const memberService = require("../../src/services/member");

afterAll((done) => {
  done();
});

describe("Check the result of member exist", () => {

  test("1+1", async () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});
