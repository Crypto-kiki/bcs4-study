// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/rss", {
      target: "https://v2.velog.io",
      changeOrigin: true,
      pathRewrite: {
        "^/rss": "/rss",
      },
    })
  );
};
