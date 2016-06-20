$(document).on('ready', function () {
  if ($('html.screens.team').length) {
    this.App.notification = this.App.cable.subscriptions.create('WeatherChannel', {
      connected: function () { console.log('WeatherChannel: connected') },
      disconnected: function () { console.log('WeatherChannel: disconnected') },
      received: function (data) {
        console.log('WeatherChannel: received')
        console.log(data)

        if (data.weather !== undefined) {
          var weather = data.weather.data

          $('.weather').html(
            '<span><i class="wi ' + weather_icons_codes(weather.icon) + ' wi-2x"></i></span>\
            <span>' + weather.temp.current + '°c</span>\
            <span>Min : ' + weather.temp.min + '°c Max : ' + weather.temp.max + '°c</span>'
          )
        }
      },
      // speak: function (data) {
      //   console.log('WeatherChannel: speak')

      //   return this.perform('speak', {
      //     data: data
      //   })
      // }
    })
  }
})

function weather_icons_codes(code) {
  return {
    '01d': 'day-sunny',
    '02d': 'day-cloudy',
    '03d': 'cloud',
    '04d': 'cloudy',
    '09d': 'showers',
    '10d': 'day-rain',
    '11d': 'storm-showers',
    '13d': 'snow',
    '50d': 'fog',
    '01n': 'night-clear',
    '02n': 'night-alt-cloudy',
    '03n': 'cloud',
    '04n': 'cloudy',
    '09n': 'showers',
    '10n': 'night-rain',
    '11n': 'storm-showers',
    '13n': 'snow',
    '50n': 'fog'
  }
}
