const { memberService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.password) {
      return res.json({
        type: "/errors/incorrect-user-pass",
        title: "Incorrect username or password.",
        status: 333,
        detail: "Authentication failed due to incorrect username or password.",
        instance: "/login/log/abc123",
      });
    }
    const username = req.body.username;
    if (!(await memberService.checkMemberExists(username))) {
      return res.json({
        type: "/errors/incorrect-user-pass",
        title: "Incorrect username or password.",
        status: 400,
        detail: "Authentication failed due to incorrect username or password.",
        instance: "/login/log/abc123",
      });
    }

    const password = req.body.password;
    const userInfo = await memberService.getMemberInfoByUsername(username);
    const compareResult = await bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        return result;
      });
    if (!compareResult) {
      return res.json({
        type: "/errors/incorrect-user-pass",
        title: "Incorrect username or password.",
        status: 401,
        detail: "Authentication failed due to incorrect username or password.",
        instance: "/login/log/abc123",
      });
    }

    const token = jwt.sign(
      { id: userId.id, username: userInfo.username, level: userInfo.level },
      process.env.JWT_SECRET
    );
    return res.json({ token: token });
  } catch (err) {
    return res.json({
      type: "/errors/incorrect-user-pass",
      title: "Incorrect username or password.",
      status: 500,
      detail: "Authentication failed due to incorrect username or password.",
      instance: "/login/log/abc123",
    });
  }
};

module.exports = {
  login,
};
