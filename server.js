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

app.get('/search', function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;

  res.set({
    'content-type': 'application/json'
  });

  request.post({
    url: host + '/events/_search',
    'content-type': 'application/json',
    body: JSON.stringify({
      query: {
        function_score: {
          functions: [
            {
              gauss: {
                location: {
                  origin: {
                    lat: lat,
                    lon: lon
                  },
                  offset: '0.64km',
                  scale: '0.64km'
                }
              }
            },
            {
              gauss: {
                date: {
                  origin: new Date(),
                  offset: '0.5h',
                  scale: '0.5h'
                }
              }
            }
          ]
        }
      }
    })
  }, function (err, reqRes, body) {
    if (!!err) {
      console.log(err);
    } else {
      var json = JSON.parse(body);

      res.send(JSON.stringify(json.hits.hits.map(function (hit) {
        var result = hit._source;
        result.score = hit._score;
        return result;
      })));
    }
  });
});

app.use(express.static('public'));

app.listen(config.get('port'), function () {
    console.log('server up');
});
