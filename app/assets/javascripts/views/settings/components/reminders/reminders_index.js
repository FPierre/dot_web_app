Vue.component('reminders-index', {
  props: ['reminders'],
  template: '<div class="reminders-index">\
    <reminder-show v-for="reminder in reminders" :reminder="reminder"></reminder-show>\
  </div>'
})
