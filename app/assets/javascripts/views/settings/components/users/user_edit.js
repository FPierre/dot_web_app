Vue.component('user-edit', {
  props: ['user'],
  mixins: [crudMixin],
  template: '<div class="user-edit">\
    <div class="row">\
      <div class="input-field col s12 m6">\
        <input id="user-edit-firstname-{{ user.id }}" class="validate" type="text" v-model="user.attributes.firstname">\
        <label for="user-edit-firstname-{{ user.id }}">Prénom</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="user-edit-lastname-{{ user.id }}" class="validate" type="text" v-model="user.attributes.lastname">\
        <label for="user-edit-lastname-{{ user.id }}">Nom</label>\
      </div>\
    </div>\
    <div class="row">\
      <div class="input-field col s12 m6">\
        <input id="user-edit-email-{{ user.id }}" class="validate" type="email" v-model="user.attributes.email">\
        <label for="user-edit-email-{{ user.id }}">Email</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="user-edit-password-{{ user.id }}" class="validate" type="password" v-model="user.attributes.password">\
        <label for="user-edit-password-{{ user.id }}">Mot de passe</label>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col s6">\
        <input id="approved-edit-user-{{ user.id }}" type="checkbox" v-model="user.attributes.approved">\
        <label for="approved-edit-user-{{ user.id }}">Approuvé</label>\
      </div>\
      <div class="col s6">\
        <input id="admin-edit-user-{{ user.id }}" type="checkbox" v-model="user.attributes.admin">\
        <label for="admin-edit-user-{{ user.id }}">Administrateur</label>\
      </div>\
    </div>\
  </div>',
  ready: function () {
    // Fix trouble with the labels overlapping prefilled content
    // http://materializecss.com/forms.html
    Materialize.updateTextFields()
  },
  methods: {
    update: function (event) {
      this.user.__v_resource.update({ id: this.user.id }, this.user.attributes).then(function (response) {
        // console.log(response.data)
        // To users-index
        // A utiliser ? this.$dispatch('user-updated', response.data)
        Materialize.toast('Utilisateur modifié', 4000)
      }, function (response) {
        Materialize.toast('Utilisateur non modifié', 4000)
      })
    }
  },
  events: {
    'update-user': function () {
      // console.log('update-user')
      this.update()
    }
  }
})
