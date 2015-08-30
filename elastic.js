var request = require('request');
var config = require('config');

var host = config.get('elastic');

var deleteIndex = function () {
  request
    .del(host + '/events')
    .on('response', addIndex);
};

var addIndex = function () {
  request
    .put(host + '/events')
    .on('response', setGeoMapping);
};

var setGeoMapping = function () {
  request
    .put({
      url: host + '/events/event/_mapping',
      'content-type': 'application/json',
      body: JSON.stringify({
        event: {
          properties: {
            location: {
              type: 'geo_point'
            }
          }
        }
      })
    })
    .on('response', addEvents);
};

var addEvents = function () {
  request
    .post({
      url: host + '/events/event',
      'content-type': 'application/json',
      body: JSON.stringify({
        name: 'event 1',
        date: new Date(new Date().getTime() + 30 * 60000),
        location: {
          lat: 54.371675,
          lon: 18.616328
        }
      })
    });

  request
    .post({
      url: host + '/events/event',
      'content-type': 'application/json',
      body: JSON.stringify({
        name: 'event 2',
        date: new Date(new Date().getTime() + 30 * 60000),
        location: {
          lat: 54.376675,
          lon: 18.621328
        }
      })
    });

  request
    .post({
      url: host + '/events/event',
      'content-type': 'application/json',
      body: JSON.stringify({
        name: 'event 3',
        date: new Date(new Date().getTime() + 15 * 60000),
        location: {
          lat: 54.381675,
          lon: 18.626328
        }
      })
    });

  request
    .post({
      url: host + '/events/event',
      'content-type': 'application/json',
      body: JSON.stringify({
        name: 'event 4',
        date: new Date(new Date().getTime() + 90 * 60000),
        location: {
          lat: 54.366675,
          lon: 18.621328
        }
      })
    });

  request
    .post({
      url: host + '/events/event',
      'content-type': 'application/json',
      body: JSON.stringify({
        name: 'event 5',
        date: new Date(new Date().getTime() + 120 * 60000),
        location: {
          lat: 54.366675,
          lon: 18.611328
        }
      })
    });
};

deleteIndex();
