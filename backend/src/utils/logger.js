const path = require("path");
const moment = require("moment-timezone");
const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, label, printf } = format;

const apLogFileName = moment(new Date()).format("YYYY-MM-DD") + "-" + "ap.log";
const errorLogFileName =
  moment(new Date()).format("YYYY-MM-DD") + "-" + "error.log";

const myFormat = printf(
  (info) => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`
);

const appendTimestamp = format((info, opts) => {
  if (opts.tz) info.timestamp = moment().tz(opts.tz).format();
  return info;
});

const logger = createLogger({
  format: combine(
    // label({ label: \ }),
    appendTimestamp({ tz: "Asia/Taipei" }),
    myFormat
  ),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "..", "..", "logs", apLogFileName),
      options: { flags: "a", mode: 0o666 },
      level: "info",
      format: combine(
        label({ label: ":info:" }),
        appendTimestamp({ tz: "Asia/Taipei" }),
        myFormat
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, "..", "..", "logs", errorLogFileName),
      options: { flags: "a", mode: 0o666 },
      level: "error",
      format: combine(
        label({ label: ":error:" }),
        appendTimestamp({ tz: "Asia/Taipei" }),
        myFormat
      ),
    }),
  ],
});

// if (process.env.NODE_ENV === "develop") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

module.exports = logger;
