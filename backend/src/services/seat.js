const db = require("../models/index");

const updateSeatState = async (
  index,
  state,
  memberId,
  updateTime = new Date()
) => {
  if (state === 1) {
    memberId = null;
  }
  const seat = await db["Seats"].update(
    { state: state, memberId: memberId, updatedAt: updateTime },
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
    if (seat.state === 2) {
      const updateTime = new Date(seat.updatedAt);
      const current = new Date();
      const minutes = parseInt(
        (current.getTime() - updateTime.getTime()) / (1000 * 60) + 30
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
getAllSeatInfo();
