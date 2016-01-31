
# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in

Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  devise_scope :user do
    scope 'users' do
      resources :reminders, only: [:create, :update, :destroy]
    end

    # get 'delay/:minutes', to: 'user#delay'
  end

  # dashboard/resize/1/full
  # dashboard/resize/2/half
  get 'dashboard/resize/:zone/:size', to: 'dashboard#resize'

  # get 'delay/:minutes', to: 'dashboard#delay'

  # resources :notifications, only: :create
  # resources :alarms, only: :create
  # resources :commands

  get 'settings', to: 'settings#index'

  get 'routes/from/:from/to/:to', to: 'routes#show'

  root to: 'dashboard#index'

  mount ActionCable.server => '/cable'
end
