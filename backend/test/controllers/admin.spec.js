const request = require("supertest");
const app = require("../../src/app");

let adminLoginRes;
let token;

beforeAll(async () => {
  adminLoginRes = await request(app).post("/api/login").send({
    mail: "admin@mail.com",
    password: "admin",
  });
  token = adminLoginRes.body.token;
});

describe("GET /api/auth/admin/memberInfo", () => {
  it("with no query params", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
    expect(res.body.detail).toEqual("參數錯誤，請參考文件");
  });

  it("with alpha-string query params", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .query({ memberId: "character" })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
    expect(res.body.detail).toEqual("參數錯誤，請參考文件");
  });

  it("with too-large-number query params", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .query({ memberId: 1000000001 })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  it("with float query params", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .query({ memberId: 45.2 })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  it(" with number-string query params in number", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .query({ memberId: "1" })
      .set({ authorization: "Bearer " + token });
    expect(res.statusCode).toEqual(200);
    expect(res.body.detail).toEqual("成功取得該使用者之相關資訊");

    const member = res.body.member;
    expect(member).toHaveProperty("name");
    expect(member).toHaveProperty("phoneNumber");
    expect(member).toHaveProperty("mail");
  });

  it("with correct query params", async () => {
    const res = await request(app)
      .get("/api/auth/admin/memberInfo")
      .query({ memberId: 1 })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(200);
    expect(res.body.detail).toEqual("成功取得該使用者之相關資訊");

    const member = res.body.member;
    expect(member).toHaveProperty("name");
    expect(member).toHaveProperty("phoneNumber");
    expect(member).toHaveProperty("mail");
  });
});

describe("POST /api/auth/admin/addUser", () => {
  it("with no body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ mail: "123@mail.com" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ mail: "123@mail.com", phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send all body para, but malformed mail", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "Zzz",
        mail: "123mail.com",
        phoneNumber: "0912377765",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("send all body para, but malformed phone", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com", phoneNumber: "0977765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send all body para, but malformed phone", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com", phoneNumber: "0977765" });

    expect(res.statusCode).toEqual(422);
  });

  it("with duplicated mail", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "OOO",
        mail: "admin@mail.com",
        phoneNumber: "0912377765",
      });

    expect(res.statusCode).toEqual(400);
  });

  it("with duplicated phone number", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "OOO",
        mail: "OOO@mail.com",
        phoneNumber: "0123456789",
      });

    expect(res.statusCode).toEqual(400);
  });

  it("with correct username, mail, phone number", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "OOO",
        mail: "OOO@mail.com",
        phoneNumber: "0912377765",
      });

    expect(res.statusCode).toEqual(201);
  });

  it("send all body para, phone number is +886", async () => {
    const res = await request(app)
      .post("/api/auth/admin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "XXX",
        mail: "XXX@mail.com",
        phoneNumber: "+886987654321",
      });

    expect(res.statusCode).toEqual(201);
  });
});

describe("PUT /api/auth/admin/seatState", () => {
  // todo: params type error hasn't been tested

  it("no body params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {},
      });

    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
        },
      });
    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          state: 0,
        },
      });
    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "general",
      });
    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          state: 0,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("params with out of range error", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 10000,
          state: 0,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("params with out of range error", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: -6,
          state: 0,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("params with out of range error", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 78,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("test user isn't in db", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 0,
        },
        username: "kfyjfghrtygs",
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  it("correct", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 0,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.detail).toEqual("成功修改座位資訊");
  });

  it("after last test case. When seat state change into available, memberId should be NULL", async () => {
    const res = await request(app)
      .put("/api/auth/admin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 1,
        },
        username: "general",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.detail).toEqual("成功修改座位資訊");

    const seatsInfoRes = await request(app).get("/api/seatsInfo");
    const seats = seatsInfoRes.body.seats;
    expect(seats[0].state).toEqual(1);
    expect(seats[0].memberId).toBeNull();
  });

});
