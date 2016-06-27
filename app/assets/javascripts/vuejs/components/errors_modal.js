Vue.component('errors-modal', {
  props: ['errors'],
  template: '<div id="errors-modal" class="modal">\
    <div class="modal-content">\
      <h4>Erreurs</h4>\
      <p>Sur les champs suivants</p>\
      <ul>\
        <li v-for="(prop, message) in errors">\
          <b>{{ prop }}</b> : {{ message }}\
        </li>\
      </ul>\
    </div>\
    <div class="modal-footer">\
      <a href="#!" class="modal-action modal-close waves-effect btn-flat" @click="close">Ok</a>\
    </div>\
  </div>',
  methods: {
    close: function () {
      this.errors = null
    }
  }
})
