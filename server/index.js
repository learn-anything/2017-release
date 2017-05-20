const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://my.mindnode.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
    res.sendfile('index.html', { root: 'client'});
})

app.get('/static/bundle.js', function (req, res) {
    res.sendfile('dist/bundle.js', { root: 'client'});
})

app.listen(3000, function () {

})


