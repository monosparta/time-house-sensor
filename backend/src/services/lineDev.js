require("dotenv").config();
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const db = require("../models/index");

const client = new line.Client(config);
const middleware = line.middleware(config);

const unknownMessageReply = async (event, status, username) => {
  if (!status) {
    const replyMessage = {
      type: "text",
      text: "請輸入您的暱稱",
    };
    return await client.replyMessage(event.replyToken, replyMessage);
  } else {
    userMessageReply(event, username);
  }
};

const replySeatState = async (event) => {
  const replyMessage = {
    type: "image",
    originalContentUrl:
      process.env.PUBLIC_URL + "/api/static/img/seats/seat_map.png",
    previewImageUrl:
      process.env.PUBLIC_URL + "/api/static/img/seats/seat_map.png",
  };
  return await client.replyMessage(event.replyToken, replyMessage);
};

const adminMessageReply = async (event, status, username) => {
  if (!status) {
    const adminReplyMessage = {
      type: "flex",
      altText: "admin",
      contents: {
        type: "bubble",
        size: "kilo",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: username + "登入成功",
              weight: "bold",
              size: "xl",
              contents: [],
            },
            {
              type: "text",
              text: "管理員身份完成驗證 , 推播功能開啟。",
              weight: "regular",
              size: "xs",
              contents: [],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          flex: 0,
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "進入後台",
                uri: process.env.PUBLIC_URL,
              },
              height: "sm",
              style: "secondary",
            },
            {
              type: "button",
              action: {
                type: "postback",
                label: "查看座位現況",
                data: "seat",
                displayText: "查看座位現況",
              },
              height: "sm",
              style: "link",
            },
            {
              type: "spacer",
              size: "xs",
            },
          ],
        },
      },
    };
    return await client.replyMessage(event.replyToken, adminReplyMessage);
  } else {
    userMessageReply(event, username);
  }
};
const userMessageReply = async (event, username, level) => {
  if (level) {
    const userReplyMessage = {
      type: "text",
      text:
        "哈囉" +
        username +
        "，若有任何疑問，請輸入以下關鍵字\n\t查看座位表--請輸入[查看座位]",
    };
    return await client.replyMessage(event.replyToken, userReplyMessage);
  } else {
    const userReplyMessage = {
      type: "text",
      text:
        "哈囉" +
        username +
        "，若有任何疑問，請輸入以下關鍵字\n\t查看座位表--請輸入[查看座位]\n\t進入後台--請輸入[進入後台]",
    };
    return await client.replyMessage(event.replyToken, userReplyMessage);
  }
};
const replyFeedBackMessage = async (event) => {
  const replyMessageFeedBack = {
    type: "text",
    text: "此功能性暫未公開",
  };
  return await client.replyMessage(event.replyToken, replyMessageFeedBack);
};
const replyWeb = async (event) => {
  const replyWebMessage = {
    type: "text",
    text: process.env.PUBLIC_URL,
  };
  return await client.replyMessage(event.replyToken, replyWebMessage);
};
const updateMemberLogin = async (memberLogin, memberlineId) => {
  await db["LineUsers"].update(
    { login: memberLogin },
    {
      where: {
        lineId: memberlineId,
      },
    }
  );
};
const updateMemberUserName = async (memberUserName, memberlineId) => {
  await db["LineUsers"].update(
    { nickname: memberUserName },
    {
      where: {
        lineId: memberlineId,
      },
    }
  );
};
const createMemberData = async (memberlineId) => {
  await db["LineUsers"].create({
    lineId: memberlineId,
    login: 0,
  });
};
const findMemberData = async (memberlineId) => {
  let member = await db["LineUsers"].findOne({
    where: { lineId: memberlineId },
  });
  return member;
};
const searchMemberLevel = async (lineId) => {
  admins = await db["Members"].findOne({
    where: { lineId: lineId },
  });
  return admins===null?1:0
};
const pushAdminMessage = async (id) => {
  let admins = await db["LineUsers"].findAll({
    where: { level: 0 },
  });
  const pushMessageToAdmin = {
    type: "text",
    text: id + "座位已閒置30分鐘以上",
  };
  admins = admins.map((admin) => {
    client
      .pushMessage(admin.lineId, pushMessageToAdmin, false)
      .then(() => {})
      .catch((err) => {
        // error handling
      });
  });
};
module.exports = {
  config,
  client,
  middleware,
  unknownMessageReply,
  replySeatState,
  adminMessageReply,
  userMessageReply,
  replyFeedBackMessage,
  pushAdminMessage,
  updateMemberLogin,
  createMemberData,
  updateMemberUserName,
  findMemberData,
  replyWeb,
  searchMemberLevel,
};
