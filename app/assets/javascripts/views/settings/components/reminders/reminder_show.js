Vue.component('reminder-show', {
  props: ['reminder'],
  template: '<li class="collection-item">\
    <span class="title">{{ reminder.attributes.title }}</span>\
    <p>\
      {{ reminder.attributes.content }}\
      <br>\
      {{ reminder.attributes.user }}\
      <br>\
      {{ reminder.attributes.displayedAgo }}\
    </p>\
    <!--<div class="card-action" v-if="!reminder.attributes.displayed">\
      <a href="#">Ne pas afficher</a>\
    </div>-->\
  </li>',
  ready: function () {
    this.reminder.__v_resource = this.$resource('reminders/{id}')
  }
})
