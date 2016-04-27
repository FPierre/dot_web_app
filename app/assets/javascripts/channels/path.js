App.path = App.cable.subscriptions.create('PathChannel', {
  connected: function() {
    console.log('PathChannel: connected')
  },
  disconnected: function() {
    console.log('PathChannel: disconnected')
  },
  received: function(data) {
    console.log('PathChannel: received')

    console.log(data);
  },
  speak: function(path) {
    console.log('PathChannel: speak')

    return this.perform('speak', {
      path: path
    });
  }
});
