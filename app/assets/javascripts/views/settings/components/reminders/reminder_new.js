Vue.component('reminder-new', {
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Créer un mémo</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="reminder-new-title" class="validate" type="text" v-model="reminder.title">\
          <label for="reminder-new-title">Titre</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="reminder-new-display-at" type="date" class="datepicker" v-model="reminder.displayedAt">\
          <label for="reminder-new-display-at" class="active">Date d\'affichage</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <select>\
            <option value="1">1</option>\
            <option value="2">2</option>\
            <option value="3" selected>3</option>\
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
      <button type="submit" class="btn waves-effect waves-light" @click="create">\
        Créer\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
    </li>\
  </ul>',
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
  // computed: {
  //   'reminder.displayedAt': {
  //     get: function () {
  //       var $input = $('.datepicker').pickadate()
  //       var picker = $input.pickadate('picker')

  //       return picker.get('select').obj
  //     },
  //     set: function () {

  //     }
  //   }
  // },
  ready: function () {
    $('select').material_select()
    $('.datepicker').pickadate({ 'min': new Date() })

    // var $input = $('.datepicker').pickadate()
    // var picker = $input.pickadate('picker')
  },
  methods: {
    create: function () {
      this.reminder.__v_resource.save(this.reminder).then(function (response) {
        console.log('create reminder (ok): ', response)
        // To vm
        this.$dispatch('reminder-created', response.data)

        // Materialize.toast('Mémo crée', 4000)
      }, function (response) {
        console.log('create reminder (ko): ', response)
        // Materialize.toast('Mémo non crée', 4000)
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'reminders-index')
    }
  },
  // events: {
  //   'create-reminder': function () {
  //     this.create()
  //   }
  // }
})

