Vue.component('voice-recognition-server-edit', {
  props: ['voiceRecognitionServer'],
  mixins: [crudMixin],
  template: '<div class="voice-recognition-server-edit">\
    <div class="row">\
      <div class="input-field col s12 m6">\
        <input id="voice-recognition-server-edit-ip-address-{{ voiceRecognitionServer.id }}" class="validate" type="text" v-model="voiceRecognitionServer.attributes.ipAddress">\
        <label for="voice-recognition-server-edit-ip-address-{{ voiceRecognitionServer.id }}">Adresse IP</label>\
      </div>\
      <div class="input-field col s12 m6">\
        <input id="voice-recognition-server-edit-mac-address-{{ voiceRecognitionServer.id }}" class="validate" type="text" v-model="voiceRecognitionServer.attributes.macAddress">\
        <label for="voice-recognition-server-edit-mac-address-{{ voiceRecognitionServer.id }}">Adresse MAC</label>\
      </div>\
    </div>\
  </div>',
  ready: function () {
    // Fix trouble with the labels overlapping prefilled content
    // http://materializecss.com/forms.html
    Materialize.updateTextFields()
  },
  methods: {
    update: function (event) {
      this.voiceRecognitionServer.__v_resource.update({ id: 1 }, this.voiceRecognitionServer.attributes).then(function (response) {
        // console.log(response.data)
        // To voice-recognition-server-index
        // A utiliser ? this.$dispatch('voiceRecognitionServer-updated', response.data)
        Materialize.toast('Serveur SARAH modifié', 4000)
      }, function (response) {
        Materialize.toast('Serveur SARAH non modifié', 4000)
      })
    }
  },
  events: {
    'update-voice-recognition-server': function () {
      // console.log('update-voice-recognition-server')
      this.update()
    }
  }
})
