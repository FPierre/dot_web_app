Vue.component('user-show', {
  props: ['user'],
  template: '<li class="collection-item avatar waves-effect" :class="{ \'pressed\': user.pressed }" v-touch:tap="tapUser(user)" v-touch:press="pressUser(user.id)">\
    <div v-show="!displayUserEdit">\
      <img src="http://placehold.it/50x50" alt="" class="circle">\
      <span class="title">{{ fullName }} {{ displayAdmin }}</span>\
      <p>\
        {{ user.attributes.createdAt }}\
        <br>\
        {{ displayApproved }}\
      </p>\
    </div>\
    <div class="blue-grey lighten-5" v-show="displayUserEdit">\
      <user-edit :user="user"></user-edit>\
    </div>\
  </li>',
  data: function () {
    return {
      displayUserEdit: false
    }
  },
  ready: function () {
   this.user.__v_resource = this.$resource('users/{id}')
  },
  computed: {
    fullName: function () {
      return this.user.attributes.firstname + ' ' + this.user.attributes.lastname
    },
    displayAdmin: function () {
      return (this.user.attributes.admin) ? '(Admin)' : ''
    },
    displayApproved: function () {
      return (this.user.attributes.approved) ? 'Approuvé' : 'Non approuvé'
    }
  },
  methods: {
    changeCurrentView (view) {
      // this.$dispatch('change-current-view', view)
      // this.$dispatch('display-user-edit', view)

      // Fix trouble with the labels overlapping prefilled content
      // http://materializecss.com/forms.html
      Materialize.updateTextFields()
      this.displayUserEdit = true
    },
    tapUser: function (user) {
      // console.log(user)

      // To user-index
      this.$dispatch('user-tapped', user)
      // this.$set('user.pressed', true)
    },
    pressUser: function (userId) {
      if (this.$get('user.pressed') === true) {
        // To user-index
        this.$dispatch('user-unpressed', userId)
        this.$set('user.pressed', false)
      } else {
        // To user-index
        this.$dispatch('user-pressed', userId)
        this.$set('user.pressed', true)
      }
    }
  }
})
