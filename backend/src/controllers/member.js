const { memberService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.password) {
      return res.status(400).json({
        type: "/errors/incomplete-para",
        title: "incomplete parameters",
        status: 400,
        detail: "missing username or password or both",
        instance: "/api/login",
      });
    }
    const username = req.body.username;
    if (!(await memberService.checkMemberExistsByUsername(username))) {
      return res.status(403).json({
        type: "/errors/incorrect-user-pass",
        title: "Incorrect username or password.",
        status: 403,
        detail: "Authentication failed due to incorrect username or password.",
        instance: "/api/login",
      });
    }

    const password = req.body.password;
    const userInfo = await memberService.getMemberInfoByUsernameByUsername(username);
    const compareResult = await bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        return result;
      });

    if (!compareResult) {
      return res.status(403).json({
        type: "/errors/incorrect-user-pass",
        title: "Incorrect username or password.",
        status: 403,
        detail: "Authentication failed due to incorrect username or password.",
        instance: "/api/login",
      });
    }

    const token = jwt.sign(
      { id: userInfo.id, username: userInfo.username, level: userInfo.level },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      type: "/passes/login-pass",
      title: "login success",
      status: 200,
      detail: "Authentication success.",
      instance: "/api/login",
      token: token,
    });
  } catch (err) {
    return res.json({
      type: "/errors/server-error",
      title: "Server error",
      status: 500,
      detail: "Please check server logs",
      instance: "/api/login",
    });
  }
};

module.exports = {
  login,
};