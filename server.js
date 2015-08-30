var express = require('express');
var request = require('request');
var config = require('config');

var app = express();

app.listen(config.get('port'), function () {
    console.log('server up');
});
