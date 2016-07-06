Vue.component('reminders-index', {
  props: ['reminders', 'remindersLinks', 'receivedReminders'],
  template: '<div class="reminders-index">\
    <ul class="collection with-header">\
      <li class="collection-header" v-if="pressedRemindersIds.length > 0">\
        <div class="row" style="margin-bottom: 0;">\
          <div class="col s4">\
            <h4>{{ pressedRemindersIds.length }}</h4>\
          </div>\
          <div class="col s8">\
            <div class="hide-on-med-and-down">\
              <button class="btn-flat waves-effect right" @click="delete">Supprimer</button>\
            </div>\
            <div class="hide-on-med-and-up">\
              <button class="btn-flat waves-effect right" @click="delete">\
                <i class="material-icons">delete</i>\
              </button>\
            </div>\
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
  </div>',
  data: function () {
    return {
      pressedRemindersIds: []
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
