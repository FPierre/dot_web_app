App.notification = App.cable.subscriptions.create('NotificationChannel', {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    if ($('body.dashboard.index').length) {
      var toastContent = $('<div class="tweet"><span>' + data['author'] + '</span><p>' + data['message'] + '</p></div>');

      return Materialize.toast(toastContent, data['duration']);
    }
  },
  speak: function(notification) {
    return this.perform('speak', {
      notification: notification
    });
  }
});
