module.exports = (app) => {
  /* if (process.env.NODE_ENV === 'development') {
      app.use(
        '/api-docs',
        swaggerUi.serveFiles(swaggerDocument, {}),
        swaggerUi.setup(swaggerDocument)
      );
    } */
  app.use("/api/user", require("./user-routes"));
  app.use("/api/company", require("./company-routes"));
  app.use("/api/vehicle", require("./vehicle-routes"));
  app.use("/api/location", require("./location-routes"));
};
