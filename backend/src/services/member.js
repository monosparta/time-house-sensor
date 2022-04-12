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

const getMemberInfoByLineId = async (username) => {
  try {
  } catch (err) {}
};

const getMemberInfoByCardId = async (username) => {
  try {
  } catch (err) {}
};

const checkMemberExists = async (username) => {
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
    if(!member?.dataValues)
      return "";
    return member.dataValues.password || "";
  } catch (err) {
    return err;
  }
};

// const getAllInfo

module.exports = {
  getMemberInfoByUsername,
  checkMemberExists,
  getMemberHash,
};