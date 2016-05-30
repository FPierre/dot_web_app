Vue.component('setting-show', {
  props: ['setting'],
  mixins: [crudMixin],
  template: '<div>\
        <ul class="collection with-header">\
          <li class="collection-header">\
            <h4>SARAH</h4>\
          </li>\
          <li class="collection-item">\
            <div>\
              Activer\
              <div class="secondary-content">\
                <div class="switch">\
                  <label>\
                    <input type="checkbox" v-model="setting.attributes.sarahEnabled" @change="update">\
                    <span class="lever">\
                  </label>\
                </div>\
              </div>\
            </div>\
          </li>\
        </ul>\
        <ul class="collection with-header">\
          <li class="collection-header">\
            <h4>Twitter</h4>\
          </li>\
          <li class="collection-item">\
            <div>\
              Activer\
              <div class="secondary-content">\
                <div class="switch">\
                  <label>\
                    <input type="checkbox" v-model="setting.attributes.twitterEnabled" @change="update">\
                    <span class="lever">\
                  </label>\
                </div>\
              </div>\
            </div>\
          </li>\
        </ul>\
        <ul class="collection with-header">\
          <li class="collection-header">\
            <h4>Mémos</h4>\
          </li>\
          <li class="collection-item">\
            <div>\
              Activer\
              <div class="secondary-content">\
                <div class="switch">\
                  <label>\
                    <input type="checkbox" v-model="setting.attributes.remindersEnabled" @change="update">\
                    <span class="lever">\
                  </label>\
                </div>\
              </div>\
            </div>\
          </li>\
        </ul>\
        <ul class="collection with-header">\
          <li class="collection-header">\
            <h4>Météo</h4>\
          </li>\
          <li class="collection-item">\
            <div>\
              Activer\
              <div class="secondary-content">\
                <div class="switch">\
                  <label>\
                    <input type="checkbox" v-model="setting.attributes.weatherEnabled" @change="update">\
                    <span class="lever">\
                  </label>\
                </div>\
              </div>\
            </div>\
          </li>\
          <li class="collection-item">\
            <div>\
              Jour courant uniquement\
              <div class="secondary-content">\
                <div class="switch">\
                  <label>\
                    <input type="checkbox" v-model="setting.attributes.weatherCurrentDayOnly" @change="update">\
                    <span class="lever">\
                  </label>\
                </div>\
              </div>\
            </div>\
          </li>\
        </ul>\
  </div>',
  ready: function () {
   this.setting.__v_resource = this.$resource('settings/{id}')
  },
  methods: {
    update: function (event) {
      var expression = event.target.__v_model.expression
      var fieldName = this.getFieldModel(expression)

      if (event.target.type == 'checkbox') {
        var value = event.target.checked
      }
      else {
        var value = event.target.value
      }

      var params = {}
      params[fieldName] = value

      this.setting.__v_resource.update({ id: 1 }, params).then(function (response) {

      }, function (response) {

      })
    }
  }
})
