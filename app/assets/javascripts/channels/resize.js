// Client du Channel Resize
// Non utilisé dans la v1.0.1 de l'application Web
// $(document).on('ready', function () {
//   if ($('html.screens.team').length) {
//     this.App.resize = this.App.cable.subscriptions.create('ResizeChannel', {
//       connected: function() { console.log('ResizeChannel: connected') },
//       disconnected: function() { console.log('ResizeChannel: connected') },
//       received: function(data) {
//         console.log('ResizeChannel: received')
//         // console.log(data)

//         var $currentZone = $('#zone-' + data['zone'])

//         if ($currentZone.length) {
//           var $otherZone = $('#zone-' + getOtherZone(data['zone']))

//           if (data['size'] == 'full') {
//             console.log('half to full')

//             $currentZone.addClass('full').removeClass('half').removeClass('hidden')
//             $otherZone.addClass('hidden').removeClass('half').removeClass('full')

//             google.maps.event.trigger(handler.getMap(), 'resize')
//           }
//           else if (data['size'] == 'half') {
//             console.log('full to half')

//             $currentZone.addClass('half').removeClass('full').removeClass('hidden')
//             $otherZone.addClass('half').removeClass('hidden').removeClass('full')

//             google.maps.event.trigger(handler.getMap(), 'resize')
//           }
//         }
//       },
//       speak: function(resize) {
//         console.log('ResizeChannel: speak')

//         return this.perform('speak', {
//           resize: resize
//         })
//       }
//     })
//   }
// })

// function getOtherZone (currentZone) {
//   if (currentZone == 1) {
//     return 2
//   }
//   else {
//     return 1
//   }
// }
