const db = require("../models/index");

const updateSeatState = async (index, state, memberId) => {
  try {
    if (
      typeof index !== "number" ||
      typeof state !== "number" ||
      typeof memberId !== "number"
    ) {
      throw new TypeError("Index and State must be number");
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

    const seat = await db["Seats"].update(
      { state: state, memberId: memberId },
      { where: { id: index } }
    );
    return "success";
  } catch (err) {
    return err;
  }
};

const getSeatInfo = async () => {
  let seats = await db["Seats"].findAll({
    attributes: ["id", "state", "memberId", "updatedAt"],
  });
  seats = seats.map((seat) => {
    return seat.dataValues;
  });
  return seats;
};

module.exports = {
  updateSeatState,
  getSeatInfo
};
