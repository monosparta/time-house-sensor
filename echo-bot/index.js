"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
require("dotenv").config();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.message.text != "A") {
    const userid = event.source.userId;
    client
      .getProfile(userid)
      .then((profile) => {
        const username = profile.displayName; //顯示使用者名字
        const echo = {
          type: "text",
          text:
            "哈囉" +
            username +
            "\n若有任何疑問,請輸入以下關鍵字\n\n查看座位表--請輸入[A]",
        };
        return client.replyMessage(event.replyToken, echo);
      })
      .catch((err) => {
        // error handling
      });
  } 
  if (event.type == "message" && event.message.text == "A") {
    const pic = {
      type: "image",
      originalContentUrl:
        "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
      previewImageUrl:
        "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
    };
    return client.replyMessage(event.replyToken, pic);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
