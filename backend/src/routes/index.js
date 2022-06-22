const {
  lineBot,
  seatController,
  memberController,
  adminController,
} = require("../controllers/index");
const memberAuth = require("../middleware/memberAuth");

module.exports = (router) => {
  router.get("/api/seatsInfo", seatController.getAllSeatInfo);
  router.post("/api/line", lineBot.lineMessageHandler);

  router.post("/api/login", memberController.login);
  router.use("/api/auth", memberAuth.verifyMemberToken);

  router.use("/api/auth/isAdmin", memberAuth.isAdmin);
  
  router.get("/api/auth/isAdmin/admins", adminController.getAllAdmins);
  router.post("/api/auth/isAdmin/admin", adminController.addAdmin);
  router.put("/api/auth/isAdmin/admin/:id", adminController.updateAdmin);
  router.delete("/api/auth/isAdmin/admin/:id", adminController.removeAdmin);

  router.get("/api/auth/isAdmin/memberInfo", adminController.getMemberById);
  router.post("/api/auth/isAdmin/addUser", adminController.addMember);
  router.put("/api/auth/isAdmin/seatState", adminController.updateSeatState);
};
