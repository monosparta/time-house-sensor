const { memberService, seatService } = require("../services/index");
const lineDev = require("../services/lineDev");
const seatProperty = require("../utils/seat");
/**
 *
 * @param {seatUseState} 0: nobody, 1: someone
 */
const IRHandler = async ({ index, seatUseState, time }) => {
  const seat = await seatService.getOneSeatInfo(index);
  if (seatUseState === 0) {
    if (seat.state === seatProperty.AVAILABLE) {
      return;
    }
    seatService.updateSeatState(
      index,
      seatProperty.state.IDLE_TOO_LONG,
      new Date(time),
      seat.memberId
    );
    lineDev.pushAdminMessage(index);
    return;
  } else if (seatUseState === 1) {
    seatService.updateSeatState(index, seatProperty.USING, new Date(time), seat.memberId);
  }
};

const RFIDHandler = async ({ index, cardId }) => {
  const memberInfo = await memberService.getMemberInfoByCardId(cardId);
  if (!memberInfo) {
    return;
  }
  seatService.updateSeatState(index, seatProperty.USING, new Date(time), memberInfo.id);
};

const errorHandler = async ({ index, errorMessage, sensorName }) => {
  seatService.updateSeatState(index, seatProperty.ERROR, new Date(time), null);
};

module.exports = {
  IRHandler,
  RFIDHandler,
  errorHandler,
};
