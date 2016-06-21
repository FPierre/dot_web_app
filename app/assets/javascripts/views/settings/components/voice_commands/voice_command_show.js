Vue.component('voice-command-show', {
  props: ['voiceCommand'],
  template: '<li class="collection-item">\
    <span class="title">{{ voiceCommand.name }}</span>\
    <p v-for="desc in voiceCommand.description">{{ desc }}</p>\
  </li>'
})
