const {
  lineBot,
  seatController,
  memberController,
  adminController,
} = require("../controllers/index");
const { verifyMemberToken, isAdmin } = require("../middleware/memberAuth");

module.exports = (router) => {
  router.get("/api/seatsInfo", seatController.getAllSeatInfo)
  router.post("/api/line", lineBot.lineMessageHandler);

  router.post("/api/login", memberController.login);
  router.use("/api/auth", verifyMemberToken);
  router.use("/api/auth/admin", isAdmin);
  // router.post("api/auth/admin/addUser", adminController.addUser);
  // router.put("/api/auth/admin/updateSeatState", adminController.updateSeatState)
  // router.post('/api/auth/logout',);
};
