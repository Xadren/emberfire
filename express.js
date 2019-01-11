const express = require('express');
const fastbootMiddleware = require('fastboot-express-middleware');
const FastBoot = require('fastboot');

let app = express();

let fastboot = new FastBoot({
  distPath: `${__dirname}/dist`,
  sandboxGlobals: {
    XMLHttpRequest: require('xhr2'),
    WebSocket: require('ws')
  }
});

let middleware = fastbootMiddleware({
  fastboot: fastboot
});

app.use('/assets', express.static(`${__dirname}/dist/assets`));
app.all('/*', middleware);

app.listen(3000, function () {
  console.log('FastBoot app listening on port 3000!');
});