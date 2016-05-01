$(document).on('ready page:load', function() {
  if ($('body.dashboard.index').length) {

    // Hauteur des zones

    var windowsHeight = $(window).height(),
        headerHeight = $('nav').height(),
        zoneHeight = (windowsHeight - headerHeight - 20 - 20);

    // $('.zone').height(zoneHeight);
  }
});
