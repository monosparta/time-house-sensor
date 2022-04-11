const { lineBot, seat } = require("../controllers/index");

const line = require("../services/lineDev");
const express = require("express");

module.exports = (router) => {
  router.post("/api/line", lineBot.lineMessageHandler);
  router.post("/api/line/login", );
  router.post("/api/line/general_message", );
  // router.post('/api/line', line.middleware)

  // router.post('/api/auth/login', );
  // router.post('/api/auth/logout',)
};
