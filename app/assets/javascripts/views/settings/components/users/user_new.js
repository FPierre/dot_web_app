Vue.component('user-new', {
  mixins: [crudMixin],
  template: '<div class="user-new">\
    <div class="row">\
      <div class="input-field col s12 m6">\
        <input id="user-new-firstname" class="validate" type="text" v-model="user.firstname">\
        <label for="user-new-firstname">Prénom</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="user-new-lastname" class="validate" type="text" v-model="user.lastname">\
        <label for="user-new-lastname">Nom</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="user-new-email" class="validate" type="email" v-model="user.email">\
        <label for="user-new-email">Email</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="user-new-password" class="validate" type="password" v-model="user.password">\
        <label for="user-new-password">Mot de passe</label>\
      </div>\
    </div>\
  </div>',
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
      this.user.__v_resource.save(this.user).then(function (response) {
        console.log(response)
        // To vm
        this.$dispatch('user-created', response.data)

        Materialize.toast('Utilisateur crée', 4000)
      }, function (response) {
        Materialize.toast('Utilisateur non crée', 4000)
        console.log('catch')
        console.log(response)
      })
    }
  },
  events: {
    'create-user': function () {
      this.create()
    }
  }
})
