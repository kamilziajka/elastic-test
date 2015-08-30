var express = require('express');
var request = require('request');
var config = require('config');

var app = express();

app.get('/events', function (req, res) {
  var events = [];

  res.set({
    'content-type': 'application/json'
  });

  events.push({
    location: {
      lat: 54.371675,
      lon: 18.616328
    }
  });

  res.send(JSON.stringify(events));
});

app.post('/events', function (req, res) {

});

app.use(express.static('public'));

app.listen(config.get('port'), function () {
    console.log('server up');
});
