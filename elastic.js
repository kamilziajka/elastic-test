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
    .on('response', setMapping);
};

var setMapping = function () {
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
        date: '2015-09-10T13:20:00.000Z',
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
        date: '2015-09-10T13:20:00.000Z',
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
        date: '2015-09-10T15:20:00.000Z',
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
        date: '2015-09-10T13:50:00.000Z',
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
        date: '2015-09-10T13:50:00.000Z',
        location: {
          lat: 54.366675,
          lon: 18.611328
        }
      })
    });
};

deleteIndex();
