Vue.component('raspberry-edit', {
  props: ['raspberry'],
  mixins: [crudMixin],
  template: '<div class="raspberry-edit">\
    <div class="row">\
      <div class="input-field col s12 m4">\
        <input id="raspberry-edit-name-{{ raspberry.id }}" placeholder="Nom" class="validate" type="text" v-model="raspberry.attributes.name">\
        <label for="raspberry-edit-name-{{ raspberry.id }}">Nom</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="raspberry-edit-ip-address-{{ raspberry.id }}" placeholder="Adresse IP" class="validate" type="text" v-model="raspberry.attributes.ipAddress">\
        <label for="raspberry-edit-ip-address-{{ raspberry.id }}">Adresse IP</label>\
      </div>\
      <div class="input-field col s12 m4">\
        <input id="raspberry-edit-mac-address-{{ raspberry.id }}" placeholder="Adresse MAC" class="validate" type="text" v-model="raspberry.attributes.macAddress">\
        <label for="raspberry-edit-mac-address-{{ raspberry.id }}">Adresse MAC</label>\
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
      // var expression = event.target.__v_model.expression
      // var fieldName = this.getFieldModel(expression)

      // if (event.target.type == 'checkbox') {
      //   var value = event.target.checked
      // }
      // else {
      //   var value = event.target.value
      // }

      // var params = {}
      // params[fieldName] = value

      this.raspberry.__v_resource.update({ id: this.raspberry.id }, this.raspberry).then(function (response) {
        console.log(response.data)
        // To index
        this.$dispatch('raspberry-updated', response.data)
      }, function (response) {

      })
    }
  },
  events: {
    'update-raspberry': function () {
      this.update()
    }
  }
})
