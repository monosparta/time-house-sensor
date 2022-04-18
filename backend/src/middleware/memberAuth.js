const jwt = require("jsonwebtoken");

const verifyMemberToken = async (req, res, next) => {
  if (
    !req.headers?.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).json({
      type: "/errors/headers-content-error",
      title: "Incorrect headers content.",
      status: 403,
      detail: "There is no authorization or illegal authorization code.",
      instance: "/api/auth",
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
      type: "/errors/incorrect-token-header",
      title: "Illegal token header.",
      status: 403,
      detail: "Token header is illegal.",
      instance: "/api/auth",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({
        type: "/errors/signature-error",
        title: "Payload mismatches signature.",
        status: 403,
        detail: "Payload mismatches signature after.",
        instance: "/api/auth",
      });
    }
    req.tokenPayload = payload;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  // level: 0->admin, 1->member, 2->others
  if (!req?.tokenPayload || req.tokenPayload?.level) {
    return res.status(403).json({
      type: "/errors/incorrect-user-level",
      title: "Incorrect user level.",
      status: 403,
      detail: "This route path just for admin user.",
      instance: "/api/auth/admin",
    });
  }
  next();
};

module.exports = {
  verifyMemberToken,
  isAdmin,
};
