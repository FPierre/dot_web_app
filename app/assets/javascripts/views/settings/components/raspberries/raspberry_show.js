Vue.component('raspberry-show', {
  props: ['raspberry'],
  template: '<li class="collection-item" :class="{ \'pressed\': raspberry.pressed }" v-touch:tap="tapRaspberry(raspberry)" v-touch:press="pressRaspberry(raspberry.id)">\
    <span class="title">{{ raspberry.attributes.name }}</span>\
    <p>\
      Adresse IP : {{ raspberry.attributes.ipAddress }}\
      <br>\
      Nom de domaine : {{ raspberry.attributes.domainName }}\
      <br>\
      Adresse MAC : {{ raspberry.attributes.macAddress }}\
      <br>\
      Port API : {{ raspberry.attributes.apiPort }}\
      <br>\
      Raspberry Maitre : {{ raspberry.attributes.masterDevice }}\
      <br>\
    </p>\
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
