Vue.component('raspberry-new', {
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Créer un Raspberry</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="raspberry-new-name" class="validate" type="text" v-model="raspberry.name" required>\
          <label for="raspberry-new-name">Nom</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="raspberry-new-ip-address" class="validate" type="text" v-model="raspberry.ipAddress" required>\
          <label for="raspberry-new-ip-address">Adresse IP</label>\
        </div>\
        <div class="input-field col s12 m6">\
          <input id="raspberry-new-mac-address" class="validate" type="text" v-model="raspberry.macAddress" required>\
          <label for="raspberry-new-mac-address">Adresse MAC</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="input-field col s12 m6">\
          <input id="raspberry-new-api-port" class="validate" type="text" v-model="raspberry.apiPort" required>\
          <label for="raspberry-new-api-port">Port API</label>\
        </div>\
        <div class="col s12 m6">\
          <input id="raspberry-new-master-device" type="checkbox" v-model="raspberry.masterDevice">\
          <label for="raspberry-new-master-device">Raspberry Maitre</label>\
        </div>\
      </div>\
      <button type="submit" class="btn waves-effect waves-light" @click="create">\
        Créer\
        <i class="material-icons right">send</i>\
      </button>\
      <a class="btn-flat waves-effect" @click="back">Annuler</a>\
    </li>\
  </ul>',
  data: function () {
    return {
      raspberry: {
        __v_resource: this.$resource('raspberries{/id}'),
        apiPort: null,
        ipAddress: null,
        macAddress: null,
        masterDevice: false,
        name: null
      }
    }
  },
  methods: {
    create: function () {
      var component = this

      component.raspberry.__v_resource.save(component.raspberry).then(function (response) {
        // console.log('create raspberry (ok): ', response)
        // To vm
        // component.$dispatch('raspberry-created', response.data)
        component.back()
      }, function (response) {
        // console.log('create raspberry (ko): ', response)
        // To vm
        component.$dispatch('display-error', formatError(component.raspberry, response.data))
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'raspberries-index')
    }
  }
})
