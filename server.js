var express = require('express');
var request = require('request');
var config = require('config');

var host = config.get('elastic');

var app = express();

app.get('/events', function (req, res) {
  res.set({
    'content-type': 'application/json'
  });

  request.get(host + '/events/_search', function (err, reqRes, body) {
    var json = JSON.parse(body);

    res.send(JSON.stringify(json.hits.hits.map(function (hit) {
      return hit._source;
    })));
  });
});

app.post('/events', function (req, res) {

});

app.use(express.static('public'));

app.listen(config.get('port'), function () {
    console.log('server up');
});
