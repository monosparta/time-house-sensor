const { lineBot, seat, memberController } = require("../controllers/index");

module.exports = (router) => {
  router.post("/api/line", lineBot.lineMessageHandler);

  router.post('/api/auth/login', memberController.login);
  // router.post('/api/auth/logout',);
};
