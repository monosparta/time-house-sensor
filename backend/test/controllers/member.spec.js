const request = require("supertest");
const app = require("../../src/app");

const seatProperties = require("../../src/utils/seat");

describe("POST /api/login", () => {
  it("test without any body data", async () => {
    const res = await request(app).post("/api/login");
    expect(res.statusCode).toEqual(422);
  });

  it("test body just take mail", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "123@mail.com",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body just take password", async () => {
    const res = await request(app).post("/api/login").send({
      password: "123",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take null mail & null password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: null,
      password: null,
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take null mail & password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: null,
      password: "123123",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take mail & null password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "123123@mail.com",
      password: null,
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take blank mail & blank password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "",
      password: "",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take blank mail & password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "   ",
      password: "123123",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take mail & blank password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "1231@mail.com",
      password: "          ",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("test body take malformed mail & password", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "thisMailAddressIsMalformed",
      password: "thisPasswordIsJustAPassword",
    });
    expect(res.statusCode).toEqual(403);
  });

  it("test user account not in db", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "notInDB@mail.com",
      password: "notInDB",
    });
    expect(res.statusCode).toEqual(403);
  });

  it("test user account not an admin", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "general@mail.com",
      password: "general",
    });
    expect(res.statusCode).toEqual(403);
  });

  it("test user account is an admin", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "admin@mail.com",
      password: "1231231231",
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body.detail).toEqual("帳號或密碼錯誤");
  });

  it("test login with username", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "admin",
      password: "admin",
    });
    expect(res.statusCode).toEqual(200);

    const body = res.body;
    expect(body.detail).toEqual("登入成功");
    expect(body.token.split(".").length).toEqual(3);
  });

  it("test login with mail", async () => {
    const res = await request(app).post("/api/login").send({
      usernameOrMail: "admin@mail.com",
      password: "admin",
    });
    expect(res.statusCode).toEqual(200);

    const body = res.body;
    expect(body.detail).toEqual("登入成功");
    expect(body.token.split(".").length).toEqual(3);
  });
});
