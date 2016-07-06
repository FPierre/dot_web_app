Vue.component('raspberries-index', {
  props: ['raspberries'],
  template: '<ul class="collection with-header">\
    <li class="collection-header" v-if="pressedRaspberriesIds.length > 0">\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s4">\
          <h4>{{ pressedRaspberriesIds.length }}</h4>\
        </div>\
        <div class="col s8">\
          <div class="hide-on-med-and-down">\
            <button class="btn-flat waves-effect right" @click="delete">Supprimer</button>\
          </div>\
          <div class="hide-on-med-and-up">\
            <button class="btn-flat waves-effect right" @click="delete">\
              <i class="material-icons">delete</i>\
            </button>\
          </div>\
        </div>\
      </div>\
    </li>\
    <li class="collection-header" v-else>\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s12">\
          <h4>Raspberry</h4>\
        </div>\
      </div>\
    </li>\
    <raspberry-show v-for="raspberry in raspberries" :raspberry="raspberry"></raspberry-show>\
  </ul>',
  data: function () {
    return {
      pressedRaspberriesIds: []
    }
  },
  ready: function () {
    this.$http({ url: 'raspberries', method: 'GET' }).then(function (response) {
      this.raspberries = coerceProp(response.data)
    })
  },
  methods: {
    delete: function () {
      if (this.pressedRaspberriesIds.length > 0) {
        for (var i = 0; i < this.pressedRaspberriesIds.length; i++) {
          this.$http({ url: 'raspberries/' + this.pressedRaspberriesIds[i], method: 'DELETE' }).then(function (response) {
            // console.log(response)
            // console.log(response.data.id)

            this.raspberries = this.raspberries.filter(function (currentRaspberry) {
              return currentRaspberry.id != response.data.id
            })

            this.pressedRaspberriesIds = this.pressedRaspberriesIds.filter(function (currentRaspberryId) {
              return currentRaspberryId != response.data.id
            })
          }, function (response) {
            console.log('catch')
            console.log(response)
          })
        }
      }
    }
  },
  events: {
    // From raspberry-show
    'raspberry-pressed': function (raspberryId) {
      this.pressedRaspberriesIds.push(raspberryId)
    },
    // From raspberry-show
    'raspberry-unpressed': function (raspberryId) {
      this.pressedRaspberriesIds = this.pressedRaspberriesIds.filter(function (currentRaspberryId) {
        return currentRaspberryId != raspberryId
      })
    },
    // From from raspberry-new trough vm
    'raspberry-created': function (raspberry) {
      this.raspberries.push(raspberry)
    }
  }
})
