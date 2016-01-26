//= require jquery2
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require underscore
//= require gmaps/google
//
//= require_tree .

$(document).on('ready page:load', function() {
  var windowsHeight = $(window).height(),
      headerHeight = $('.nav-wrapper').height(),
      zoneHeight = (windowsHeight - headerHeight - 20 - 20 - 20 - 5) / 2;

  $('.zone').height(zoneHeight);
});
