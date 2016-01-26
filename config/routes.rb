
# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in

Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  # devise_scope :user do
  #   get '/users/delay/:minutes', to: 'user#delay'
  # end

  # resources :notifications, only: :create
  # resources :alarms, only: :create
  # resources :reminders
  # resources :commands

  get 'settings', to: 'settings#index'

  get 'routes/from/:from/to/:to', to: 'routes#show'

  root to: 'dashboard#index'

  mount ActionCable.server => '/cable'
end
