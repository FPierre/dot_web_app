Vue.component('user-new', {
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Créer un utilisateur</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="user-new-firstname" class="validate" type="text" v-model="user.firstname" required>\
          <label for="user-new-firstname">Prénom*</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="user-new-lastname" class="validate" type="text" v-model="user.lastname" required>\
          <label for="user-new-lastname">Nom*</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="user-new-email" class="validate" type="email" v-model="user.email" required>\
          <label for="user-new-email">Email*</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="user-new-password" class="validate" type="password" v-model="user.password" required>\
          <label for="user-new-password">Mot de passe*</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="col s6">\
          <input id="approved-new-user" type="checkbox" v-model="user.approved">\
          <label for="approved-new-user">Approuvé</label>\
        </div>\
        <div class="col s6">\
          <input id="admin-new-user" type="checkbox" v-model="user.admin">\
          <label for="admin-new-user">Administrateur</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="create">\
        Créer\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
    </li>\
  </ul>',
  data: function () {
    return {
      user: {
        __v_resource: this.$resource('users{/id}'),
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        approved: false,
        admin: false
      }
    }
  },
  methods: {
    create: function () {
      var component = this

      component.user.__v_resource.save(component.user).then(function (response) {
        // console.log('create user (ok): ', response)
        // To vm
        // component.$dispatch('user-created', response.data)
        component.back()
      }, function (response) {
        // console.log('create user (ko): ', response)
        // To vm
        component.$dispatch('display-error', formatError(component.user, response.data))
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'users-index')
    }
  }
})
