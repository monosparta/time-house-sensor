const mqtt = require("mqtt");
const mqttController = require("./controllers/mosquitto");
let topics = ["IR", "RFID", "Error"];
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
  console.log("connected  " + client.connected);
  client.subscribe(topics, () => {
    console.log(`Subscribe to topic '${topics}'`);
  });
});

client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  if (topic === "IR") {
    mqttController.IRHandler(payload);
  } else if (topic === "RFID") {
    mqttController.RFIDHandler(payload);
  } else if (topic === "Error") {
    mqttController.errorHandler(payload);
  }
});

client.on("error", (error) => {
  console.log("Can't connect " + error);
  reconnect();
});
