$(document).on('ready page:load', function () {
  if ($('body.settings.index').length) {

    // Suppression de l'ombre sur le nav si tab juste en dessous

    // var $nav = $('nav');
    // var $tabs = $('main .tabs');

    // if ($nav.length && $tabs.length) {
    //   $tabs.removeClass('z-depth-1')
    //        .css('box-shadow', '0 2px 3px 0 rgba(0, 0, 0, 0.21), 0 0 0 0 rgba(0, 0, 0, 0)');
    // }

    // Sidebar

    $('.sidebar').sideNav({
      menuWidth: 300
    });

    new Vue({
      el: '#settings',
      http: {
        root: '/api/v1/settings/'
      },
      data: {
        sarah: {
          active: {
            value: true,
            // apiUrl: 'sarah-state'
          }
        },
        twitter: {
          active: {
            value: true,
            // apiUrl: 'twitter-state'
          }
        },
        reminders: {
          active: {
            value: true,
            // apiUrl: 'reminders-state'
          }
        },
        weather: {
          active: {
            value: true,
            // apiUrl: 'weather-state'
          },
          currentDayOnly: {
            value: true,
            // apiUrl: 'current-day-only'
          }
        }
      },
      ready: function () {

      },
      computed: {

      },
      methods: {
        update: function (event) {
          console.log()
          var settingUrl = ''

          this.$http.patch(settingUrl, { state: event.target.value }).then(function (response) {

          }).catch(function (response) {

          })
        }
      }
    })
  }
});
