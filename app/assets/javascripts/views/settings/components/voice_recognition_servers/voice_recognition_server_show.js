Vue.component('voice-recognition-server-show', {
  props: ['voiceRecognitionServer'],
  template: '<ul class="collection with-header">\
    <li class="collection-header" v-else>\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s12">\
          <h4>Serveur SARAH</h4>\
        </div>\
      </div>\
    </li>\
    <li class="collection-item waves-effect" v-touch:tap="tapVoiceRecognitionServer(voiceRecognitionServer)">\
      <p>\
        Adresse IP : {{ voiceRecognitionServer.attributes.ipAddress }}\
        <br>\
        Adresse MAC : {{ voiceRecognitionServer.attributes.macAddress }}\
        <br>\
        Port API : {{ voiceRecognitionServer.attributes.apiPort }}\
      </p>\
    </li>\
  </ul>',
  ready: function () {
    this.voiceRecognitionServer.__v_resource = this.$resource('voice_recognition_servers/{id}')
  },
  methods: {
    tapVoiceRecognitionServer: function (voiceRecognitionServer) {
      console.log('tapVoiceRecognitionServer')
      // To vm
      this.$dispatch('voice-recognition-server-tapped', voiceRecognitionServer)
    }
  }
})
