const express = require('express');

const routes = require('../src/mock/index');

const app = express();

app.use('/mock', routes);

module.exports = app.listen(8888, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  const uri = `http://127.0.0.1:8888`;
  console.log(`Listening at ${uri}\n`);
});

