const lineDev = require('./lineDev');
const member = require('./member');
const seat = require('./seat');
const drawer = require('./openCVClient');

module.exports = {
    lineDevService: lineDev,
    memberService: member,
    seatService: seat,
    drawerService: drawer
}