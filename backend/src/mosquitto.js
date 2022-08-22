require("dotenv").config();
const mqtt = require("mqtt");
const mqttController = require("./controllers/mosquitto");
const logger = require("./utils/logger");

let topics = { LD: { qos: 2 }, PN532: { qos: 2 }, Error: { qos: 2 } };
let client = mqtt.connect(
  "mqtt://" + process.env.MQTT_HOST + ":" + process.env.MQTT_PORT,
  {
    clientId: "express",
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
    resubscribe: true,
  }
);

client.on("connect", () => {
  logger.info("Broker connected!!");
  client.subscribe(topics, { qos: 2 }, (err, _granted) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Subscribe to topics}`);
    }
  });
});

client.on("message", (topic, payload) => {
  payload = JSON.parse(payload);
  try {
    logger.info(payload);
    if (topic === "LD") {
      mqttController.LDHandler(payload);
    } else if (topic === "PN532") {
      mqttController.PN532Handler(payload);
    } else if (topic === "Error") {
      mqttController.errorHandler(payload);
    }
  } catch (error) {
    logger.error(error);
    return;
  }
});

client.on("error", (error) => {
  logger.error("Can't connect " + error);
});
