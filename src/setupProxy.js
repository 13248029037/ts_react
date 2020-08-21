const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/bk", {
      target: "/",
      ws: true,
      changeOrigin: true,
      pathRewrite: {
      },
    }),
    // createProxyMiddleware("/ws", {
    //   target: "ws://",
    //   ws: true,
    //   changeOrigin: true,
    //   pathRewrite: {
    //   },
    // })
  );
}
