Vue.component('reminder-show', {
  props: ['reminder'],
  template: '<div class="card waves-effect" :class="{ \'pressed\': reminder.pressed }" v-touch:press="pressReminder(reminder.id)">\
    <div class="card-content">\
      <span class="card-title">{{ reminder.attributes.title }}</span>\
      <p>{{ reminder.attributes.content }}</p>\
      <p>{{ reminder.attributes.user }}</p>\
      <p>{{ reminder.attributes.displayedAgo }}</p>\
    </div>\
    <div class="card-action" v-if="!reminder.attributes.displayed">\
      <a href="#">Ne pas afficher</a>\
    </div>\
  </div>',
  ready: function () {
    this.reminder.__v_resource = this.$resource('reminders/{id}')
  },
  methods: {
    pressReminder: function (reminderId) {
      if (this.$get('reminder.pressed') === true) {
        // To reminders-index
        this.$dispatch('reminder-unpressed', reminderId)
        this.$set('reminder.pressed', false)
      } else {
        // To reminders-index
        this.$dispatch('reminder-pressed', reminderId)
        this.$set('reminder.pressed', true)
      }
    }
  }
})
