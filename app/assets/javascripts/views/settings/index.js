$(document).on('ready page:load', function() {
  if ($('body.settings.index').length) {
    // Suppression de l'ombre sur le nav si tab juste en dessous
    var $nav = $('nav'),
        $tabs = $('main .tabs');

    if ($nav.length && $tabs.length) {
      $tabs.removeClass('z-depth-1')
           .css('box-shadow', '0 2px 3px 0 rgba(0, 0, 0, 0.21), 0 0 0 0 rgba(0, 0, 0, 0)');
    }
  }
});
