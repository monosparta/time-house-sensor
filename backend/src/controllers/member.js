const { memberService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    if (!req.body?.usernameOrMail || !req.body?.password) {
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const usernameOrMail = req.body.usernameOrMail;
    if (!(await memberService.checkMemberExistsByUsernameOrMail(usernameOrMail))) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }

    const password = req.body.password;
    const userInfo = await memberService.getMemberInfoByUsernameOrMail(usernameOrMail);
    const compareResult = await bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        return result;
      });

    if (!compareResult) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }

    if (userInfo.level) {
      return res.status(401).json({
        detail: "僅允許管理者登入",
      });
    }
    const token = jwt.sign(
      { id: userInfo.id, username: userInfo.username, level: userInfo.level },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      detail: "登入成功",
      token: token,
    });
  } catch (err) {
    return res.json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  login,
};