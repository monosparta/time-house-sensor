const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);
const middleware = line.middleware(config);

const unknownMessageReply = async (event) => {
  console.log('unknownMessageReply')
  const replyMessage = {
    type: "text",
    text: "哈囉，若有任何疑問，請輸入以下關鍵字\n\t查看座位表--請輸入[A]",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "Sushi",
            text: "Sushi",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "Tempura",
            text: "Tempura",
          },
        },
      ],
    },
  };
  return await client.replyMessage(event.replyToken, replyMessage);
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
  middleware,
  unknownMessageReply,
  replySeatState,
};
