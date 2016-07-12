// Client du Channel Path
$(document).on('ready', function () {
  if ($('html.screens.team').length) {
    // Logo de l'entreprise à afficher sur la map
    mapLogoPath = $('.map-logo').data('path')

    this.App.path = this.App.cable.subscriptions.create('PathChannel', {
      connected: function () {
        console.log('PathChannel: connected')

        // Construction de la Google Map

        handler = Gmaps.build('Google')

        handler.buildMap({
          internal: { id: 'zone-1' },
          provider: {
            disableDefaultUI: true,
            scrollwheel: false,
          }
        }, function () {
          markers = handler.addMarkers([
            {
              'lat': 48.9188200, // Lat des locaux de l'entreprise
              'lng': 2.3429520,  // Lon des locaux de l'entreprise
              'picture': {
                'url': mapLogoPath, // Logo de l'entreprise
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

        // Construction du chemin sur la Google Map

        var directionsDisplay = new google.maps.DirectionsRenderer()
        var directionsService = new google.maps.DirectionsService()

        function calcRoute() {
          // Lat/lon du param From
          var origin      = new google.maps.LatLng(data['path']['from']['lat'], data['path']['from']['lon'])
          // Lat/lon du param To
          var destination = new google.maps.LatLng(data['path']['to']['lat'], data['path']['to']['lon'])
          var request = {
            destination: destination,
            origin: origin,
            travelMode: google.maps.TravelMode.DRIVING
          }

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response)
            }
          })
        }

        calcRoute()

        handler = Gmaps.build('Google')

        handler.buildMap({
          internal: { id: 'zone-1' },
          provider: {
            disableDefaultUI: true,
            scrollwheel: false,
          }
        }, function() {
          directionsDisplay.setMap(handler.getMap())

          markers = handler.addMarkers([
            {
              'lat': 0,
              'lng': 0,
              'picture': {
                'url': mapLogoPath,
                'width':  32,
                'height': 32
              },
              'infowindow': 'hello!'
            }
          ])

          handler.bounds.extendWith(markers)
          handler.fitMapToBounds()
        })
      }
    })
  }
})
