const db = require("../models/index");
const { memberService, seatService } = require("../services/index");

// add member for one-day member or want-experience member
const addMember = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.mail || !body.phoneNumber) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const [member, created] = await memberService.addMember(
      body.username,
      body.mail,
      body.phoneNumber,
      "0000000000",
      2
    );
    if (!created) {
      return res.status(400).json({
        detail: "該名用戶已存在"
      });
    }
    return res.status(200).json({
      detail: "成功新增",
    });
  } catch (err) {
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    let id = req.query?.memberId;
    if (!id) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (!(await memberService.checkMemberExistsById(parseInt(id)))) {
      return res.status(404).json({
        detail: "該會員並不存在，請聯絡相關人員",
      });
    }

    const userInfo = await memberService.getMemberInfoById(parseInt(id));
    return res.status(200).json({
      detail: "成功取得該使用者之相關資訊",
      member: {
        name: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        mail: userInfo.mail,
      },
    });
  } catch (err) {
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const updateSeatState = async (req, res) => {
  try {
    const seat = req.body.seat;
    const username = req.body.username;
    if (!seat || !seat.index || !seat.state || !username) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (
      !(await seatService.checkSeatIndexExist(seat.index)) ||
      seat.state < -1 ||
      2 < seat.state
    ) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (!(await memberService.checkMemberExistsByUsername(username))) {
      return res.status(04).json({
        detail: "該會員並不存在，請聯絡相關人員",
      });
    }

    const memberInfo = await memberService.getMemberInfoByUsername(username);
    const result = await seatService.updateSeatState(
      parseInt(seat.index),
      parseInt(seat.state),
      parseInt(memberInfo.id)
    );
    if (result !== "success") {
      return res.status(500).json({
        detail: "伺服器內部錯誤",
      });
    }

    //   todo call the python rpc server to change the image

    return res.status(200).json({
      detail: "成功修改座位資訊"
    });
  } catch (err) {
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  addMember,
  updateSeatState,
  getMemberById,
};
