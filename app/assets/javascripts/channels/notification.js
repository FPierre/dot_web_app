$(document).on('ready', function () {
  this.App.notification = this.App.cable.subscriptions.create('NotificationChannel', {
    connected: function () { console.log('NotificationChannel: connected');  numberReceivedReminders = 0 },
    disconnected: function () { console.log('NotificationChannel: disconnected') },
    received: function (data) {
      console.log('NotificationChannel: received')
      console.log(data)

      if ($('html.screens.team').length) {
        if (data['notification'] !== undefined) {
          var notification = data.notification
          var toastContent = $('<div class="notification priority-' + notification.priority + '">' +
                                 '<div class="user">' + notification.user + ' dit :</div>' +
                                 '<p class="content">' + notification.content + '</p>' +
                                 '<p class="created-at">' + notification.created_at + '</p>' +
                               '</div>')

          console.log(toastContent)
          return Materialize.toast(toastContent, notification.duration, 'rounded')
        }
      }
      numberReceivedReminders++

      // else if ($('body.settings.show').length) {
        // var numberReceivedReminders = $('.application-data').data('numberReceivedReminders')

        // console.log('notif:')
        // console.log(numberReceivedReminders)

        // $('.application-data').data('numberReceivedReminders', numberReceivedReminders++)
        // console.log('notif:')
        // console.log($('.application-data').data('numberReceivedReminders'))
      // }
    },
    speak: function (data) {
      console.log('NotificationChannel: speak')

      return this.perform('speak', {
        data: data
      })
    }
  })
})
