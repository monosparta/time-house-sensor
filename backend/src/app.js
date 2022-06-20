require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const lineDev = require("./services/lineDev");
const app = express();
const logger = require("./utils/logger");

const router = express.Router();
// use line.middleware before express.json, ref https://github.com/line/line-bot-sdk-nodejs/blob/next/docs/api-reference/middleware.md
router.use("/api/line", lineDev.middleware);

router.use(helmet());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/static", express.static("public"));

require("./routes")(router);
app.use(router);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(`Server is running on port ${process.env.PORT}.`);
  });
}

require("./mosquitto");


module.exports = app;