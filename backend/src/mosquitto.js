require("dotenv").config();
const mqtt = require("mqtt");
const mqttController = require("./controllers/mosquitto");
let topics = { IR: { qos: 2 }, RFID: { qos: 2 }, Error: { qos: 2 } };
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
  console.log("Broker connected!!");
  client.subscribe(topics, {qos: 2}, () => {
    console.log(`Subscribe to topic '${topics}'`);
  });
});

// (err, granted) => {
//   console.log(`Subscribe to topic '${topics}'`);
//   console.log(err);
//   console.log(granted);
// }

client.on("message", (topic, payload) => {
  payload = JSON.parse(payload);
  try {
    if (topic === "IR") {
      mqttController.IRHandler(payload);
    } else if (topic === "RFID") {
      mqttController.RFIDHandler(payload);
    } else if (topic === "Error") {
      mqttController.errorHandler(payload);
    }
  } catch (error) {
    return;
  }
});

client.on("error", (error) => {
  console.log("Can't connect " + error);
});
