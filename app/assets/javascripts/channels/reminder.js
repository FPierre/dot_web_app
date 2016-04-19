App.reminder = App.cable.subscriptions.create('ReminderChannel', {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    //  Default 1 hour
    var duration = data.reminder.duration != undefined ? data.reminder.duration : 600000
    var reminder = '<div class="reminder">' +
                     '<h1>' + data.reminder.title + '</h1>' +
                     '<p>' + data.reminder.content + '</p>' +
                     '<p>' + data.reminder.created_at + '</p>' +
                   '</div>';

    Materialize.toast(reminder, duration);
  },
  speak: function(reminder) {
    return this.perform('speak', {
      reminder: reminder
    });
  }
});
