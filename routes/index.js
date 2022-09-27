module.exports = (app) => {
  app.use("/api/user", require("./user-routes"));
  app.use("/api/company", require("./company-routes"));
  app.use("/api/vehicle", require("./vehicle-routes"));
  app.use("/api/location", require("./location-routes"));
};
