// App.resize = App.cable.subscriptions.create "ResizeChannel",
//   connected: ->
//     # Called when the subscription is ready for use on the server

//   disconnected: ->
//     # Called when the subscription has been terminated by the server

//   received: (data) ->
//     console.log(data);

//     $zone = $('#zone-' + data['zone']);

//     if ($zone.length) {
//       $zone.addClass(data['size']);
//     }

//   speak: (resize) ->
//     @perform 'speak', resize: resize


App.resize = App.cable.subscriptions.create('ResizeChannel', {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    console.log(data);

    var $zone = $('#zone-' + data['zone']);

    if ($zone.length) {
      var $otherZone = $('#zone-2');

      // console.log('zone trouvée');

      if (data['size'] == 'full') {
        // console.log('half to full');

        $zone.parent('.col_c').addClass('full');
        $zone.parent('.col_c').removeClass('half');

        $otherZone.parent('.col_c').addClass('hidden');
        $otherZone.parent('.col_c').removeClass('half');
        // $otherZone.parent('.col').hide();

        google.maps.event.trigger(handler.getMap(), 'resize');
      }
      else if (data['size'] == 'half') {
        // console.log('full to half');

        $zone.parent('.col_c').addClass('half');
        $zone.parent('.col_c').removeClass('full');

        $otherZone.parent('.col_c').addClass('half');
        $otherZone.parent('.col_c').removeClass('hidden');
        // $otherZone.parent('.col').show();

        google.maps.event.trigger(handler.getMap(), 'resize');
      }
    }
  },
  speak: function(resize) {
    return this.perform('speak', {
      resize: resize
    });
  }
});
