Vue.component('voice-recognition-server-edit', {
  props: ['voiceRecognitionServer'],
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Modifier le serveur de reconnaissance vocale</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="voice-recognition-server-edit-ip-address-{{ voiceRecognitionServer.id }}" class="validate" type="text" v-model="voiceRecognitionServer.attributes.ipAddress" required>\
          <label for="voice-recognition-server-edit-ip-address-{{ voiceRecognitionServer.id }}">Adresse IP</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="voice-recognition-server-edit-mac-address-{{ voiceRecognitionServer.id }}" class="validate" type="text" v-model="voiceRecognitionServer.attributes.macAddress" required>\
          <label for="voice-recognition-server-edit-mac-address-{{ voiceRecognitionServer.id }}">Adresse MAC</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="update">\
        Modifier\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
    </li>\
  </ul>',
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
        // A utiliser ? this.$dispatch('voice-recognition-server-updated', response.data)
        // Materialize.toast('Serveur SARAH modifié', 4000)
      }, function (response) {
        // Materialize.toast('Serveur SARAH non modifié', 4000)
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'voice-recognition-server-show')
    }
  },
  // events: {
  //   'update-voice-recognition-server': function () {
  //     // console.log('update-voice-recognition-server')
  //     this.update()
  //   }
  // }
})
