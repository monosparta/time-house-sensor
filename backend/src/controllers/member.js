require("dotenv").config();
const { memberService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!req.body?.mail || req.body.mail.search(emailRule) === -1 || !req.body?.password) {
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const mail = req.body.mail;
    if (
      !(await memberService.checkMemberExistsByMail(mail))
    ) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }

    const password = req.body.password;
    const userInfo = await memberService.getMemberInfoByMail(
      mail
    );
    const match = await bcrypt.compareSync(password, userInfo.password);

    if (!match) {
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
      { id: userInfo.id, username: userInfo.name, level: userInfo.level },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      detail: "登入成功",
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  login,
};
