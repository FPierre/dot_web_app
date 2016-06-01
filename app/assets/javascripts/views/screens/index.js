$(document).on('ready page:load', function() {
  if ($('html.screen.team').length) {

    // Hauteur des zones

    var windowsHeight = $(window).height(),
        headerHeight = $('nav').height(),
        zoneHeight = (windowsHeight - headerHeight - 20 - 20);

    // $('.zone').height(zoneHeight);
  }
});
