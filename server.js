const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/services', createProxyMiddleware({
  target: 'https://services.lttwdev.slcom-tws.com', 
  changeOrigin: true,
  pathRewrite: {
    '^/services': '/services',
  },
}));

app.listen(8080);