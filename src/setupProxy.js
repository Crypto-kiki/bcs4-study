// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시 경로를 동적으로 처리하도록 설정
  app.use(
    createProxyMiddleware("/rss", {
      target: "https://v2.velog.io",
      changeOrigin: true,
      pathRewrite: {
        // /rss 경로를 /rss로 변환
        "^/rss": "/rss",
      },
    })
  );
};
