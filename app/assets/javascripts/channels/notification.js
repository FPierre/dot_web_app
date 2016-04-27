App.notification = App.cable.subscriptions.create('NotificationChannel', {
  connected: function() {
    console.log('NotificationChannel: connected')
  },
  disconnected: function() {
    console.log('NotificationChannel: disconnected')
  },
  received: function(data) {
    console.log('NotificationChannel: received')

    if ($('body.dashboard.index').length) {
      var toastContent = $('<div class="tweet"><span>' + data['author'] + '</span><p>' + data['message'] + '</p></div>');

      return Materialize.toast(toastContent, data['duration']);
    }
  },
  speak: function(notification) {
    console.log('NotificationChannel: speak')

    return this.perform('speak', {
      notification: notification
    });
  }
});
