Vue.component('raspberry-new', {
  mixins: [crudMixin],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <h4>Créer un Raspberry</h4>\
    </li>\
    <li class="collection-item">\
      <div class="row">\
        <div class="input-field col s12 m4">\
          <input id="raspberry-new-name" class="validate" type="text" v-model="raspberry.name">\
          <label for="raspberry-new-name">Nom</label>\
        </div>\
        <div class="input-field col s12 m4">\
          <input id="raspberry-new-ip-address" class="validate" type="text" v-model="raspberry.ipAddress">\
          <label for="raspberry-new-ip-address">Adresse IP</label>\
        </div>\
        <div class="input-field col s12 m4">\
          <input id="raspberry-new-mac-address" class="validate" type="text" v-model="raspberry.macAddress">\
          <label for="raspberry-new-mac-address">Adresse MAC</label>\
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
        name: null,
        ipAddress: null,
        macAddress: null
      }
    }
  },
  methods: {
    create: function () {
      this.raspberry.__v_resource.save(this.raspberry).then(function (response) {
        console.log('create raspberry (ok): ', response)
        // To vm
        this.$dispatch('raspberry-created', response.data)

        // Materialize.toast('Raspberry crée', 4000)
      }, function (response) {
        console.log('create raspberry (ko): ', response)
        // Materialize.toast('Raspberry crée', 4000)
      })
    },
    back: function () {
      this.$dispatch('change-current-view', 'raspberries-index')
    }
  },
  // events: {
  //   'create-raspberry': function () {
  //     this.create()
  //   }
  // }
})
