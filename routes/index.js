module.exports = (app) => {
  /* if (process.env.NODE_ENV === 'development') {
      app.use(
        '/api-docs',
        swaggerUi.serveFiles(swaggerDocument, {}),
        swaggerUi.setup(swaggerDocument)
      );
    } */
  app.use("/api/user", require("./user-routes"));
};
