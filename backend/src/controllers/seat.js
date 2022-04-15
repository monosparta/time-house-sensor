const { seatService } = require("../services/");

const getAllSeatInfo = async (req, res) => {
  const seats = await seatService.getAllSeatInfo();
  return res.status(200).json({
    type: "/passes/get-all-seats",
    title: "All seats.",
    status: 200,
    detail: "Successfully get all seats information.",
    instance: "/api/seatsInfo",
    seats: { ...seats },
  });
};

module.exports = {
  getAllSeatInfo,
};
