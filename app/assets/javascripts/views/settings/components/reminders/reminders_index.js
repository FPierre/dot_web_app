Vue.component('reminders-index', {
  props: ['reminders', 'remindersLinks'],
  template: '<div class="reminders-index">\
    <div class="card" v-if="pressedRemindersIds.length > 0">\
      <div class="card-content">\
        <span class="card-title">{{ pressedRemindersIdsTitle }}</span>\
      </div>\
      <div class="card-action">\
        <button class="btn-flat waves-effect" @click="delete">Supprimer</button>\
      </div>\
    </div>\
    <reminder-show v-for="reminder in reminders" :reminder="reminder"></reminder-show>\
    <div class="row">\
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
