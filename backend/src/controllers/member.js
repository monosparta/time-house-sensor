require("dotenv").config();
const { memberService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const login = async (req, res) => {
  try {
    if (!req.body.usernameOrMail?.trim() || !req.body.password?.trim()) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const usernameOrMail = req.body.usernameOrMail;
    if (
      !(await memberService.checkMemberExistsByUsernameOrMail(usernameOrMail))
    ) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }

    const password = req.body.password;
    const userInfo = await memberService.getMemberInfoByUsernameOrMail(
      usernameOrMail
    );
    const match = bcrypt.compareSync(password, userInfo.password);

    if (!match) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }

    if (userInfo.level) {
      return res.status(401).json({
        detail: "帳號或密碼錯誤",
      });
    }
    const token = jwt.sign(
      { id: userInfo.id, username: userInfo.name, level: userInfo.level },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      detail: "登入成功",
      token: token,
    });
  } catch (err) {
    logger.error(err);
    return res.json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  login,
};
