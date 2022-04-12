const lineDev = require("../services/lineDev");
const client = lineDev.client;
const sql = require("mysql2");
const db_option = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
};

let userId = new Array();
let connection = sql.createConnection(db_option);
let query = "SELECT * FROM Members";
connection.query(query, function (err, rows, fields) {
  if (err) throw err;
  userId.push(rows[0].lineId);
});

const lineMessageHandler = async (req, res) => {
  try {
    if (!req.body.events.length) return res.status(200).json({});
    let event = req.body.events[0];
    const message_user_id = event.source.userId;
    const admin_richmenu = "richmenu-d0cdc7f42d5827d17a6de8a3385bc80c";
    userId.forEach(function (id) {
      if (id === message_user_id) {
        client.linkRichMenuToUser(message_user_id, admin_richmenu);
      }
    });
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
