require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyMemberToken = async (req, res, next) => {
  try {
    if (
      !req.headers?.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, { complete: true });
    if (
      !decoded.header ||
      decoded.header?.alg !== "HS256" ||
      decoded.header?.typ !== "JWT"
    ) {
      return res.status(403).json({
        detail: "授權錯誤",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({
          detail: "授權錯誤",
        });
      }
      req.tokenPayload = payload;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // level: 0->admin, 1->member, 2->others
    if (!req?.tokenPayload || req.tokenPayload?.level) {
      return res.status(403).json({
        detail: "特權使用者授權錯誤",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  verifyMemberToken,
  isAdmin,
};
