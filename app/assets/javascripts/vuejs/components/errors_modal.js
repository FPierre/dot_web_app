Vue.component('errors-modal', {
  props: ['errors'],
  template: '<div id="errors-modal" class="modal">\
    <div class="modal-content">\
      <h4>{{ title }}</h4>\
      <ul>\
        <li v-for="message in errors">{{ message }}</li>\
      </ul>\
    </div>\
    <div class="modal-footer">\
      <a href="#!" class="modal-action modal-close waves-effect btn-flat" @click="close">Ok</a>\
    </div>\
  </div>',
  computed: {
    title: function () {
      return (this.errors && this.errors.length) ? 'Erreur' : 'Erreurs'
    }
  },
  methods: {
    close: function () {
      this.errors = null
    }
  }
})
