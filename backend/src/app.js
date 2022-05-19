require("dotenv").config();
const express = require("express");
const cors = require("cors");
const lineDev = require("./services/lineDev");
const app = express();

const router = express.Router();
// use line.middleware before express.json, ref https://github.com/line/line-bot-sdk-nodejs/blob/next/docs/api-reference/middleware.md
router.use("/api/line", lineDev.middleware);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static("public"));

require("./routes")(router);
app.use(router);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${process.env.PORT}.`);
});

require("./mosquitto");
