Vue.component('raspberries-index', {
  props: ['raspberries'],
  template: '<ul class="collection with-header">\
    <li class="collection-header" v-if="pressedRaspberriesIds.length > 0">\
      <div class="row" style="margin-bottom: 0;">\
        <div class="col s5">\
          <h4>{{ pressedRaspberriesIdsTitle }}</h4>\
        </div>\
        <div class="col s7">\
          <button class="btn-flat waves-effect right">Supprimer</button>\
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
      pressedRaspberriesIds: [],
      raspberryToEdit: null
    }
  },
  computed: {
    pressedRaspberriesIdsTitle: function () {
      var plural = (this.pressedRaspberriesIds.length > 1) ? 's' : ''

      return this.pressedRaspberriesIds.length + ' raspberry sélectionnée' + plural
    }
  },
  events: {
    // From raspberry-show
    'raspberry-pressed': function (raspberryId) {
      this.pressedRaspberriesIds.push(raspberryId)
    },
    // From raspberry-show
    'raspberry-unpressed': function (raspberryId) {
      this.pressedRaspberriesIds = this.pressedRaspberriesIds.filter(function (currentUserId) {
        return currentUserId != raspberryId
      })
    },
    'display-raspberry-edit': function (raspberry) {
      this.raspberryToEdit = raspberry
    },
    // From from raspberry-new trough vm
    'raspberry-created': function (raspberry) {
      this.raspberries.push(raspberry)
    }
  }
})
