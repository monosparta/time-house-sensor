const request = require("supertest");
const app = require("../../src/app");

let adminLoginRes;
let token;

beforeAll(async () => {
  adminLoginRes = await request(app).post("/api/login").send({
    usernameOrMail: "admin@mail.com",
    password: "admin",
  });
  token = adminLoginRes.body.token;
});

describe("GET /api/auth/isAdmin/memberInfo", () => {
  it("with no query params", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/memberInfo")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
    expect(res.body.detail).toEqual("參數錯誤，請參考文件");
  });

  it("with alpha-string query params", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/memberInfo")
      .query({ memberId: "character" })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
    expect(res.body.detail).toEqual("參數錯誤，請參考文件");
  });

  it("with too-large-number query params", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/memberInfo")
      .query({ memberId: 1000000001 })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  it("with float query params", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/memberInfo")
      .query({ memberId: 45.2 })
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  it(" with number-string query params in number", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/memberInfo")
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
      .get("/api/auth/isAdmin/memberInfo")
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

describe("POST /api/auth/isAdmin/addUser", () => {
  it("with no body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ mail: "123@mail.com" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send partial body para", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ mail: "123@mail.com", phoneNumber: "0912377765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send all body para, but malformed mail", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
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
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com", phoneNumber: "0977765" });

    expect(res.statusCode).toEqual(422);
  });

  it("send all body para, but malformed phone", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({ username: "Zzz", mail: "123@mail.com", phoneNumber: "0977765" });

    expect(res.statusCode).toEqual(422);
  });

  it("with duplicated mail", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/addUser")
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
      .post("/api/auth/isAdmin/addUser")
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
      .post("/api/auth/isAdmin/addUser")
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
      .post("/api/auth/isAdmin/addUser")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "XXX",
        mail: "XXX@mail.com",
        phoneNumber: "+886987654321",
      });

    expect(res.statusCode).toEqual(201);
  });
});

describe("PUT /api/auth/isAdmin/seatState", () => {
  it("no body params", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {},
      });

    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "general",
      });
    expect(res.statusCode).toEqual(422);
  });

  it("missing partial params", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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

  // todo: params type error hasn't been tested
  it("test type error", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: "1",
          state: 0,
        },
        username: "kfyjfghrtygs",
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  // todo: params type error hasn't been tested
  it("test type error", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: "2",
        },
        username: "kfyjfghrtygs",
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  // todo: params type error hasn't been tested
  it("test type error", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 0,
        },
        username: 12312123,
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.detail).toEqual("該會員並不存在，請聯絡相關人員");
  });

  // todo: params type error hasn't been tested
  it("test type error", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1.7,
          state: 0,
        },
        username: "kfyjfghrtygs",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("test type error", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
      .set({ authorization: "Bearer " + token })
      .send({
        seat: {
          index: 1,
          state: 0.6,
        },
        username: "kfyjfghrtygs",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("correct", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/seatState")
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
      .put("/api/auth/isAdmin/seatState")
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

describe("GET /api/auth/isAdmin/admins", () => {
  it("test res result with query", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/admins?query=123123")
      .set({ authorization: "Bearer " + token });
    expect(res.statusCode).toEqual(200);
  });

  it("test res result with body", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/admins")
      .set({ authorization: "Bearer " + token })
      .send({ id: 123 });
    expect(res.statusCode).toEqual(200);
  });

  it("correct res result", async () => {
    const res = await request(app)
      .get("/api/auth/isAdmin/admins")
      .set({ authorization: "Bearer " + token });
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /api/auth/isAdmin/admin", () => {
  it("no body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        mail: "IAmATestAdmin@mail.com",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
        mail: "IAmATestAdmin@mail.com",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("partial data missing in body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        mail: "IAmATestAdmin@mail.com",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("malformed mail", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
        mail: "IAmATestAdmin.com",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(422);
  });

  it("correct body", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
        mail: "IAmATestAdmin@mail.com",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(201);
  });

  it("duplicated username", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "IAmATestAdmin",
        mail: "dsfsdf@mail.com",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(400);
  });

  it("duplicated mail", async () => {
    const res = await request(app)
      .post("/api/auth/isAdmin/admin")
      .set({ authorization: "Bearer " + token })
      .send({
        username: "dfsdfasdf",
        mail: "IAmATestAdmin@mail.com",
        password: "IAmATestAdmin",
      });

    expect(res.statusCode).toEqual(400);
  });
});

describe("PUT /api/auth/isAdmin/admin/:id", () => {
  it("update data by not exist id", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/admin/-1")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("update data by not exist id", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/admin/0")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("update data by not exist id", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/admin/878797984")
      .set({ authorization: "Bearer " + token })
      .send({
        password: "test_edit"
      });

    expect(res.statusCode).toEqual(404);
  });

  it("update admin password", async () => {
    const res = await request(app)
      .put("/api/auth/isAdmin/admin/1")
      .set({ authorization: "Bearer " + token })
      .send({
        password: "admin_edited",
      });

    expect(res.statusCode).toEqual(200);

    const newLoginRes = await request(app)
      .post("/api/login")
      .send({ usernameOrMail: "admin", password: "admin_edited" });

    expect(newLoginRes.statusCode).toEqual(200)
  });
});

describe("DELETE /api/auth/isAdmin/admin/:id", () => {
  it("delete not exist id", async () => {
    const res = await request(app)
      .delete("/api/auth/isAdmin/admin/-1")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("delete not exist id", async () => {
    const res = await request(app)
      .delete("/api/auth/isAdmin/admin/0")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(422);
  });

  it("delete general user", async () => {
    const res = await request(app)
      .delete("/api/auth/isAdmin/admin/2")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
  });

  it("delete admin", async () => {
    const res = await request(app)
      .delete("/api/auth/isAdmin/admin/5")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(200);
  });

  it("delete not exist", async () => {
    const res = await request(app)
      .delete("/api/auth/isAdmin/admin/3")
      .set({ authorization: "Bearer " + token });

    expect(res.statusCode).toEqual(404);
  });
});
