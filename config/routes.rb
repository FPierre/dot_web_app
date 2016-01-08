Rails.application.routes.draw do
  devise_for :users
  get 'delay/:minutes', to: 'test#delay'

  root 'test#index'

  mount ActionCable.server => '/cable'
end
