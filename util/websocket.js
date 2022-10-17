const ws = require("ws");
const Location = require("../models/location-model");

module.exports = async (expressApp) => {
  const wss = new ws.Server({
    noServer: true,
    path: "/sockets",
  });

  expressApp.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on("connection", async function connection(ws, request) {
    console.log("Connected");
    ws.on("message", async (data) => {
      const id = data.toString();

      const location = await Location.findOne({ driver: id }).sort({
        createdAt: -1,
      });

      ws.send(JSON.stringify(location));
    });
  });

  return wss;
};
