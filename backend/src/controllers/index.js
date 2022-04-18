const lineBot = require("./lineBot");
const seat = require("./seat");
const member = require("./member");
const admin = require("./admin");

module.exports = {
  lineBot,
  seatController: seat,
  memberController: member,
  adminController: admin,
};
