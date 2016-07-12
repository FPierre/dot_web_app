Vue.component('reminders-index', {
  template: '<div class="reminders-index">\
    <ul class="collection with-header">\
      <li class="collection-header">\
        <div class="row" style="margin-bottom: 0;">\
          <div class="col s6">\
            <h4>Mémos</h4>\
          </div>\
          <div class="col s6">\
            <button class="btn-flat waves-effect right" @click="eraseAll">Effacer tout</button>\
          </div>\
        </div>\
      </li>\
      <reminder-show v-for="reminder in reminders" :reminder="reminder"></reminder-show>\
    </ul>\
    <div v-if="reminders.length > 0">\
      <pagination :reminders.sync="reminders" :links="links"></pagination>\
    </div>\
  </div>',
  data: function () {
    return {
      reminders: [],
      links: []
    }
  },
  created: function () {
    this.$http.get('/reminders').then(function (response) {
      this.reminders = coerceProp(response.data.data)
      this.links = coerceProp(response.data.links)
    })
  },
  methods: {
    eraseAll: function () {
      this.$http.delete('/reminders/erase_all').then(function (response) {
        Materialize.toast('Mémos effacés', 4000)
      })
    }
  }
})
