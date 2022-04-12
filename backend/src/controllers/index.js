const lineBot = require('./lineBot');
const seat = require('./seat');
const member = require('./member');

module.exports = {
  lineBot,
  seatController: seat,
  memberController: member
};
