Vue.component('voice-commands-index', {
  props: ['voiceCommands'],
  template: '<ul class="collection with-header">\
    <li class="collection-header">\
      <div class="row" style="margin-bottom: 0;">\
        <h4>Commandes vocales</h4>\
      </div>\
    </li>\
    <voice-command-show v-for="voiceCommand in voiceCommands" :voice-command="voiceCommand"></voice-command-show>\
  </ul>'
})
