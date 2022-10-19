//const ws = require("ws");
const Location = require("../models/location-model");
const { Server } = require("socket.io");
//const { App } = require("uWebSockets.js");

module.exports = async (server) => {
  try {
    // const wss = new ws.Server({
    //   //server: expressApp,
    //   noServer: true,
    //   path: "/sockets",
    //   skipUTF8Validation: true,
    // });

    // expressApp.on("upgrade", (request, socket, head) => {
    //   wss.handleUpgrade(request, socket, head, (websocket) => {
    //     wss.emit("connection", websocket, request);
    //   });
    // });

    // wss.on("connection", async function connection(ws, request) {
    //   // ws.on("message", async (data) => {
    //   //   console.log("testing");
    //   //   // const id = data.toString();
    //   //   // const location = await Location.findOne({ driver: id }).sort({
    //   //   //   createdAt: -1,
    //   //   // });
    //   //   // const locationObj = {
    //   //   //   userId: id,
    //   //   //   location,
    //   //   // };
    //   //   // ws.send(JSON.stringify(locationObj));
    //   // });
    // });

    // wss.on("error", (error) => console.log(error.message));

    // return wss;
    //const uwsApp = new App();
    const io = new Server(server);

    //io.attachApp(uwsApp);

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("driver-update", async (driverId) => {
        const location = await Location.findOne({ driver: driverId }).sort({
          createdAt: -1,
        });

        io.emit("driver-update", location);
      });
    });

    // uwsApp.listen(5070, () => {
    //   console.log("UWS CONNECTED!");
    // });

    return io;
  } catch (err) {
    console.log(err);
  }
};
