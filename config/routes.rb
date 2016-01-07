Rails.application.routes.draw do
  get 'delay/:minutes', to: 'test#delay'

  root 'test#index'

  mount ActionCable.server => '/cable'
end
