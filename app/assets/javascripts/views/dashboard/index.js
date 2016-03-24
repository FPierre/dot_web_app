$(document).on('ready page:load', function() {
  if ($('body.dashboard.index').length) {
    console.log('body.dashboard.index');

    // Hauteur des zones

    var windowsHeight = $(window).height(),
        headerHeight = $('nav').height(),
        zoneHeight = (windowsHeight - headerHeight - 20 - 20);

    // $('.zone').height(zoneHeight);

    // Google Map

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    function calcRoute() {
      var origin      = new google.maps.LatLng(41.850033, -87.6500523);
      var destination = new google.maps.LatLng(42.850033, -85.6500523);
      var request = {
        destination: destination,
        origin: origin,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }

    calcRoute();

    handler = Gmaps.build('Google');

    handler.buildMap({
      internal: { id: 'zone-1' },
      provider: {
        disableDefaultUI: true,
        scrollwheel: false,
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
      }
    }, function() {
      directionsDisplay.setMap(handler.getMap());

      markers = handler.addMarkers([
        {
          'lat': 0,
          'lng': 0,
          'picture': {
            'url': 'http://people.mozilla.com/~faaborg/files/shiretoko/firefoxIcon/firefox-32.png',
            'width':  32,
            'height': 32
          },
          'infowindow': 'hello!'
        }
      ]);

      handler.bounds.extendWith(markers);
      handler.fitMapToBounds();
    });
  }
});
