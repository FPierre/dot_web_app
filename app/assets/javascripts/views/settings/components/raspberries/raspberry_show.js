Vue.component('raspberry-show', {
  props: ['raspberry'],
  template: '<li class="collection-item waves-effect" :class="{ \'pressed\': raspberry.pressed }" v-touch:tap="tapRaspberry(raspberry)" v-touch:press="pressRaspberry(raspberry.id)">\
    <span class="title">{{ raspberry.attributes.name }}</span>\
    <p>\
      {{ raspberry.attributes.createdAt }}\
      <br>\
      Adresse IP : {{ raspberry.attributes.ipAddress }}\
      <br>\
      Adresse MAC : {{ raspberry.attributes.macAddress }}\
    </p>\
  </li>',
  data: function () {
    return {
      displayRaspberryEdit: false
    }
  },
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
