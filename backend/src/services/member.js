const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models/index");

const getAllAdmins = async () => {
  const admins = await db["Members"].findAll({ where: { level: 0 } });
  // admins.forEach((admin) => {
  //   admin.dataValues.password = "";
  // });
  return admins.map((admin) => {
    return {
      id: admin.dataValues.id,
      username: admin.dataValues.name,
      mail: admin.dataValues.mail,
      role: "admin",
      line: !admin.dataValues.lineId,
    };
  });
};

const addAdmin = async ({ username, password, mail }) => {
  const hash = bcrypt.hashSync(
    password,
    Number.parseInt(process.env.SALT_ROUND)
  );
  const admin = await db["Members"].create({
    name: username,
    password: hash,
    mail: mail,
    level: 0,
  });
  return admin.dataValues;
};

const updateAdmin = async ({ id, username, mail, password }) => {
  const admin = await db["Members"].findOne({ where: { id: id } });
  console.log(admin)
  if (!admin || admin?.dataValues?.level) {
    return [false, "該人物並不存在，或非管理者"];
  }

  admin.set({
    name: username || admin.dataValues.name,
    mail: mail || admin.dataValues.mail,
    password:
      (password &&
        bcrypt.hashSync(password, Number.parseInt(process.env.SALT_ROUND))) ||
      admin.dataValues.password,
  });

  await admin.save();

  return [true, null];
};

const destroyAdmin = async (id) => {
  const member = await db["Members"].findOne({ where: { id: id } });
  if (!member || member.dataValues?.level) {
    return [false, "該人物並不存在，或非管理者"];
  }
  await db["Members"].destroy({ where: { id: id } });
  return [true, null];
};

const getMemberInfoByUsername = async (username) => {
  if (typeof username !== "string") {
    throw new TypeError("Username must be a string");
  }
  if (username.trim() === "") {
    throw new RangeError("Username must not be empty or space-filled");
  }
  return (await db["Members"].findOne({ where: { name: username } }))
    .dataValues;
};

const getMemberInfoById = async (id) => {
  if (typeof id !== "number") {
    throw new TypeError("ID must be a string");
  }
  return (await db["Members"].findOne({ where: { id: id } })).dataValues;
};

const getMemberInfoByMail = async (mail) => {
  const result = await db["Members"].findOne({
    where: {
      mail: mail,
    },
  });
  return result;
};

const getMemberInfoByUsernameOrMail = async (usernameOrMail) => {
  if (typeof usernameOrMail !== "string") {
    throw new TypeError("UsernameOrMail must be a string");
  }
  const result = await db["Members"].findOne({
    where: {
      [Op.or]: [{ name: usernameOrMail }, { mail: usernameOrMail }],
    },
  });
  return result;
};

const getMemberInfoByCardId = async (cardId) => {
  const result = await db["Members"].findOne({
    where: {
      cardId: cardId,
    },
  });
  return result?.dataValues;
};

const getMemberInfoByLineId = async (lineId) => {
  if (typeof lineId !== "string") {
    throw new TypeError("LineID must be a string");
  }
  if (lineId.trim() === "") {
    throw new RangeError("LineID must not be empty or space-filled");
  }
  return (await db["Members"].findOne({ where: { lineId: lineId } }))
    .dataValues;
};

const checkMemberExistsByUsername = async (username) => {
  return (await db["Members"].findOne({ where: { name: username } })) !== null;
};

const checkMemberExistsByMail = async (mail) => {
  return (await db["Members"].findOne({ where: { mail: mail } })) !== null;
};

const checkMemberExistsByUsernameOrMail = async (usernameOrMail) => {
  if (typeof usernameOrMail !== "string") {
    throw new TypeError("Username must be a string");
  }
  const result = await db["Members"].findOne({
    where: {
      [Op.or]: [{ name: usernameOrMail }, { mail: usernameOrMail }],
    },
  });
  return result;
};

const checkMemberExistsById = async (id) => {
  if (typeof id !== "number") {
    throw new TypeError("Id must be a number");
  }
  const member = await db["Members"].findOne({
    where: { id: id },
  });
  return member !== null;
};
const checkMemberExistsByCardId = async (cardId) => {
  if (typeof cardId !== "string") {
    throw new TypeError("Card ID must be a string");
  }

  const member = await db["Members"].findOne({
    where: { cardId: cardId },
  });
  return member !== null;
};

const getMemberHash = async (username) => {
  if (typeof username !== "string") {
    throw new TypeError("Username must be a string");
  }
  if (username.trim() === "") {
    throw new RangeError("Username must not be empty or space-filled");
  }
  const member = await db["Members"].findOne({
    where: { name: username },
  });
  if (!member?.dataValues) return "";
  return member.dataValues.password || "";
};

const addMember = async (username, mail, phoneNumber, cardId, level) => {
  const [member, created] = await db["Members"].findOrCreate({
    where: { [Op.or]: [{ mail: mail }, { phone: phoneNumber }] },
    defaults: {
      name: username,
      mail: mail,
      phone: phoneNumber,
      cardId: cardId,
      level: level,
    },
  });
  return [member, created];
};

module.exports = {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  destroyAdmin,

  getMemberInfoByUsername,
  getMemberInfoById,
  getMemberInfoByLineId,
  getMemberInfoByCardId,
  getMemberInfoByMail,
  checkMemberExistsByUsername,
  checkMemberExistsById,
  checkMemberExistsByMail,
  checkMemberExistsByCardId,
  getMemberHash,
  addMember,
  checkMemberExistsByUsernameOrMail,
  getMemberInfoByUsernameOrMail,
};
