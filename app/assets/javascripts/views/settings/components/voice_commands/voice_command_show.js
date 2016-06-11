Vue.component('voice-command-show', {
  props: ['voiceCommand'],
  template: '<li class="collection-item">\
    <span class="title">{{ voiceCommand.name }}</span>\
    <p>{{ voiceCommand.description }}</p>\
  </li>'
})
