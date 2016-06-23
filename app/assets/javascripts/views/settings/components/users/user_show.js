Vue.component('user-show', {
  props: ['user'],
  template: '<li class="collection-item avatar" :class="{ \'pressed\': user.pressed }" v-touch:tap="tapUser(user)" v-touch:press="pressUser(user.id)">\
    <img src="http://placehold.it/50x50" alt="" class="circle">\
    <span class="title">{{ fullName }}</span>\
    <p>{{ displayApproved }} {{ displayAdmin }}</p>\
    <span class="secondary-content">{{ user.attributes.createdAt | fr-datetime }}</span>\
  </li>',
  ready: function () {
    this.user.__v_resource = this.$resource('users/{id}')
  },
  computed: {
    fullName: function () {
      return this.user.attributes.firstname + ' ' + this.user.attributes.lastname
    },
    displayAdmin: function () {
      return (this.user.attributes.admin) ? 'et Administrateur' : ''
    },
    displayApproved: function () {
      return (this.user.attributes.approved) ? 'Approuvé' : 'Non approuvé'
    }
  },
  methods: {
    tapUser: function (user) {
      console.log('tapUser')
      // To vm
      this.$dispatch('user-tapped', user)
    },
    pressUser: function (userId) {
      if (this.$get('user.pressed') === true) {
        // To users-index
        this.$dispatch('user-unpressed', userId)
        this.$set('user.pressed', false)
      }
      else {
        // To users-index
        this.$dispatch('user-pressed', userId)
        this.$set('user.pressed', true)
      }
    }
  }
})
