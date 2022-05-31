const db = require("../models/index");
const seatProperties = require("../utils/seat");

const updateSeatState = async (
  index,
  state,
  stateChangedAt,
  memberId=null,
) => {
  if (state === seatProperties.state.AVAILABLE) {
    memberId = null;
  }
  const seat = await db["Seats"].update(
    { state: state, stateChangedAt: stateChangedAt, memberId: memberId},
    { where: { id: index } }
  );
  return "success";
};

const getAllSeatInfo = async () => {
  let seats = await db["Seats"].findAll();
  seats = seats.map((seat) => {
    return seat.dataValues;
  });
  seats.forEach((seat) => {
    if (seat.state === seatProperties.state.IDLE_TOO_LONG) {
      const stateChangedAt = new Date(seat.stateChangedAt);
      const current = new Date();
      const minutes = parseInt(
        (current.getTime() - stateChangedAt.getTime()) / (1000 * 60) + 30
      );
      seat.idleMinutes = minutes;
    } else {
      seat.idleMinutes = 0;
    }
  });
  return seats;
};

const getOneSeatInfo = async (index) => {
  let seats = await db["Seats"].findOne({ where: { id: index } });
  return seats.dataValues;
};

const checkSeatIndexExist = async (index) => {
  let seat = await db["Seats"].findOne({
    where: { id: index },
  });
  return seat !== null;
};

module.exports = {
  updateSeatState,
  getAllSeatInfo,
  getOneSeatInfo,
  checkSeatIndexExist,
};
