Vue.component('user-new', {
  mixins: [crudMixin],
  template: '<div class="user-new">\
    <div class="row">\
      <div class="input-field col s12 m4">\
        <input id="user-new-firstname" placeholder="Prénom" class="validate" type="text" v-model="user.firstname">\
        <label for="user-new-firstname">Prénom</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="user-new-lastname" placeholder="Nom" class="validate" type="text" v-model="user.lastname">\
        <label for="user-new-lastname">Nom</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="user-new-email" placeholder="Email" class="validate" type="email" v-model="user.email">\
        <label for="user-new-email">Email</label>\
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
        approved: false,
        admin: false
      }
    }
  },
  methods: {
    create: function (event) {
      this.user.__v_resource.save(this.user).then(function (response) {
        console.log(response.data)
        // To index
        this.$dispatch('user-created', response.data)
      }, function (response) {

      })
    }
  },
  events: {
    'create-user': function () {
      this.create()
    }
  }
})
