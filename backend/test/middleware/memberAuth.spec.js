const request = require("supertest");
const app = require("../../src/app");

let adminLoginRes;

beforeAll(async () => {
  adminLoginRes = await request(app).post("/api/login").send({
    mail: "admin@mail.com",
    password: "admin",
  });
});

describe("middleware check JWT", () => {
  it("without bearer_token", async () => {
    const res = await request(app).get("/api/auth/");

    expect(res.statusCode).toEqual(422);
    expect(res.body.detail).toEqual("參數錯誤，請參考文件");
  });

  it("set wrong bearer_token", async () => {
    const wrongToken = adminLoginRes.body.token.substring(
      0,
      adminLoginRes.body.token.length - 2
    );
    const res = await request(app)
      .get("/api/auth/")
      .set({ authorization: "Bearer " + wrongToken });

    expect(res.statusCode).toEqual(403);
    expect(res.body.detail).toEqual("授權錯誤");
  });

  it("set correct bearer_token, and must return 404 info", async () => {
    const token = adminLoginRes.body.token;
    const res = await request(app)
      .get("/api/auth/")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
  });
});

describe("middleware check admin", () => {
  it("set correct bearer_token, and must return 404 info", async () => {
    const token = adminLoginRes.body.token;
    const res = await request(app)
      .get("/api/auth/admin/")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
  });
});
