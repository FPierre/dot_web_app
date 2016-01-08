Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    get '/users/delay/:minutes', to: 'user#delay'
  end

  root to: 'test#index'

  mount ActionCable.server => '/cable'
end
