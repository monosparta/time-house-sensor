const { memberService, seatService } = require("../services/index");
const lineDev = require("../services/lineDev");
const seatState = require("../utils/seatState");
/**
 *
 * @param {seatUseState} 0: nobody, 1: someone
 */
const IRHandler = async ({ index, seatUseState }) => {
  const seat = await seatService.getOneSeatInfo(index);
  if (seatUseState === 0) {
    if (seat.state === seatState.AVAILABLE) {
      return;
    }
    const idleTime = new Date(new Date().getTime() - 1000 * 60 * 30);
    seatService.updateSeatState(
      index,
      seatState.IDLE_TOO_LONG,
      seat.memberId,
      idleTime
    );
    lineDev.pushAdminMessage(index);
    return;
  } else if (seatUseState === 1) {
    seatService.updateSeatState(index, seatState.USING, seat.memberId);
  }
};

const RFIDHandler = async ({ index, cardId }) => {
  const memberInfo = await memberService.getMemberInfoByCardId(cardId);
  if (!memberInfo) {
    return;
  }
  seatService.updateSeatState(index, seatState.USING, memberInfo.id);
};

const errorHandler = async ({ index, errorMessage, sensorName }) => {
  seatService.updateSeatState(index, seatState.ERROR, null);
};

module.exports = {
  IRHandler,
  RFIDHandler,
  errorHandler,
};
