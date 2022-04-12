const { lineBot, seat, memberController } = require("../controllers/index");

module.exports = (router) => {
  router.post("/api/line", lineBot.lineMessageHandler);

  router.post('/api/login', memberController.login);
  // router.put('/api/auth/', )
  // router.post('/api/auth/logout',);
};

