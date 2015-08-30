$(document).ready(function () {
  var map = L.map('map').setView([54.371675,18.616328], 15);
  var events = [];
  var markers = [];

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var drawMarker = function (event) {
    return new L.marker([event.location.lat, event.location.lon])
      .bindLabel(event.date, {
        noHide: true,
        className: 'label'
      })
      .addTo(map);
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

  $.get('/events', function (data) {
    events = data;
    redraw();
  });
});
