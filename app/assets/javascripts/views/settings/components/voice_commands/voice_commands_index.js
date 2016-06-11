Vue.component('voice-commands-index', {
  props: ['voiceCommands'],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <div class="row" style="margin-bottom: 0;">\
        <h4>Commandes vocales</h4>\
      </div>\
    </li>\
    <voice-command-show v-for="voiceCommand in voiceCommands" :voice-command="voiceCommand"></voice-command-show>\
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
  }
})
