const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);
const middleware = line.middleware(config);

const unknownMessageReply = async (event) => {
  console.log("unknownMessageReply");
  const replyMessage = {
    type: "text",
    text: "哈囉，若有任何疑問，請輸入以下關鍵字\n\t查看座位表--請輸入[查看座位]",
  };
  return await client.replyMessage(event.replyToken, replyMessage);
};
const AdminMessageReply = async (event) => {
  console.log("AdminMessageReply");
  const adminreplyMessage = {
    type: "flex",
    altText: "admin",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: "Jane登入成功",
            weight: "bold",
            size: "xl",
            wrap: true,
            contents: [],
          },
          {
            type: "text",
            text: "管理員身份完成驗證 , 推播功能開啟。",
            size: "sm",
            color: "#000000FF",
            flex: 0,
            margin: "md",
            wrap: true,
            contents: [],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "進入後台",
              uri: "https://linecorp.com",
            },
            flex: 2,
            color: "#AAAAAA",
            style: "primary",
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "查看座位現況",
              data: "seat",
            },
          },
        ],
      },
    },
  };
  return await client.replyMessage(event.replyToken, adminreplyMessage);
};
const replySeatState = async (event) => {
  // const replyMessage = {
  //   type: "image",
  //   originalContentUrl: process.env.PUBLIC_URL + "/static/doggy.jpg",
  //   previewImageUrl: process.env.PUBLIC_URL + "/static/doggy.jpg",
  // };
  const replyMessage = {
    type: "image",
    originalContentUrl:
      "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
    previewImageUrl:
      "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
  };
  return await client.replyMessage(event.replyToken, replyMessage);
};

module.exports = {
  config,
  client,
  middleware,
  unknownMessageReply,
  replySeatState,
  AdminMessageReply,
};
