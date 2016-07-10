Vue.component('voice-command-show', {
  props: ['voiceCommand'],
  template: '<li class="collection-item">\
    <div>\
      {{ voiceCommand.name }}\
      <a href="#" class="secondary-content" @click="textToSpeech(voiceCommand.description[0])">\
        <i class="material-icons">record_voice_over</i>\
      </a>\
      <p v-for="desc in voiceCommand.description">{{ desc }}</p>\
    </div>\
  </li>',
  methods: {
    textToSpeech: function (text) {
      this.$http.post('tests/voice', { text: text }).then(function (response) {

      }, function (response) {

      })
    }
  }
})
