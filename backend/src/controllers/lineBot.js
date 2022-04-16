const lineDev = require("../services/lineDev");
const db = require("../models/index");
const client = lineDev.client;
const lineMessageHandler = async (req, res) => {
  try {
    if (!req.body.events.length) return res.status(200).json({});
    let event = req.body.events[0];
    let adminRichMenu = "richmenu-1a536f898ebd309587fd29907d61e059";
    const messageUserId = event.source.userId;
    let member = await db["Members"].findOne({
      where: { lineId: messageUserId },
    });
   

    //使用者加入官方帳號
    if (event.type === "follow") {
      if (member === null) {
        // await db["Members"].create({
        //   lineId: messageUserId,
        //   login: 0,
        //   cardId: "123zxc",
        //   level: 1,
        // });
        await lineDev.createMemberData(messageUserId)
      }
      return "ok";
    }
    //使用者點擊菜單[查看座位]或發送關鍵字[查看座位]
    
    if (
      (event.type === "postback" && event.postback.data === "seat") ||
      (event.type === "message" && event.message.text === "查看座位")
    ) {
      const postbackSeat = await lineDev
        .replySeatState(event)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(postbackSeat);
    }
    //使用者點擊菜單[回報]
    if (event.type === "postback" && event.postback.data === "feedback") {
      const postbackFeedBack = await lineDev
        .replyFeedBackMessage(event)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(postbackFeedBack);
    }
    //使用者封鎖官方帳號
    if (event.type === "unfollow") {
      await lineDev.updateMemberLogin(0,messageUserId)

      // await db["Members"].update(
      //   { login: 0 },
      //   {
      //     where: {
      //       lineId: messageUserId,
      //     },
      //   }
      // );
      return "ok";
    }
    //使用者發送非文字訊息(如貼圖、影片、音訊等等)
    if ((event.type !== "message" ) || event.message.type !== "text") {
      const replyResult = await lineDev
        .unknownMessageReply(event, member.dataValues.login)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(replyResult);
    }
    //使用者加入官方帳號後，第一次發送訊息
    if (
      event.type === "message" &&
      event.message.type === "text" &&
      !member.dataValues.login
    ) {
      await lineDev.updateMemberUserName(event.message.text,messageUserId)

      // await db["Members"].update(
      //   { username: event.message.text },
      //   {
      //     where: {
      //       lineId: messageUserId,
      //     },
      //   }
      // );
    }

    member = await db["Members"].findOne({
      where: { lineId: messageUserId },
    });
    //使用者加入官方帳號後，第一次發送訊息後，辨別為管理者
    if (member.dataValues.level === 0) {
      client.linkRichMenuToUser(messageUserId, adminRichMenu);
      await lineDev.updateMemberLogin(1,messageUserId)

      // await db["Members"].update(
      //   { login: 1 },
      //   {
      //     where: {
      //       lineId: messageUserId,
      //     },
      //   }
      // );
      const adminReplyResult = await lineDev
        .adminMessageReply(
          event,
          member.dataValues.login,
          member.dataValues.username
        )
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(adminReplyResult);
    }
    //使用者加入官方帳號後，第一次發送訊息後，辨別為一般使用者

    if (member.dataValues.level === 1) {
      lineDev.updateMemberLogin(1,messageUserId)

      // await db["Members"].update(
      //   { login: 1 },
      //   {
      //     where: {
      //       lineId: messageUserId,
      //     },
      //   }
      // );
      const userReplyResult = await lineDev
        .userMessageReply(event, member.dataValues.username)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
      return res.json(userReplyResult);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
module.exports = {
  lineMessageHandler,
};
