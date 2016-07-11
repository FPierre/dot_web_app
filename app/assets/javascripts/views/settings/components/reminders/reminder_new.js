Vue.component('reminder-new', {
  mixins: [crudMixin],
  template: '\
      <div><h4>Créer un mémo</h4>\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="reminder-new-title" class="validate" type="text" v-model="reminder.title">\
          <label for="reminder-new-title">Titre</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="reminder-new-display-at" type="datetime-local" v-model="reminder.displayedAt">\
          <label for="reminder-new-display-at" class="active">Date d\'affichage</label>\
        </div>\
        <div class="col s12 m6">\
          <label>Priorité*</label>\
          <p>\
            <input name="group1" type="radio" id="test1" value="1" v-model="reminder.priority">\
            <label for="test1">1</label>\
          </p>\
          <p>\
            <input name="group1" type="radio" id="test2" value="2" v-model="reminder.priority">\
            <label for="test2">2</label>\
          </p>\
          <p>\
            <input name="group1" type="radio" id="test3" value="3" v-model="reminder.priority">\
            <label for="test3">3</label>\
          </p>\
        </div>\
      </div>\
      <div class="row">\
        <div class="input-field col s12">\
          <textarea id="reminder-new-content" class="materialize-textarea" v-model="reminder.content" required></textarea>\
          <label for="reminder-new-content">Contenu*</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="create">\
        Créer\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
      </div>',
  data: function () {
    return {
      reminder: {
        __v_resource: this.$resource('reminders{/id}'),
        content: null,
        displayedAt: null,
        duration: 1,
        priority: 3,
        title: null
      }
    }
  },
  ready: function () {
    $('select').material_select()
    $('.datepicker').pickadate({ 'min': new Date() })

    // var $input = $('.datepicker').pickadate()
    // var picker = $input.pickadate('picker')
  },
  methods: {
    create: function () {
      var component = this

      component.reminder.__v_resource.save(component.reminder).then(function (response) {
        // console.log('create reminder (ok): ', response)
        // To vm
        // component.$dispatch('reminder-created', response.data)
        component.back()
      }, function (response) {
        // console.log('create reminder (ko): ', response)
        // To vm
        component.$dispatch('display-error', formatError(component.reminder, response.data))
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'reminders-index')
    }
  }
})

