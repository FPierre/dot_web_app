Vue.component('raspberry-show', {
  props: ['raspberry'],
  template: '<li class="collection-item" :class="{ \'pressed\': raspberry.pressed }" v-touch:tap="tapRaspberry(raspberry)" v-touch:press="pressRaspberry(raspberry.id)">\
    <div class="row">\
      <div class="col s9 m6">\
        <div class="row">\
          <div class="col s12">\
            {{ raspberry.attributes.name }}\
          </div>\
          <div class="col s12">\
            IP : {{ raspberry.attributes.ipAddress }}, MAC : {{ raspberry.attributes.macAddress }}\
          </div>\
          <div class="col s12">\
            Port API : {{ raspberry.attributes.apiPort }}, Master device : {{ raspberry.attributes.masterDevice }}\
          </div>\
        </div>\
      </div>\
      <div class="col s3 m6">\
        <span class="secondary-content">{{ raspberry.attributes.createdAt | fr-datetime }}</span>\
      </div>\
    </div>\
  </li>',
  ready: function () {
    this.raspberry.__v_resource = this.$resource('raspberries/{id}')
  },
  methods: {
    tapRaspberry: function (raspberry) {
      console.log('tapRaspberry')
      // To vm
      this.$dispatch('raspberry-tapped', raspberry)
    },
    pressRaspberry: function (raspberryId) {
      if (this.$get('raspberry.pressed') === true) {
        // To raspberries-index
        this.$dispatch('raspberry-unpressed', raspberryId)
        this.$set('raspberry.pressed', false)
      } else {
        // To raspberries-index
        this.$dispatch('raspberry-pressed', raspberryId)
        this.$set('raspberry.pressed', true)
      }
    }
  }
})
