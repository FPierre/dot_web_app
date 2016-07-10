Vue.component('current-user-show', {
  props: ['currentUser', 'apiUrl', 'apiPort'],
  template: '<div class="current-user" @click="changeCurrentView">\
    <div class="row" v-if="currentUser.attributes.avatar">\
      <div class="col s6 offset-s3">\
        <img class="circle responsive-img" :src="avatarUrl">\
      </div>\
    </div>\
    <div class="row">\
      <div class="col s12">\
        <span>{{ fullName }}</span>\
      </div>\
    </div>\
  </div>',
  computed: {
    avatarUrl: function () {
      if (this.current_user.attributes.avatar) {
        return 'http://' + this.apiUrl + ':' + this.apiPort + '/images/' + this.current_user.attributes.avatar
      }
    },
    fullName: function () {
      return this.currentUser.attributes.firstname + ' ' + this.currentUser.attributes.lastname
    }
  },
  methods: {
    changeCurrentView: function () {
      this.$dispatch('change-current-view', 'current-user-edit')
    }
  }
})
