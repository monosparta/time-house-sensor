const lineDev = require("../services/lineDev");

const lineMessageHandler = async (req, res) => {
  try {
    let event = req.body.events[0];
    const userId = event.userId;
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
    
    // todo: keyword extract
    // todo: analyze keyword about seat(more important) or login info

    // todo: if message.text is about seat return img

    // todo: if message.text is about login
  } catch (err) {
    return res.status(500).end();
  }
};

// app.post("/callback", line.middleware(config), (req, res) => {
//     Promise.all(req.body.events.map(handleEvent))
//       .then((result) => res.json(result))
//       .catch((err) => {
//         console.error(err);
//         res.status(500).end();
//       });
//   });

//   // event handler
//   function handleEvent(event) {
//     if (event.message.text != "A") {

//     }
//     if (event.type == "message" && event.message.text == "A") {
//       const pic = {
//         type: "image",
//         originalContentUrl:
//           "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
//         previewImageUrl:
//           "https://hahow-production.imgix.net/5c8a9c69145e290020a25f22?w=1000&sat=0&auto=format&s=43868cef2b253e06ef0bffd260c51672",
//       };
//       return client.replyMessage(event.replyToken, pic);
//     }
//   }

module.exports = {
  lineMessageHandler,
};
