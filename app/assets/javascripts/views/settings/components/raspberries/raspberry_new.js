Vue.component('raspberry-new', {
  mixins: [crudMixin],
  template: '<div class="raspberry-new">\
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
  </div>',
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
        console.log(response.data)
        // To vm
        this.$dispatch('raspberry-created', response.data)

        // Materialize.toast('Raspberry crée', 4000)
      }, function (response) {
        // Materialize.toast('Raspberry crée', 4000)
      })
    }
  },
  events: {
    'create-raspberry': function () {
      this.create()
    }
  }
})
