App.notification = App.cable.subscriptions.create "NotificationChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # console.log(data['minutes']);
    # Materialize.toast(data['minutes'] + ' minutes environ', 10000);

    toastContent = $('<div class="tweet">' +
      '<span>' + data['author'] + '</span>' +
      '<p>' + data['message'] + '</p>' +
     '</div>');

     Materialize.toast(toastContent, data['duration']);

  speak: (notification) ->
    @perform 'speak', notification: notification



# App.notification = App.cable.subscriptions.create('NotificationChannel', {
#   connected: function() {},
#   disconnected: function() {},
#   received: function(data) {
#     console.log(data);

#     var $toastContent = $('<div class="tweet">' +
#       '<span>' + data['author'] + '</span>' +
#       '<p>' + data['message'] + '</p>' +
#     '</div>');
#     Materialize.toast($toastContent, data['duration']);

#     // return Materialize.toast('User sera en retard de ' + data['minutes'] + ' minutes environ', 10000);
#   },
#   speak: function(notification) {
#     return this.perform('speak', {
#       notification: notification
#     });
#   }
# });
