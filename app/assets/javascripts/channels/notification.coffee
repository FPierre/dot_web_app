App.notification = App.cable.subscriptions.create "NotificationChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log(data['minutes']);
    Materialize.toast('User sera en retard de ' + data['minutes'] + ' minutes environ', 10000);

  speak: (notification) ->
    @perform 'speak', notification: notification
