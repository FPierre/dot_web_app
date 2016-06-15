Vue.component('reminders-index', {
  props: ['reminders', 'remindersLinks'],
  template: '<div class="reminders-index">\
    <ul class="collection with-header">\
      <li class="collection-header" v-if="pressedRemindersIds.length > 0">\
        <div class="row" style="margin-bottom: 0;">\
          <div class="col s5">\
            <h4>{{ pressedRemindersIdsTitle }}</h4>\
          </div>\
          <div class="col s7">\
            <button class="btn-flat waves-effect right" @click="delete">Supprimer</button>\
          </div>\
        </div>\
      </li>\
      <li class="collection-header" v-else>\
        <div class="row" style="margin-bottom: 0;">\
          <div class="col s12">\
            <h4>Mémos</h4>\
          </div>\
        </div>\
      </li>\
      <reminder-show v-for="reminder in reminders" :reminder="reminder"></reminder-show>\
    </ul>\
    <div class="row" v-if="remindersLinks.self">\
      <div class="col s12">\
        <pagination object="reminders" :links="remindersLinks"></pagination>\
      </div>\
    </div>\
  </div>',
  data: function () {
    return {
      pressedRemindersIds: []
    }
  },
  computed: {
    pressedRemindersIdsTitle: function () {
      var plural = (this.pressedRemindersIds.length > 1) ? 's' : ''

      return this.pressedRemindersIds.length + ' mémo' + plural + ' sélectionné' + plural
    }
  },
  methods: {
    delete: function () {
      if (this.pressedRemindersIds.length > 0) {
        for (var i = 0; i < this.pressedRemindersIds.length; i++) {
          this.$http({ url: 'reminders/' + this.pressedRemindersIds[i], method: 'DELETE' }).then(function (response) {
            // console.log(response)
            // console.log(response.data.id)

            this.reminders = this.reminders.filter(function (currentReminder) {
              return currentReminder.id != response.data.id
            })

            this.pressedRemindersIds = this.pressedRemindersIds.filter(function (currentReminderId) {
              return currentReminderId != response.data.id
            })
          }, function (response) {
            console.log('catch')
            console.log(response)
          })
        }
      }
    }
  },
  events: {
    // From reminder-show
    'reminder-pressed': function (reminderId) {
      this.pressedRemindersIds.push(reminderId)
    },
    // From reminder-show
    'reminder-unpressed': function (reminderId) {
      this.pressedRemindersIds = this.pressedRemindersIds.filter(function (currentReminderId) {
        return currentReminderId != reminderId
      })
    },
    // From from reminder-new trough vm
    'reminder-created': function (reminder) {
      this.reminders.push(reminder)
    }
  }
})
