$(document).on('ready page:load', function () {
  if ($('body.settings.index').length) {

    $('.modal-trigger').leanModal()

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
    })

    Vue.config.debug = true

    Vue.http.options.root = 'http://localhost:4000/api/v1'

    new Vue({
      el: '.settings.index',
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
        }
      },
      data: {
        currentView: 'users-index',
        tappedUser: null
      },
      methods: {
        createUser: function () {
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
          $('#modal2').openModal()
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
