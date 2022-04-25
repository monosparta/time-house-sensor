const db = require("../models/index");

const updateSeatState = async (index, state, memberId) => {
  try {
    if (
      typeof index !== "number" ||
      typeof state !== "number" ||
      typeof memberId !== "number"
    ) {
      throw new TypeError("Index, State, Member-ID must be number");
    }
    if (
      index < 1 ||
      index > 10 ||
      !Number.isInteger(index) ||
      state < -1 ||
      state > 2 ||
      !Number.isInteger(state)
    ) {
      throw new RangeError("Index or State is out of range or not an integer");
    }
    if (state === 1) {
      memberId = null;
    }
    const seat = await db["Seats"].update(
      { state: state, memberId: memberId },
      { where: { id: index } }
    );
    return "success";
  } catch (err) {
    return err;
  }
};

const getAllSeatInfo = async () => {
  let seats = await db["Seats"].findAll();
  seats = seats.map((seat) => {
    return seat.dataValues;
  });
  return seats;
};

const checkSeatIndexExist = async (index) => {
  let seat = await db["Seats"].findOne({
    where: { id: index }
  });
  return seat !== null;
};

module.exports = {
  updateSeatState,
  getAllSeatInfo,
  checkSeatIndexExist
};
