const { seatService } = require("../services/");
const logger = require("../utils/logger");


const getAllSeatInfo = async (req, res) => {
  try {
    const seats = await seatService.getAllSeatInfo();
    return res.status(200).json({
      detail: "成功取得所有位置資訊",
      seats: [...seats.values()],
    });
  } catch (error) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  getAllSeatInfo,
};
