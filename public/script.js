$(document).ready(function () {
  var map = L.map('map').setView([54.371675,18.616328], 15);
  var events = [];
  var markers = [];
  var labels = [];

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var drawMarker = function (event) {
    var marker = new L.marker([event.location.lat, event.location.lon]);

    var label = !!event.score ? event.score[0] + ', ': '';
    label += event.date;

    marker.bindLabel(label, {
      noHide: true,
      className: 'label'
    });

    return marker.addTo(map);
  };

  var redraw = function () {
    markers.forEach(function (marker) {
      map.removeLayer(marker);
    });

    markers = [];

    events.forEach(function (event) {
      markers.push(drawMarker(event));
    });
  };

  map.on('click', function (event) {
    $.get('/search', {
      lat: event.latlng.lat,
      lon: event.latlng.lng
    }, function (data) {
      events = data;
      redraw();
    });
  });

  $.get('/events', function (data) {
    events = data;
    redraw();
  });
});
