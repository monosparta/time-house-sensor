const path = require("path");
const moment = require("moment-timezone");
const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, colorize, errors, label, printf } =
  format;

const apLogFileName = moment(new Date()).format("YYYY-MM-DD") + "-" + "ap.log";
const errorLogFileName =
  moment(new Date()).format("YYYY-MM-DD") + "-" + "error.log";

const errorStackFormat = printf((info) => {
  if (info.level === "error") {
    return `${info.timestamp} [${info.level}]: ${info.label} - ${info.stack}`;
  }
  return `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`;
});

const appendTimestamp = format((info, opts) => {
  if (opts.tz) info.timestamp = moment().tz(opts.tz).format();
  return info;
});

const logger = createLogger({
  format: combine(
    // format.splat(),
    errors({ stack: true }),
    errorStackFormat,
    // colorize(),
    appendTimestamp({ tz: "Asia/Taipei" }),
    prettyPrint()
  ),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "..", "..", "logs", apLogFileName),
      options: { flags: "a", mode: 0o666 },
      level: "info",
      format: combine(
        label({ label: ":info:" }),
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, "..", "..", "logs", errorLogFileName),
      options: { flags: "a", mode: 0o666 },
      level: "error",
      format: combine(
        label({ label: ":error:" }),
        
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
