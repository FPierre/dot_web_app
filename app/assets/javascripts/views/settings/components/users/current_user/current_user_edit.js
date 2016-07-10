Vue.component('current-user-edit', {
  props: ['currentUser'],
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Modifier mes informations</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="current-user-edit-firstname-{{ currentUser.id }}" class="validate" type="text" v-model="currentUser.attributes.firstname" required>\
          <label for="current-user-edit-firstname-{{ currentUser.id }}">Prénom*</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="current-user-edit-lastname-{{ currentUser.id }}" class="validate" type="text" v-model="currentUser.attributes.lastname" required>\
          <label for="current-user-edit-lastname-{{ currentUser.id }}">Nom*</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="current-user-edit-email-{{ currentUser.id }}" class="validate" type="email" v-model="currentUser.attributes.email" required>\
          <label for="current-user-edit-email-{{ currentUser.id }}">Email*</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="col s6">\
          <input id="approved-edit-user-{{ currentUser.id }}" type="checkbox" v-model="currentUser.attributes.approved">\
          <label for="approved-edit-user-{{ currentUser.id }}">Approuvé</label>\
        </div>\
        <div class="col s6">\
          <input id="admin-edit-user-{{ currentUser.id }}" type="checkbox" v-model="currentUser.attributes.admin">\
          <label for="admin-edit-user-{{ currentUser.id }}">Administrateur</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="update">\
        Modifier\
        <i class="material-icons right">send</i>\
      </button>\
    </li>\
  </ul>',
  // created: function () {
  //   this.$http.get('/users/myself').then(function (response) {
  //     this.currentUser = coerceProp(response.data)
  //   })
  // },
  ready: function () {
    // Fix trouble with the labels overlapping prefilled content
    // http://materializecss.com/forms.html
    Materialize.updateTextFields()

    this.currentUser.__v_resource = this.$resource('users/{id}')
  },
  methods: {
    update: function (event) {
      var component = this

      component.currentUser.__v_resource.update({ id: component.currentUser.id }, component.currentUser.attributes).then(function (response) {
        console.log('update currentUser (ok): ', response)
        // this.currentUser = response.data
      }, function (response) {
        console.log('update currentUser (ko): ', response)
        // To vm
        component.$dispatch('display-error', formatError(component.currentUser, response.data))
      })
    }
  }
})
