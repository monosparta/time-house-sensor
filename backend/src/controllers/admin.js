const db = require("../models/index");
const { memberService, seatService } = require("../services/index");

// add member for one-day member or want-experience member
const addMember = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.mail || !body.phoneNumber) {
      return res.status(422).json({
        type: "/errors/Incomplete-body",
        title: "Incomplete-body-para.",
        status: 422,
        detail: "Incomplete body parameter.",
        instance: "/api/auth/admin/addUser",
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
        type: "/errors/username-already-exist",
        title: "Username already exist.",
        status: 400,
        detail: "Username already exist.",
        instance: "/api/auth/admin/addUser",
      });
    }
    return res.status(200).json({
      type: "/passes/create-a-new-member",
      title: "Successfully create a new member.",
      status: 200,
      detail: "Successfully create a new member.",
      instance: "/api/auth/admin/addUser",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      type: "/errors/internal-error",
      title: "Server Internal Error",
      status: 500,
      detail: "Server internal error, please contact administrator.",
      instance: "/api/auth/admin/seatState",
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    let id = req.query?.memberId;
    if (!id) {
      return res.status(422).json({
        type: "/errors/Incomplete-query",
        title: "Incomplete-query-para.",
        status: 422,
        detail: "Incomplete query parameter.",
        instance: "/api/auth/admin/memberInfo",
      });
    }

    if (!(await memberService.checkMemberExistsById(parseInt(id)))) {
      return res.status(404).json({
        type: "/errors/not-found-member",
        title: "can not find this member.",
        status: 404,
        detail: "can not find this member, please contact administrator",
        instance: "/api/auth/admin/memberInfo",
      });
    }

    const userInfo = await memberService.getMemberInfoById(parseInt(id));
    return res.status(200).json({
      type: "/passes/get-member-information",
      title: "Successfully get member information",
      status: 200,
      detail: "Successfully get member information by id.",
      instance: "/api/auth/admin/memberInfo",
      member: {
        name: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        mail: userInfo.mail,
      },
    });
  } catch (err) {
    return res.status(500).json({
      type: "/errors/internal-error",
      title: "Server Internal Error",
      status: 500,
      detail: "Server internal error, please contact administrator.",
      instance: "/api/auth/admin/memberInfo",
    });
  }
};

const updateSeatState = async (req, res) => {
  try {
    const seat = req.body.seat;
    const username = req.body.username;
    if (!seat || !seat.index || !seat.state || !username) {
      return res.status(422).json({
        type: "/errors/incorrect-body-info",
        title: "Incorrect-body-info.",
        status: 422,
        detail: "This route path just for admin user.",
        instance: "/api/auth/admin/seatState",
      });
    }

    if (
      !(await seatService.checkSeatIndexExist(seat.index)) ||
      seat.state < -1 ||
      2 < seat.state
    ) {
      return res.status(422).json({
        type: "/errors/incorrect-seat-info",
        title: "Incorrect seat index or state.",
        status: 422,
        detail: "Incorrect seat index or state.",
        instance: "/api/auth/admin/seatState",
      });
    }

    if (!(await memberService.checkMemberExistsByUsername(username))) {
      return res.status(422).json({
        type: "/errors/no-member",
        title: "Not found this member.",
        status: 422,
        detail: "Not found this member.",
        instance: "/api/auth/admin/seatState",
      });
    }

    const memberInfo = await memberService.getMemberInfoByUsername(username);
    const result = await seatService.updateSeatState(
      parseInt(seat.index),
      parseInt(seat.state),
      parseInt(memberInfo.id)
    );
    if (result !== "success") {
      console.log(result);
      return res.status(500).json({
        type: "/errors/internal-error",
        title: "Server Internal Error",
        status: 500,
        detail: "Server internal error, please contact administrator.",
        instance: "/api/auth/admin/seatState",
      });
    }

    //   todo call the python rpc server to change the image

    return res.status(200).json({
      type: "/passes/updated-seat-state",
      title: "Successfully updated the seat state.",
      status: 200,
      detail: "Successfully updated the seat state..",
      instance: "/api/auth/admin/seatState",
    });
  } catch (err) {
    return res.status(500).json({
      type: "/errors/internal-error",
      title: "Server Internal Error",
      status: 500,
      detail: "Server internal error, please contact administrator.",
      instance: "/api/auth/admin/seatState",
    });
  }
};

module.exports = {
  addMember,
  updateSeatState,
  getMemberById,
};
