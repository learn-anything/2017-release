var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
    res.sendfile('index.html', { root: 'client'});
})

app.get('/static/bundle.js', function (req, res) {
    res.sendfile('dist/bundle.js', { root: 'client'});
})

app.listen(3000, function () {

})


