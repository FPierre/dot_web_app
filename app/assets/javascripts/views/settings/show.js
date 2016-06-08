$(document).on('ready page:load', function () {
  if ($('body.settings.show').length) {
    $('.sidebar').sideNav({ menuWidth: 300 })

    $('.modal-trigger').leanModal()

    $('.datepicker').pickadate()

    $('select').material_select()

    Vue.config.debug = true

    Vue.http.options.root = 'http://localhost:4000'

    new Vue({
      el: '.settings.show',
      props: {
        users: {
          coerce: function (users) {
            for (var index in users) {
              if (users.hasOwnProperty(index)) {
                var user = users[index]
                var props = {}

                if (user.attributes === null) {
                  continue
                }

                for (var key in user.attributes) {
                  if (user.attributes.hasOwnProperty(key)) {
                    var value = user.attributes[key]

                    props[key.toCamelCase()] = value
                  }
                }

                user.attributes = props
              }
            }

            return users
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
        reminders: {
          coerce: function (reminders) {
            for (var index in reminders) {
              if (reminders.hasOwnProperty(index)) {
                var user = reminders[index]
                var props = {}

                if (user.attributes === null) {
                  continue
                }

                for (var key in user.attributes) {
                  if (user.attributes.hasOwnProperty(key)) {
                    var value = user.attributes[key]

                    props[key.toCamelCase()] = value
                  }
                }

                user.attributes = props
              }
            }

            return reminders
          }
        },
        raspberries: {
          coerce: function (raspberries) {
            for (var index in raspberries) {
              if (raspberries.hasOwnProperty(index)) {
                var raspberry = raspberries[index]
                var props = {}

                if (raspberry.attributes === null) {
                  continue
                }

                for (var key in raspberry.attributes) {
                  if (raspberry.attributes.hasOwnProperty(key)) {
                    var value = raspberry.attributes[key]

                    props[key.toCamelCase()] = value
                  }
                }

                raspberry.attributes = props
              }
            }

            return raspberries
          }
        }
      },
      data: {
        // currentView: 'users-index',
        currentView: 'reminders-index',
        currentModal: null,
        tappedUser: null,
        tappedRaspberry: null
      },
      methods: {
        changeCurrentView: function (view) {
          this.currentView = view
        },
        changeCurrentModal: function (modal) {
          this.currentModal = modal
        },
        openModal: function () {
          switch (this.currentView) {
            case 'reminders-index':
              this.currentModal = 'reminder-new'
              break
          }

          $('#modal1').openModal()
        },
        submitModal: function () {
          // To user-new
          this.$broadcast('create-user')
        },
        updateUser: function () {
          // To user-edit
          this.$broadcast('update-user')
        }
      },
      events: {
        // From ?
        'change-current-view': function (view) {
          this.currentView = view
        },
        // From user-new
        'user-created': function (user) {
          // To users-index
          this.$broadcast('user-created', user)
        },
        // From user-show
        'user-tapped': function (user) {
          // console.log(user)
          this.tappedUser = user
          this.currentModal = 'user-edit'
          $('#modal1').openModal()
        },
        // From raspberry-show
        'raspberry-tapped': function (raspberry) {
          // console.log(raspberry)
          this.tappedUser = raspberry
          this.currentModal = 'raspberry-edit'
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

    return request
  },
  response: function (response) {
    // console.log(response)

    var data = response.data.data
    var props = {}

    if (data !== null && data.attributes !== null) {
      for (var key in data.attributes) {
        if (data.attributes.hasOwnProperty(key)) {
          var value = data.attributes[key]

          props[key.toCamelCase()] = value
        }
      }
    }

    return props
  }
})

String.prototype.toSnakeCase = function () {
  return this.replace(/([A-Z])/g, function ($1) {
    return '_' + $1.toLowerCase()
  })
}

String.prototype.toCamelCase = function () {
  return this.replace(/(-[a-z])/g, function ($1) {
    return $1[1].toUpperCase()
  })
}

String.prototype.toBoolean = function () {
  return (this == 'true' || this == 'on') ? true : false
}