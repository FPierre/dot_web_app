$(document).on('ready page:load', function () {
  if ($('body.settings.show').length) {
    $('.sidebar').sideNav({ menuWidth: 300, closeOnClick: true })

    $('.modal-trigger').leanModal()

    $('.datepicker').pickadate()

    $('select').material_select()

    Vue.config.debug = true

    new Vue({
      el: '.settings.show',
      props: {
        currentUser: {
          coerce: function (currentUser) {
            return coerceProp(currentUser)
          }
        },
        voiceCommands: {
          coerce: function (voiceCommands) {
            return coerceProp(voiceCommands)
          }
        },
        voiceRecognitionServer: {
          coerce: function (voiceRecognitionServer) {
            var props = {}

            if (voiceRecognitionServer.attributes !== null) {
              for (var key in voiceRecognitionServer.attributes) {
                if (voiceRecognitionServer.attributes.hasOwnProperty(key)) {
                  var value = voiceRecognitionServer.attributes[key]

                  props[key.toCamelCase()] = value
                }
              }

              voiceRecognitionServer.attributes = props
            }

            return voiceRecognitionServer
          }
        },
        setting: {
          coerce: function (setting) {
            var props = {}

            if (setting.attributes !== null) {
              for (var key in setting.attributes) {
                if (setting.attributes.hasOwnProperty(key)) {
                  var value = setting.attributes[key]

                  props[key.toCamelCase()] = value
                }
              }

              setting.attributes = props
            }

            return setting
          }
        }
      },
      data: {
        currentView: 'users-index',
        errors: null,
        notification: window.notification,
        tappedRaspberry: null,
        tappedUser: null,
        tappedVoiceRecognitionServer: null,
      },
      computed: {
        numberReceivedReminders: {
          get: function () {
            return this.notification.numberReceivedReminders
          },
          set: function () {
            this.notification.numberReceivedReminders = 0
          }
        },
        receivedReminders: function () {
          return this.notification.receivedReminders
        },
        hideBadgeNewReminders: function () {
          return this.numberReceivedReminders == 0
        },
        isAdmin: function () {
          return this.currentUser.attributes.admin
        }
      },
      methods: {
        changeCurrentView: function (view) {
          this.currentView = view

          if (this.currentView == 'reminders-index') {
            this.numberReceivedReminders = 0
          }
        }
      },
      events: {
        'change-current-view': function (view) {
          this.currentView = view
        },
        'display-error': function (errors) {
          this.errors = errors
          $('#errors-modal').openModal()
        },
        // From user-show
        'user-tapped': function (user) {
          this.tappedUser = user
          // this.tappedObject = user
          this.changeCurrentView('user-edit')
        },
        // From raspberry-show
        'raspberry-tapped': function (raspberry) {
          this.tappedRaspberry = raspberry
          // this.tappedObject = raspberry
          this.changeCurrentView('raspberry-edit')
        },
        // From raspberry-new
        'raspberry-created': function (raspberry) {
          // To raspberries-index
          this.$broadcast('raspberry-created', raspberry)
        },
        // From voice-recognition-server-show
        'voice-recognition-server-tapped': function (voiceRecognitionServer) {
          this.tappedvoiceRecognitionServer = voiceRecognitionServer
          // this.tappedObject = voiceRecognitionServer
          this.changeCurrentView('voice-recognition-server-edit')
        }
      }
    })
  }
})
