Rails.application.routes.draw do
  get 'test/delay'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'test#delay'

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
