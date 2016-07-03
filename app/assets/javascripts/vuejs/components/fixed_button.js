Vue.component('fixed-button', {
  props: ['tappedObject', 'currentView'],
  template: '<div class="absolute-action-btn" v-if="!hideButton">\
    <a href="#" class="btn-floating btn-large waves-effect waves-light" @click.prevent="openView">\
      <i class="material-icons">add</i>\
    </a>\
  </div>',
  methods: {
    openView: function () {
      var viewToDispatch = this.currentView

      this.tappedObject = null

      switch (this.currentView) {
        case 'users-index':
        case 'user-edit':
          viewToDispatch = 'user-new'
          break
        case 'raspberries-index':
        case 'raspberry-edit':
          viewToDispatch = 'raspberry-new'
          break
        case 'reminders-index':
          viewToDispatch = 'reminder-new'
          break
      }

      this.$dispatch('change-current-view', viewToDispatch)
    }
  },
  computed: {
    hideButton: function () {
      views = [
        'about-show',
        'raspberry-new',
        'reminder-new',
        'setting-show',
        'user-new',
        'voice-commands-index',
        'voice-recognition-server-show',
        'voice-recognition-server-new'
      ]

      return views.some(function(view) {
        if (this.currentView == view) {
          return true
        }

        return false
      }, this)
    }
  }
})
