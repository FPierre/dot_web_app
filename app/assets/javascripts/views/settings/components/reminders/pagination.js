Vue.component('pagination', {
  props: ['reminders', 'links'],
  template: '<ul class="pagination">\
    <li class="waves-effect" @click="prev" v-if="prevLinkEnabled">\
      <i class="material-icons">chevron_left</i>\
    </li>\
    <li class="waves-effect" @click="next" v-if="nextLinkEnabled">\
      <i class="material-icons">chevron_right</i>\
    </li>\
  </ul>',
  computed: {
    prevLinkEnabled: function () {
      return !!this.links.prev
    },
    nextLinkEnabled: function () {
      return !!this.links.next
    },
    currentPageNumber: function () {
      if (this.links.self) {
        return parseInt(this.links.self.match(/http:\/\/.+page%5Bsize%5D=(\d{1,3})&/)[1])
      }
      else {
        return 1
      }
    },
    prevPageNumber: function () {
      if (this.links.prev && this.currentPageNumber > 1) {
        return this.currentPageNumber - 1
      }
    },
    nextPageNumber: function () {
      if (this.links.next) {
        return this.currentPageNumber + 1
      }
    }
  },
  methods: {
    prev: function () {
      this.$http.get('/reminders', { page: this.prevPageNumber }).then(function (response) {
        this.reminders = coerceProp(response.data.data)
        this.$set('links', response.data.links)
      })
    },
    next: function () {
      this.$http.get('/reminders', { page: this.nextPageNumber }).then(function (response) {
        this.reminders = coerceProp(response.data.data)
        this.$set('links', response.data.links)
      })
    }
  }
})
