$(document).on('ready', function () {
  if ($('html.screens.team').length) {
    this.App.notification = this.App.cable.subscriptions.create('RoomModeChannel', {
      connected: function () { console.log('RoomModeChannel: connected') },
      disconnected: function () { console.log('RoomModeChannel: disconnected') },
      received: function (data) {
        console.log('RoomModeChannel: received')
        console.log(data)

        if (data.room_occupied == true) {
          $('.room_occupied').addClass('occupied').removeClass('not-occupied')
          $('.room_occupied span').text('Salle occupée')
        }
        else {
          $('.room_occupied').addClass('not-occupied').removeClass('occupied')
          $('.room_occupied span').text('Salle libre')
        }
      }
    })
  }
})
