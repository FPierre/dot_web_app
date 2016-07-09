$(document).on('ready', function () {
  if ($('html.screens.guest').length || $('html.screens.normal').length) {
    this.App.notification = this.App.cable.subscriptions.create('ScreenModeChannel', {
      connected: function () { console.log('ScreenModeChannel: connected') },
      disconnected: function () { console.log('ScreenModeChannel: disconnected') },
      received: function (data) {
        console.log('ScreenModeChannel: received')
        console.log(data)

        if (data.mode !== undefined) {
          window.location.href = 'http://' + window.location.hostname + ':' + location.port + '/screens/' + data.mode
        }
      }
    })
  }
})
