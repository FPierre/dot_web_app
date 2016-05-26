document.addEventListener('turbolinks:load', function() {
  Vue.component('reminder-new', {
    mixins: [crudMixin],
    template: '<div class="reminder-new">\
      <div class="row">\
        <div class="input-field col s12 m4">\
          <input id="reminder-new-title" placeholder="Prénom" class="validate" type="text" v-model="reminder.title">\
          <label for="reminder-new-title">Prénom</label>\
        </div>\
        <div class="input-field col s12 m4">\
          <input id="reminder-new-lastname" placeholder="Nom" class="validate" type="text" v-model="reminder.lastname">\
          <label for="reminder-new-lastname">Nom</label>\
        </div>\
        <div class="input-field col s12 m4">\
          <input id="reminder-new-email" placeholder="Email" class="validate" type="email" v-model="reminder.email">\
          <label for="user-new-email">Email</label>\
        </div>\
      </div>\
    </div>',
    data: function () {
      return {
        user: {
          __v_resource: this.$resource('reminders{/id}'),
          content: null,
          display_at: null,
          duration: 1,
          priority: 3,
          title: null
        }
      }
    },
    methods: {
      create: function (event) {
        this.reminder.__v_resource.save(this.reminder).then(function (response) {
          console.log(response.data)
          // To index
          this.$dispatch('reminder-created', response.data)
        }, function (response) {

        })
      }
    }
  })
})
