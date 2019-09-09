const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/*", { target: "https://calm-oasis-94316.herokuapp.com/" }));
};
