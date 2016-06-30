Vue.component('voice-command-show', {
  props: ['voiceCommand'],
  template: '<li class="collection-item" @click="textToSpeech(voiceCommand.description[0])">\
    <span class="title">{{ voiceCommand.name }}</span>\
    <p v-for="desc in voiceCommand.description">{{ desc }}</p>\
  </li>',
  methods: {
    textToSpeech: function (text) {
      this.$http.post('tests/voice', { text: text }).then(function (response) {

      }, function (response) {

      })
    }
  }
})
