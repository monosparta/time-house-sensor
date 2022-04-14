const bcrypt = require("bcrypt");
const db = require("../models/index");

const getMemberInfoByUsername = async (username) => {
  try {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    if (username.trim() === "") {
      throw new RangeError("Username must not be empty or space-filled");
    }
    return (await db["Members"].findOne({ where: { username: username } }))
      .dataValues;
  } catch (err) {
    return err;
  }
};

const getMemberInfoById = async (id) => {
  try {
    if (typeof id !== "number") {
      throw new TypeError("ID must be a string");
    }
    return (await db["Members"].findOne({ where: { id: id } })).dataValues;
  } catch (err) {
    return err;
  }
};

const getMemberInfoByLineId = async (lineId) => {
  try {
    if (typeof lineId !== "string") {
      throw new TypeError("LineID must be a string");
    }
    if (lineId.trim() === "") {
      throw new RangeError("LineID must not be empty or space-filled");
    }
    return (await db["Members"].findOne({ where: { lineId: lineId } }))
      .dataValues;
  } catch (err) {
    return err;
  }
};

const checkMemberExistsByUsername = async (username) => {
  try {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    if (username.trim() === "") {
      throw new RangeError("Username must not be empty or space-filled");
    }
    return (
      (await db["Members"].findOne({ where: { username: username } })) !== null
    );
  } catch (err) {
    return err;
  }
};
const checkMemberExistsById = async (id) => {
  try {
    if (typeof id !== "number") {
      throw new TypeError("Id must be a number");
    }
    const member = await db["Members"].findOne({
      where: { id: id },
    });
    return member !== null;
  } catch (err) {
    return err;
  }
};
const checkMemberExistsByCardId = async (cardId) => {
  try {
    if (typeof cardId !== "string") {
      throw new TypeError("Card ID must be a string");
    }

    const member = await db["Members"].findOne({
      where: { cardId: cardId },
    });
    return member !== null;
  } catch (err) {
    return err;
  }
};

const getMemberHash = async (username) => {
  try {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    if (username.trim() === "") {
      throw new RangeError("Username must not be empty or space-filled");
    }
    const member = await db["Members"].findOne({
      where: { username: username },
    });
    if (!member?.dataValues) return "";
    return member.dataValues.password || "";
  } catch (err) {
    return err;
  }
};

module.exports = {
  getMemberInfoByUsername,
  getMemberInfoById,
  getMemberInfoByLineId,
  checkMemberExistsByUsername,
  checkMemberExistsById,
  checkMemberExistsByCardId,
  getMemberHash,
};
