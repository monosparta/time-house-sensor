const { memberService, seatService } = require("../services/index");
const lineDev = require("../services/lineDev");
const seatProperty = require("../utils/seat");
const logger = require("../utils/logger");

/**
 *
 * @param {seatUseState} 0: nobody, 1: someone
 */
const LDHandler = async ({ index, seatUseState, time }) => {
  const seat = await seatService.getOneSeatInfo(index);
  if (seat.state === seatProperty.state.AVAILABLE) {
    return;
  }
  if (seatUseState === 0) {
    const utcFormatTime =
      time.split(" ")[0] + "T" + time.split(" ")[1] + ".000Z";
    seatService.updateSeatState(
      index,
      seatProperty.state.IDLE_TOO_LONG,
      new Date(utcFormatTime),
      seat.memberId
    );
    lineDev.pushAdminMessage(index);
  } else if (seatUseState === 1) {
    seatService.updateSeatState(
      index,
      seatProperty.state.USING,
      new Date(time),
      seat.memberId
    );
  }
};

const PN532Handler = async ({ index, cardId, time }) => {
  const memberInfo = await memberService.getMemberInfoByCardId(cardId);
  if (!memberInfo) {
    return;
  }
  const utcFormatTime = time.split(" ")[0] + "T" + time.split(" ")[1] + ".000Z";
  seatService.updateSeatState(
    index,
    seatProperty.state.USING,
    new Date(utcFormatTime),
    memberInfo.id
  );
};

const errorHandler = async ({ index, _errorMessage, _sensorName, time }) => {
  const utcFormatTime = time.split(" ")[0] + "T" + time.split(" ")[1] + ".000Z";
  seatService.updateSeatState(
    index,
    seatProperty.state.ERROR,
    new Date(utcFormatTime),
    null
  );
};

module.exports = {
  LDHandler,
  PN532Handler,
  errorHandler,
};
