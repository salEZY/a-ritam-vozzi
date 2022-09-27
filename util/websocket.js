const ws = require("ws");
const Location = require("../models/location-model");

module.exports = async (expressApp) => {
  const websocketServer = new ws.Server({
    noServer: true,
    path: "/websockets",
  });

  expressApp.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on(
    "connection",
    async function connection(websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split("?");

      // Send drivers last location
      if (params !== undefined && params?.split("=")[0] === "userId") {
        const location = await Location.find({ driver: params.split("=")[1] })
          .sort({ createdAt: -1 })
          .limit(1);

        websocketConnection.send(
          `Last location for driver ${location[0].driver?.firstName} ${location[0].driver?.lastName}: ${location[0]}`
        );
      } else {
        websocketConnection.send(`User id is required`);
      }
    }
  );

  return websocketServer;
};
