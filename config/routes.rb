Rails.application.routes.draw do
  get 'test_delay', to: 'test#delay'

  root 'test#index'

  mount ActionCable.server => '/cable'
end
