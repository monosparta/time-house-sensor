const { memberService, seatService } = require("../services/index");
const seatProperties = require("../utils/seat");
const memberProperties = require("../utils/member");
const logger = require("../utils/logger");

const getAllAdmins = async (_req, res) => {
  try {
    const admins = await memberService.getAllAdmins();

    return res.status(200).json({
      detail: "成功取得所有特權使用者",
      admins: [...admins],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const body = req.body;
    if (
      !body.username ||
      !body.mail ||
      req.body.mail.search(emailRule) === -1 ||
      !body.password
    ) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (await memberService.checkMemberExistsByUsername(body.username)) {
      return res.status(400).json({
        detail: "使用者名稱重複",
      });
    }
    if (await memberService.checkMemberExistsByMail(body.mail)) {
      return res.status(400).json({
        detail: "信箱重複",
      });
    }
    
    await memberService.addAdmin(body);
    return res.status(201).json({
      detail: "新增成功",
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (!id || !body.password) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const [_result, errorMessage] = await memberService.updateAdmin({ id: id, ...body });
    if(errorMessage) {
      return res.status(404).json({
        detail: "該人物並不存在，或非管理者"
      })
    }

    return res.status(200).json({
      detail: "修改成功",
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const [_result, err] = await memberService.destroyAdmin(id);
    if (err) {
      return res.status(404).json({
        detail: err.message,
      });
    }

    return res.status(200).json({
      detail: "刪除成功",
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

// add member for one-day member or want-experience member
const addMember = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.mail || !body.phoneNumber) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (body.mail.search(emailRule) === -1) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const phoneNumberRule =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
    if (body.phoneNumber.search(phoneNumberRule) === -1) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    const [_member, created] = await memberService.addMember(
      body.username,
      body.mail,
      body.phoneNumber,
      "0912121212",
      memberProperties.level.others
    );
    if (!created) {
      return res.status(400).json({
        detail: "信箱或手機號碼重複",
      });
    }
    return res.status(201).json({
      detail: "成功新增",
    });
  } catch (err) {
    logger.error(err);
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

    if (!(await memberService.checkMemberExistsById(id))) {
      return res.status(404).json({
        detail: "該會員並不存在，請聯絡相關人員",
      });
    }

    const userInfo = await memberService.getMemberInfoById(id);
    return res.status(200).json({
      detail: "成功取得該使用者之相關資訊",
      member: {
        name: userInfo.name,
        phoneNumber: userInfo.phone,
        mail: userInfo.mail,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

const updateSeatState = async (req, res) => {
  try {
    const seat = req.body.seat;
    const username = req.body.username;
    if (!seat || isNaN(seat.index) || isNaN(seat.state) || !username) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (
      !(await seatService.checkSeatIndexExist(seat.index)) ||
      !Number.isInteger(Number(seat.state)) ||
      seat.state < seatProperties.stateRange.min ||
      seatProperties.stateRange.max < seat.state
    ) {
      return res.status(422).json({
        detail: "參數錯誤，請參考文件",
      });
    }

    if (!(await memberService.checkMemberExistsByUsername(username))) {
      return res.status(404).json({
        detail: "該會員並不存在，請聯絡相關人員",
      });
    }

    const memberInfo = await memberService.getMemberInfoByUsername(username);
    const result = await seatService.updateSeatState(
      parseInt(seat.index),
      parseInt(seat.state),
      new Date(),
      memberInfo.id
    );

    if (result !== "success") {
      logger.error(result);
      return res.status(500).json({
        detail: "伺服器內部錯誤",
      });
    }

    return res.status(200).json({
      detail: "成功修改座位資訊",
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      detail: "伺服器內部錯誤",
    });
  }
};

module.exports = {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  removeAdmin,
  addMember,
  updateSeatState,
  getMemberById,
};
