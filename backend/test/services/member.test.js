const memberService = require("../../src/services/member");

afterAll((done) => {
  done();
});

describe("Check the result of member exist", () => {
  test("check <>", async () => {
    const result = await memberService.checkMemberExists();
    expect(result).toEqual(new TypeError("Username must be a string"));
  });

  test("check <<number>>", async () => {
    const result = await memberService.checkMemberExists(123);
    expect(result).toStrictEqual(new TypeError("Username must be a string"));
  });

  test("check <>", async () => {
    const result = await memberService.checkMemberExists("");
    expect(result).toStrictEqual(
      new RangeError("Username must not be empty or space-filled")
    );
  });

  test("check <    >", async () => {
    const result = await memberService.checkMemberExists("           ");
    expect(result).toStrictEqual(
      new RangeError("Username must not be empty or space-filled")
    );
  });

  test("check <    s    >", async () => {
    const result = await memberService.checkMemberExists("    s    ");
    expect(result).toBe(false);
  });

  test("check <fffffffffsdfasffffffffffffffffff>", async () => {
    const result = await memberService.checkMemberExists(
      "fffffffffsdfasffffffffffffffffff"
    );
    expect(result).toBe(false);
  });

  test("check <admin>", async () => {
    const result = await memberService.checkMemberExists("admin");
    expect(result).toBe(true);
  });
});

describe("Check the result of get hash code(password)", () => {
  test("check <>", async () => {
    const result = await memberService.getMemberHash();
    expect(result).toEqual(new TypeError("Username must be a string"));
  });

  test("check <<number>>", async () => {
    const result = await memberService.getMemberHash(123);
    expect(result).toStrictEqual(new TypeError("Username must be a string"));
  });

  test("check <>", async () => {
    const result = await memberService.getMemberHash("");
    expect(result).toStrictEqual(
      new RangeError("Username must not be empty or space-filled")
    );
  });

  test("check <    >", async () => {
    const result = await memberService.getMemberHash("           ");
    expect(result).toStrictEqual(
      new RangeError("Username must not be empty or space-filled")
    );
  });

  test("check <  s  >", async () => {
    const result = await memberService.getMemberHash("       s    ");
    expect(result).toStrictEqual("");
  });

  test("check nobody used string", async () => {
    const result = await memberService.getMemberHash(
      "fffffffffffffffffffffffffffsdfasffffffffffffffffffffffffffffffffffff"
    );
    expect(result).toBe("");
  });

  test("check admin must exist", async () => {
    const result = await memberService.getMemberHash("admin");
    expect(result).toBe("$2b$10$bpecd65htSqZDkZObfRyqOouEdoseZapo8TLEoPEOZEwFBT4ftDky");
  });
});
