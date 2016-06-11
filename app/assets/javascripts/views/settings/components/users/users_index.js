Vue.component('users-index', {
  props: ['users'],
  template: '<ul class="collection with-header">\
    <li class="collection-header" v-if="pressedUsersIds.length > 0">\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s5">\
          <h4>{{ pressedUsersIdsTitle }}</h4>\
        </div>\
        <div class="col s7">\
          <button class="btn-flat waves-effect right" @click="delete">Supprimer</button>\
          <button class="btn-flat waves-effect right">Approuver</button>\
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
  computed: {
    pressedUsersIdsTitle: function () {
      var plural = (this.pressedUsersIds.length > 1) ? 's' : ''

      return this.pressedUsersIds.length + ' utilisateur' + plural + ' sélectionné' + plural
    }
  },
  methods: {
    delete: function () {
      if (this.pressedUsersIds.length > 0) {
        for (var i = 0; i < this.pressedUsersIds.length; i++) {
          this.$http({ url: 'users/' + this.pressedUsersIds[i], method: 'DELETE' }).then(function (response) {
            // console.log(response)
            // console.log(response.data.id)

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
    // From from user-new trough vm
    'user-created': function (user) {
      this.users.push(user)
    }
  }
})
