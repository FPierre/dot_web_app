Vue.component('users-index', {
  props: ['users', 'currentUser'],
  template: '<ul class="collection with-header">\
    <li class="collection-header" v-if="pressedUsersIds.length > 0">\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s4">\
          <h4>{{ pressedUsersIds.length }}</h4>\
        </div>\
        <div class="col s8">\
          <div class="hide-on-med-and-down">\
            <button class="btn-flat waves-effect right" @click="delete">Supprimer</button>\
            <!--<button class="btn-flat waves-effect right">Approuver</button>-->\
          </div>\
          <div class="hide-on-med-and-up">\
            <button class="btn-flat waves-effect right" @click="delete">\
              <i class="material-icons">delete</i>\
            </button>\
            <button class="btn-flat waves-effect right">\
              <i class="material-icons">done</i>\
            </button>\
          </div>\
        </div>\
      </div>\
    </li>\
    <li class="collection-header" v-else>\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s12">\
          <h4>Utilisateurs</h4>\
        </div>\
      </div>\
    </li>\
    <user-show v-for="user in users" :user="user"></user-show>\
  </ul>',
  data: function () {
    return {
      pressedUsersIds: [],
      userToEdit: null
    }
  },
  created: function () {
    var component = this

    component.$http.get('/users').then(function (response) {
      // Return all users but currentUser
      component.users = coerceProp(response.data).filter(function (user) {
        return user.id != component.currentUser.id
      })
    })
  },
  methods: {
    delete: function () {
      if (this.pressedUsersIds.length > 0) {
        for (var i = 0; i < this.pressedUsersIds.length; i++) {
          this.$http({ url: 'users/' + this.pressedUsersIds[i], method: 'DELETE' }).then(function (response) {
            this.users = this.users.filter(function (currentUser) {
              return currentUser.id != response.data.id
            })

            this.pressedUsersIds = this.pressedUsersIds.filter(function (currentUserId) {
              return currentUserId != response.data.id
            })
          }, function (response) {
            console.log('catch')
            console.log(response)
          })
        }
      }
    }
  },
  events: {
    // From user-show
    'user-pressed': function (userId) {
      this.pressedUsersIds.push(userId)
    },
    // From user-show
    'user-unpressed': function (userId) {
      this.pressedUsersIds = this.pressedUsersIds.filter(function (currentUserId) {
        return currentUserId != userId
      })
    },
    'display-user-edit': function (user) {
      this.userToEdit = user
    },
    // // From from user-new trough vm
    // 'user-created': function (user) {
    //   this.users.push(user)
    // }
  }
})
