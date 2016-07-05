Vue.component('raspberry-edit', {
  props: ['raspberry'],
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Modifier un Raspberry</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="raspberry-edit-name-{{ raspberry.id }}" class="validate" type="text" v-model="raspberry.attributes.name" required>\
          <label for="raspberry-edit-name-{{ raspberry.id }}">Nom</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="raspberry-edit-api-port-{{ raspberry.id }}" class="validate" type="text" v-model="raspberry.attributes.apiPort">\
          <label for="raspberry-edit-api-port-{{ raspberry.id }}">Port de l\'API</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="raspberry-edit-ip-address-{{ raspberry.id }}" class="validate" type="text" v-model="raspberry.attributes.ipAddress" required>\
          <label for="raspberry-edit-ip-address-{{ raspberry.id }}">Adresse IP</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="raspberry-edit-mac-address-{{ raspberry.id }}" class="validate" type="text" v-model="raspberry.attributes.macAddress" required>\
          <label for="raspberry-edit-mac-address-{{ raspberry.id }}">Adresse MAC</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="update">\
        Modifier\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
      <a class="btn-flat waves-effect">Supprimer</a>\
    </li>\
  </ul>',
  ready: function () {
    // Fix trouble with the labels overlapping prefilled content
    // http://materializecss.com/forms.html
    Materialize.updateTextFields()
  },
  methods: {
    update: function () {
      this.raspberry.__v_resource.update({ id: this.raspberry.id }, this.raspberry.attributes).then(function (response) {
        console.log('update raspberry (ok): ', response)
        // To vm
        this.$dispatch('raspberry-updated', response.data)
      }, function (response) {
        console.log('update raspberry (ko): ', response)
        // To vm
        this.$dispatch('display-error', formatError(this.raspberry, response.data))
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'raspberries-index')
    }
  }
})
