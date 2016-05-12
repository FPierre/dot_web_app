if ($('body.dashboard.index').length) {
  App.resize = App.cable.subscriptions.create('ResizeChannel', {
    connected: function() { console.log('ResizeChannel: connected'); },
    disconnected: function() { console.log('ResizeChannel: connected'); },
    received: function(data) {
      console.log('ResizeChannel: received');

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
      console.log('ResizeChannel: speak');

      return this.perform('speak', {
        resize: resize
      });
    }
  });
}
