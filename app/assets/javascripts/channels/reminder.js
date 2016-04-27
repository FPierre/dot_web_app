App.reminder = App.cable.subscriptions.create('ReminderChannel', {
  connected: function() {
    console.log('ReminderChannel: connected');
  },
  disconnected: function() {
    console.log('ReminderChannel: disconnected');
  },
  received: function(data) {
    console.log('ReminderChannel: received');

    console.log(data);

    if ($('body.dashboard.index').length && data['reminder'] !== undefined) {
      var reminder = data['reminder']
      var toastContent = $('<div class="reminder"><h1>' + reminder['title'] + '</h1><p>' + reminder['content'] + '</p></div>');

      return Materialize.toast(toastContent, data['duration']);
    }
  },
  speak: function(data) {
    console.log('ReminderChannel: speak');

    console.log(data);

    return this.perform('speak', {
      data: data
    });
  }
});










// App.reminder = App.cable.subscriptions.create('ReminderChannel', {
//   connected: function() {},
//   disconnected: function() {},
//   received: function(data) {
//     //  Default 1 hour
//     var duration = data.reminder.duration != undefined ? data.reminder.duration : 600000
//     var reminder = '<div class="reminder">' +
//                      '<h1>' + data.reminder.title + '</h1>' +
//                      '<p>' + data.reminder.content + '</p>' +
//                      '<p>' + data.reminder.created_at + '</p>' +
//                    '</div>';

//     Materialize.toast(reminder, duration);
//   },
//   speak: function(reminder) {
//     return this.perform('speak', {
//       reminder: reminder
//     });
//   }
// });
