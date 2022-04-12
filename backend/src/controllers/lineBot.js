const lineDev = require("../services/lineDev");
const db = require("../models/index");
const client = lineDev.client;
let event_num=-1;
const lineMessageHandler = async (req, res) => {
  try {
    event_num++;
    if (!req.body.events.length) return res.status(200).json({});
    let event = req.body.events[0];
    const message_user_id = event.source.userId;
    const admin_richmenu = "richmenu-d0cdc7f42d5827d17a6de8a3385bc80c";
    let member = (
      await db["Members"].findOne({ where: { lineId: message_user_id } })
    );
    if (!((member==null)&& event_num)) {
      client.linkRichMenuToUser(message_user_id, admin_richmenu);
      const adminreplyResult = await lineDev
        .AdminMessageReply(event)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(adminreplyResult);
    }
    if (event.type !== "message" || !event?.message?.text) {
      const replyResult = await lineDev
        .unknownMessageReply(event)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(replyResult);
    }

    const text = event.message.text;
    return res.json({});
    // todo: keyword extract
    // todo: analyze keyword about seat(more important) or login info

    // todo: if message.text is about seat return img

    // todo: if message.text is about login
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports = {
  lineMessageHandler,
};
