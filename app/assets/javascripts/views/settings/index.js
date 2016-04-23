$(document).on('ready page:load', function() {
  if ($('body.settings.index').length) {

    // Suppression de l'ombre sur le nav si tab juste en dessous

    var $nav = $('nav'),
        $tabs = $('main .tabs');

    if ($nav.length && $tabs.length) {
      $tabs.removeClass('z-depth-1')
           .css('box-shadow', '0 2px 3px 0 rgba(0, 0, 0, 0.21), 0 0 0 0 rgba(0, 0, 0, 0)');
    }

    // Sidebar

    $('.sidebar').sideNav();

    new Vue({
      el: '#settings',
      http: {
        root: '/api/v1/settings/'
      },
      data: {
        general: {
          stopEverything: {
            value: false
          }
        },
        sarah: {
          active: {
            value: true,
            apiUrl: 'sarah-state'
          }
        },
        twitter: {
          active: {
            value: true,
            apiUrl: 'twitter-state'
          }
        },
        reminders: {
          active: {
            value: true,
            apiUrl: 'reminders-state'
          },
          displayDuration: {
            value: 10,
            apiUrl: 'display-duration-state'
          }
        },
        weather: {
          active: {
            value: true,
            apiUrl: 'weather-state'
          },
          currentDayOnly: {
            value: false,
            apiUrl: 'current-day-only'
          }
        }
      },
      ready: function () {

      },
      computed: {

      },
      watch: {
        'general.stopEverything': function(newVal, oldVal) {
          if (newVal === true) {
            this.sarah.active = false
            this.tweets.active = false
            this.reminders.active = false
            this.weather.active = false
          }
        }
      },
      methods: {
        update: function (event) {
          console.log()
          var settingUrl = ''

          this.$http.post(settingUrl, { state: event.target.value }).then(function (response) {

          }).catch(function (response) {

          })
        }
      }
    })
  }
});
