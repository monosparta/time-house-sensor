const {
  lineBot,
  seatController,
  memberController,
  adminController,
} = require("../controllers/index");
const memberAuth = require("../middleware/memberAuth");

module.exports = (router) => {
  router.get("/api/seatsInfo", seatController.getAllSeatInfo)
  router.post("/api/line", lineBot.lineMessageHandler);

  router.post("/api/login", memberController.login);
  router.use("/api/auth", memberAuth.verifyMemberToken);
  
  router.use("/api/auth/admin", memberAuth.isAdmin);
  router.get("/api/auth/admin/memberInfo", adminController.getMemberById);
  router.post("/api/auth/admin/addUser", adminController.addMember);
  router.put("/api/auth/admin/seatState", adminController.updateSeatState)
};
