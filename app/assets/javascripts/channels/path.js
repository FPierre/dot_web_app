App.path = App.cable.subscriptions.create('PathChannel', {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    console.log(data);
  },
  speak: function(path) {
    return this.perform('speak', {
      path: path
    });
  }
});
