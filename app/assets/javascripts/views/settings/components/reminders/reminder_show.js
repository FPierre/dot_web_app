Vue.component('reminder-show', {
  props: ['reminder'],
  template: '<div class="card">\
    <div class="card-content">\
      <span class="card-title">{{ reminder.attributes.title }}</span>\
      <p>{{ reminder.attributes.content }}</p>\
      <p>{{ reminder.attributes.user }}</p>\
      <p>{{ reminder.attributes.displayedAgo }}</p>\
    </div>\
    <div class="card-action" v-if="!reminder.attributes.displayed">\
      <a href="#">Ne pas afficher</a>\
    </div>\
  </div>'
})
