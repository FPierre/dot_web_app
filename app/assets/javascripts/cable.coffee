# Action Cable provides the framework to deal with WebSockets in Rails.
# You can generate new channels where WebSocket features live using the rails generate channel command.
#
# Turn on the cable connection by removing the comments after the require statements (and ensure it's also on in config/routes.rb).
#
//= require action_cable
//= require_self
//= require_tree ./channels

@App ||= {}
# App.cable = ActionCable.createConsumer('/cable')
# App.cable = ActionCable.createConsumer('ws://localhost:28080')

# A l'air de fonctionner !
# avec api rails s -p4000
# et api  rails s
App.cable = ActionCable.createConsumer('ws://localhost:4000/cable')

# this.App || (this.App = {});

# App.cable = ActionCable.createConsumer('ws://localhost:4000/cable');
