// https://github.com/line/line-bot-sdk-nodejs/blob/next/docs/guide/client.md

// ! pushMessage(to: string, messages: Message | Message[], notificationDisabled: boolean = false): Promise<MessageAPIResponseBase>
client.pushMessage(userId, { type: "text", text: "hello, world" });

// https://developers.line.biz/en/docs/messaging-api/using-quick-reply/#using-quick-reply-introduction

// ! replyMessage(replyToken: string, messages: Message | Message[], notificationDisabled: boolean = false): Promise<MessageAPIResponseBase>
client.replyMessage(replyToken, {
  type: "text", // ①
  text: "Select your favorite food category or send me your location!",
  quickReply: {
    // ②
    items: [
      {
        type: "action", // ③
        imageUrl: "https://example.com/sushi.png",
        action: {
          type: "message",
          label: "Sushi",
          text: "Sushi",
        },
      },
      {
        type: "action",
        imageUrl: "https://example.com/tempura.png",
        action: {
          type: "message",
          label: "Tempura",
          text: "Tempura",
        },
      },
      {
        type: "action", // ④
        action: {
          type: "location",
          label: "Send location",
        },
      },
    ],
  },
});
