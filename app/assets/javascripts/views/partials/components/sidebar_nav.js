Vue.component('sidebar-nav', {
  template: '<ul id="sidebar-nav" class="side-nav fixed">\
    <li><a href="/users/index"><i class="fa fa-users"></i>Utilisateurs</a></li>\
    <li><a href="/settings/index"><i class="fa fa-cog"></i>Options</a></li>\
    <li><a href="/reminders/new"><i class="material-icons">add</i>Mémos</a></li>\
  </ul>',
  methods: {
    changeCurrentView: function (view) {
      this.$dispatch('change-current-view', view)
    }
  }
})
