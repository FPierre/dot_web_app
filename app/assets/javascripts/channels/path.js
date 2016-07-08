$(document).on('ready', function () {
  if ($('html.screens.team').length) {
    mapLogoPath = $('.map-logo').data('path')
    console.log(mapLogoPath)

    this.App.path = this.App.cable.subscriptions.create('PathChannel', {
      connected: function () {
        console.log('PathChannel: connected')

        handler = Gmaps.build('Google')

        handler.buildMap({
          internal: { id: 'zone-1' },
          provider: {
            disableDefaultUI: true,
            scrollwheel: false,
            // styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
          }
        }, function () {
          // directionsDisplay.setMap(handler.getMap())

          markers = handler.addMarkers([
            {
              'lat': 48.9188200,
              'lng': 2.3429520,
              'picture': {
                // 'url': 'http://people.mozilla.com/~faaborg/files/shiretoko/firefoxIcon/firefox-32.png',
                'url': mapLogoPath,
                'width':  120,
                'height': 26
              },
              'infowindow': 'itnovem.'
            }
          ])

          handler.bounds.extendWith(markers)
          handler.fitMapToBounds()
          handler.getMap().setZoom(14)
        })
      },
      disconnected: function () { console.log('PathChannel: disconnected') },
      received: function (data) {
        console.log('PathChannel: received')
        console.log(data)

        // Google Map

        // var directionsDisplay = new google.maps.DirectionsRenderer()
        // var directionsService = new google.maps.DirectionsService()

        // function calcRoute () {
        //   // var origin      = new google.maps.LatLng(41.850033, -87.6500523)
        //   var origin      = new google.maps.LatLng(data['path']['from']['lat'], data['path']['from']['lon'])
        //   // var destination = new google.maps.LatLng(42.850033, -85.6500523)
        //   var destination = new google.maps.LatLng(data['path']['to']['lat'], data['path']['to']['lon'])
        //   var request = {
        //     destination: destination,
        //     origin: origin,
        //     travelMode: google.maps.TravelMode.DRIVING
        //   }

        //   directionsService.route(request, function (response, status) {
        //     if (status == google.maps.DirectionsStatus.OK) {
        //       directionsDisplay.setDirections(response)
        //     }
        //   })
        // }

        // calcRoute()
      },
      speak: function (path) {
        console.log('PathChannel: speak')

        return this.perform('speak', {
          path: path
        })
      }
    })
  }
})
