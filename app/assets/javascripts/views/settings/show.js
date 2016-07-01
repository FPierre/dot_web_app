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
        users: {
          coerce: function (users) {
            return coerceProp(users)
          }
        },
        reminders: {
          coerce: function (reminders) {
            return coerceProp(reminders)
          }
        },
        raspberries: {
          coerce: function (raspberries) {
            return coerceProp(raspberries)
          }
        },
        voiceCommands: {
          coerce: function (voiceCommands) {
            return coerceProp(voiceCommands)
          }
        },
        voiceRecognitionServer: {
          coerce: function (voiceRecognitionServer) {
            return coerceProp(voiceRecognitionServer)
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
        },
        remindersLinks: {

        }
      },
      data: {
        currentView: 'users-index',
        errors: null,
        notification: window.notification,
        tappedRaspberry: null,
        tappedUser: null,
        tappedVoiceRecognitionServer: null
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
        hideCreateButton: function () {
          return this.currentView == 'setting-show' ||
                 this.currentView == 'voice-recognition-server-show' ||
                 this.currentView == 'voice-commands-index' ||
                 this.currentView == 'user-new' ||
                 this.currentView == 'raspberry-new' ||
                 this.currentView == 'reminder-new' ||
                 this.currentView == 'voice-recognition-server-new' ||
                 this.currentView == 'about-show'
        },
        hideBadgeNewReminders: function () {
          return this.numberReceivedReminders == 0
        }
      },
      methods: {
        changeCurrentView: function (view) {
          this.currentView = view

          if (this.currentView == 'reminders-index') {
            this.numberReceivedReminders = 0
          }
        },
        openNewView: function () {
          this.tappedUser = null
          this.tappedRaspberry = null
          this.tappedVoiceRecognitionServer = null

          switch (this.currentView) {
            case 'users-index':
            case 'user-edit':
              this.changeCurrentView('user-new')
              break
            case 'raspberries-index':
            case 'raspberry-edit':
              this.changeCurrentView('raspberry-new')
              break
            case 'reminders-index':
              this.changeCurrentView('reminder-new')
              break
          }
        }
      },
      events: {
        'change-current-view': function (view) {
          this.currentView = view
        },
        // From user-new
        'user-created': function (user) {
          // To users-index
          this.$broadcast('user-created', user)
        },
        // From raspberry-new
        'raspberry-created': function (raspberry) {
          // To raspberries-index
          this.$broadcast('raspberry-created', raspberry)
        },
        'raspberry-not-created': function (errors) {
          this.errors = errors
          $('#errors-modal').openModal()
        },
        // From reminder-new
        'reminder-created': function (reminder) {
          // To reminders-index
          this.$broadcast('reminder-created', reminder)
        },
        'reminder-not-created': function (errors) {
          this.errors = errors
          $('#errors-modal').openModal()
        },
        // From user-show
        'user-tapped': function (user) {
          // console.log('user-tapped')
          this.tappedUser = user
          this.changeCurrentView('user-edit')
        },
        // From raspberry-show
        'raspberry-tapped': function (raspberry) {
          // console.log('raspberry-tapped')
          this.tappedRaspberry = raspberry
          this.changeCurrentView('raspberry-edit')
        },
        // From voice-recognition-server-show
        'voice-recognition-server-tapped': function (voiceRecognitionServer) {
          // console.log('voice-recognition-server-tapped')
          this.tappedVoiceRecognitionServer = voiceRecognitionServer
          this.changeCurrentView('voice-recognition-server-edit')
        },
        'raspberry-updated': function (raspberry) {
          console.log('raspberry-updated')
          this.changeCurrentView('raspberry-index')
        }
      }
    })
  }
})
