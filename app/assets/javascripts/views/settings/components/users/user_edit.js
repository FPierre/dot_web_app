Vue.component('user-edit', {
  props: ['user'],
  mixins: [crudMixin],
  template: '<div class="user-edit">\
    <div class="row">\
      <div class="input-field col s12 m4">\
        <input id="user-edit-firstname-{{ user.id }}" placeholder="Prénom" class="validate" type="text" v-model="user.attributes.firstname">\
        <label for="user-edit-firstname-{{ user.id }}">Prénom</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="user-edit-lastname-{{ user.id }}" placeholder="Nom" class="validate" type="text" v-model="user.attributes.lastname">\
        <label for="user-edit-lastname-{{ user.id }}">Nom</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="user-edit-email-{{ user.id }}" placeholder="Email" class="validate" type="email" v-model="user.attributes.email">\
        <label for="user-edit-email-{{ user.id }}">Email</label>\
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
      this.user.__v_resource.update({ id: this.user.id }, this.user).then(function (response) {
        console.log(response.data)
        // To index
        this.$dispatch('user-updated', response.data)
      }, function (response) {

      })
    }
  },
  events: {
    'update-user': function () {
      this.update()
    }
  }
})