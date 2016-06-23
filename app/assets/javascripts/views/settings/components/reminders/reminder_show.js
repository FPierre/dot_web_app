Vue.component('reminder-show', {
  props: ['reminder'],
  template: '<li class="collection-item" :class="{ \'pressed\': reminder.pressed }" v-touch:press="pressReminder(reminder.id)">\
    <span class="title">{{ reminder.attributes.title }}</span>\
    <p>\
      {{ reminder.attributes.content }}\
      <br>\
      {{ reminder.attributes.user }}\
      <br>\
      {{ reminder.attributes.displayedAgo }}\
    </p>\
    <div class="card-action" v-if="!reminder.attributes.displayed">\
      <a href="#">Ne pas afficher</a>\
    </div>\
  </li>',
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
