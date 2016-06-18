Vue.component('reminder-new', {
  mixins: [crudMixin],
  template: '<div class="reminder-new">\
    <div class="row">\
      <div class="input-field col s12 m4">\
        <input id="reminder-new-title" class="validate" type="text" v-model="reminder.title">\
        <label for="reminder-new-title">Titre</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="reminder-new-display-at" type="date" class="datepicker" v-model="reminder.displayedAt">\
        <label for="reminder-new-display-at" class="active">Date d\'affichage</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <select>\
          <option value="" disabled selected>Choose your option</option>\
          <option value="1">1</option>\
          <option value="2">2</option>\
          <option value="3">3</option>\
        </select>\
        <label>Priorité</label>\
      </div>\
    </div>\
    <div class="row">\
      <div class="input-field col s12">\
        <textarea id="reminder-new-content" class="materialize-textarea" v-model="reminder.content"></textarea>\
        <label for="reminder-new-content">Contenu</label>\
      </div>\
    </div>\
  </div>',
  data: function () {
    return {
      reminder: {
        __v_resource: this.$resource('reminders{/id}'),
        content: "Content", // null,
        displayedAt: null,
        duration: 1,
        priority: 3,
        title: null
      }
    }
  },
  methods: {
    create: function () {
      this.reminder.__v_resource.save(this.reminder).then(function (response) {
        console.log(response.data)
        // To vm
        this.$dispatch('reminder-created', response.data)
      }, function (response) {

      })
    }
  },
  events: {
    'create-reminder': function () {
      this.create()
    }
  }
})

