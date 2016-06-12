$(document).on('ready', function () {
  if ($('html.screens').length) {
    this.App.notification = this.App.cable.subscriptions.create('ScreenModeChannel', {
      connected: function () { console.log('ScreenModeChannel: connected') },
      disconnected: function () { console.log('ScreenModeChannel: disconnected') },
      received: function (data) {
        console.log('ScreenModeChannel: received')
        console.log(data)

        window.location.href = 'http://localhost:3001/screens/' + data['mode']
      },
      speak: function (data) {
        console.log('ScreenModeChannel: speak')

        return this.perform('speak', {
          data: data
        })
      }
    })
  }
})
