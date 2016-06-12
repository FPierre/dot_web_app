Vue.component('pagination', {
  props: ['object', 'links'],
  template: '<ul class="pagination">\
    <li :class="linkClass" class="waves-effect" :class="{ \'disabled\': prevLinkDisabled }" @click="prev">\
      <i class="material-icons">chevron_left</i>\
    </li>\
    <li class="waves-effect" :class="{ \'disabled\': nextLinkDisabled }" @click="next">\
      <i class="material-icons">chevron_right</i>\
    </li>\
  </ul>',
  computed: {
    prevLinkDisabled: function () {
      return true
    },
    nextLinkDisabled: function () {
      return true
    },
    linkClass: function () {

    }
  },
  methods: {
    prev: function () {

    },
    next: function () {

    }
  }
})
