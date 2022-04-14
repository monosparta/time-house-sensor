const db = require("../models/index");
const { memberService, seatService } = require("../services/index");

const addMember = async (req, res) => {
  const payload = req.tokenPayload;
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

    if (!(await memberService.checkMemberExists(username))) {
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
    console.log(err);
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
};
