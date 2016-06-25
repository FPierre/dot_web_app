$(document).on('ready', function () {
  window.notification = {
    numberReceivedReminders: 0,
    receivedReminders: []
  }

  this.App.notification = this.App.cable.subscriptions.create('NotificationChannel', {
    connected: function () { console.log('NotificationChannel: connected') },
    disconnected: function () { console.log('NotificationChannel: disconnected') },
    received: function (data) {
      console.log('NotificationChannel: received')
      console.log(data)

      if (data['notification'] !== undefined) {
        var notification = data.notification

        if ($('html.screens.team').length) {
          var toastContent = $('<div class="notification priority-' + notification.priority + '">' +
                                 '<div class="user">' + notification.user + ' dit :</div>' +
                                 '<p class="content">' + notification.content + '</p>' +
                                 '<p class="created-at">' + notification.created_at + '</p>' +
                               '</div>')

          // console.log(toastContent)
          return Materialize.toast(toastContent, notification.duration, 'rounded')
        }
        else if ($('body.settings.show').length) {
          window.notification.numberReceivedReminders++
          window.receivedReminders.push(notification)
        }
      }
    },
    // speak: function (data) {
    //   console.log('NotificationChannel: speak')

    //   return this.perform('speak', {
    //     data: data
    //   })
    // }
  })
})
