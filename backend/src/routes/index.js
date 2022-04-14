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
  // router.get("/api/auth/admin/memberInfo", );
  // router.post("api/auth/admin/addUser", adminController.addMember);
  router.put("/api/auth/admin/seatState", adminController.updateSeatState)

  // router.use("/api/iot/auth")
  // router.put("/api/iot/auth/updateSeatState")
  // router.post('/api/auth/logout',);
};
