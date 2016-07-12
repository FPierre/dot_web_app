// Client du Channel Notification
$(document).on('ready', function () {
  if ($('html.screens.team').length || $('body.settings.show').length) {
    // Objet à passer à Vue.js
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

        if (data.action !== undefined) {
          if ($('html.screens.team').length) {
            // Erase all displayed Reminders
            if (data.action == 'eraseAll') {
              $('#zone-2').empty()
              $('#toast-container').remove()
            }
          }
        }
        else if (data.notification !== undefined) {
          var notification = data.notification.data.attributes

          if ($('html.screens.team').length) {
            // Formattage de la date de création du Reminder
            var notificationDate = new Date(notification['created-at']).toLocaleString()

            // Si c'est un Reminder de priorité 1
            if (notification.priority == 1) {
              var toastContent = $('<div class="notification priority-' + notification.priority + '">' +
                                     '<div class="user">' + notification.user + ' dit :</div>' +
                                     '<p class="content">' + notification.content + '</p>' +
                                     '<p class="created-at">' + notificationDate + '</p>' +
                                   '</div>')

              // Affichage en Toast
              return Materialize.toast(toastContent, notification.duration * 60 * 1000)
            }
            // Si c'est un Reminder de priorité 2 ou 3
            else {
              // Crée la liste si elle n'existe pas encore
              if ($('#zone-2 .collection').length == 0) {
                $('#zone-2').html('<ul class="collection"></ul>')
              }

              // Limite du nombre de Reminders affichés à l'écran
              var numberReminders = $('#zone-2 .collection .collection-item').length
              var numberRemindersLimit = 5

              // Si le nombre limite de Reminders affichés à l'écran es atteint
              if (numberReminders > numberRemindersLimit) {
                // Supprime le premier affiché
                $('#zone-2 .collection .collection-item:last-child').remove()
              }

              // Affiche le Reminder
              $('#zone-2 .collection').prepend(
                '<li class="collection-item">' +
                  '<span class="title">' + notification.user + ' dit :</span>' +
                  '<p>' + notification.content + '<br>' + notificationDate + '</p>' +
                  '<a href="#!" class="secondary-content">' + notification.priority + '</a>' +
                '</li>'
              )
            }
          }
          // Si on est sur l'application Web
          else if ($('body.settings.show').length) {
            // Met à jour le nombre de Reminders crées
            window.notification.numberReceivedReminders++
            // window.receivedReminders.push(notification)
          }
        }
      }
    })
  }
})
