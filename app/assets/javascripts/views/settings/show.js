$(document).on('ready page:load', function () {
  if ($('body.settings.show').length) {
    $('.sidebar').sideNav({ menuWidth: 300, closeOnClick: true })

    $('.modal-trigger').leanModal()

    $('.datepicker').pickadate()

    $('select').material_select()

    Vue.config.debug = true

    Vue.http.options.root = 'http://dot-web-app.fpierre.ovh'

    new Vue({
      el: '.settings.show',
      props: {
        users: {
          coerce: function (users) {
            return coerceProp(users)
          }
        },
        setting: {
          coerce: function (setting) {
            return coerceProp(setting)
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
        remindersLinks: {

        },
        voiceRecognitionServer: {
          coerce: function (voiceRecognitionServer) {
            return coerceProp(voiceRecognitionServer)
          }
        }
      },
      data: {
        currentView: 'users-index',
        currentModal: null,
        tappedUser: null,
        tappedRaspberry: null,
        tappedVoiceRecognitionServer: null,
        numberReceivedReminders: null
      },
      ready: function () {
        // console.log('ready')
        // console.log($('.application-data').data('numberReceivedReminders'))
        // this.numberReceivedReminders = $('.application-data').data('numberReceivedReminders')
        // this.numberReceivedReminders = numberReceivedReminders

            var _this = this;

            $(document).on('.application-data', function(e, response) {
              console.log('.application-data : ', response)
              _this.$set('numberReceivedReminders', response)
            })
      },
      computed: {
        hideCreateButton: function () {
          return this.currentView == 'setting-show' ||
                 this.currentView == 'voice-commands-index' ||
                 this.currentView == 'voice-recognition-server-show'
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
            $('.application-data').data('numberReceivedReminders', 0)
          }
        },
        changeCurrentModal: function (modal) {
          this.currentModal = modal
        },
        openModal: function () {
          this.tappedUser = null
          this.tappedRaspberry = null
          this.tappedVoiceRecognitionServer = null

          switch (this.currentView) {
            case 'users-index':
              this.currentModal = 'user-new'
              break
            case 'raspberries-index':
              this.currentModal = 'raspberry-new'
              break
            case 'reminders-index':
              this.currentModal = 'reminder-new'
              break
          }

          $('#modal1').openModal()
        },
        submitModal: function () {
          // console.log('submitModal')
          switch (this.currentModal) {
            case 'user-new':
              // To user-new
              this.$broadcast('create-user')
              break
            case 'raspberry-new':
              // To raspberry-new
              this.$broadcast('create-raspberry')
              break
            case 'reminder-new':
              // To reminder-new
              this.$broadcast('create-reminder')
              break
            case 'user-edit':
              // To user-edit
              // console.log('switch update user')
              this.$broadcast('update-user')
              break
            case 'raspberry-edit':
              // To raspberry-edit
              this.$broadcast('update-raspberry')
              break
            case 'voice-recognition-server-edit':
              // To voice-recognition-server-edit
              this.$broadcast('update-voice-recognition-server')
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
        // From reminder-new
        'reminder-created': function (reminder) {
          // To reminders-index
          this.$broadcast('reminder-created', reminder)
        },
        // From user-show
        'user-tapped': function (user) {
          // console.log('user-tapped')
          this.tappedUser = user
          this.currentModal = 'user-edit'
          $('#modal1').openModal()
        },
        // From raspberry-show
        'raspberry-tapped': function (raspberry) {
          console.log('raspberry-tapped')
          this.tappedRaspberry = raspberry
          this.currentModal = 'raspberry-edit'
          $('#modal1').openModal()
        },
        // From voice-recognition-server-show
        'voice-recognition-server-tapped': function (voiceRecognitionServer) {
          console.log('voice-recognition-server-tapped')
          this.tappedVoiceRecognitionServer = voiceRecognitionServer
          this.currentModal = 'voice-recognition-server-edit'
          $('#modal1').openModal()
        }
      }
    })
  }
})

Vue.http.interceptors.push({
  request: function (request) {
    var data = request.data

    if (data !== '') {
      var props = {}

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key]

          props[key.toSnakeCase()] = value
        }
      }

      request.data = props
    }

    var $csrfParam = $('head meta[name=csrf-param]')
    var $csrfToken = $('head meta[name=csrf-token]')

    if ($csrfParam.length && $csrfParam.attr('content') && $csrfToken.length && $csrfToken.attr('content')) {
      request['params'][$csrfParam.attr('content')] = $csrfToken.attr('content')
    }

    return request
  },
  response: function (response) {
    var data = response.data
    var props = { attributes: {} }

    if (data !== null && data.attributes !== null) {
      for (var key in data.attributes) {
        if (data.attributes.hasOwnProperty(key)) {
          var value = data.attributes[key]

          props[key.toCamelCase()] = value
        }
      }
    }

    response.data.attributes = props

    return response
  }
})
