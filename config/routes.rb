# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in
Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  devise_scope :user do
    scope 'users' do
      resources :reminders, only: [:create, :update, :destroy]
    end

    get 'settings', to: 'settings#index'
    # get 'delay/:minutes', to: 'user#delay'
  end

  scope 'dashboard', controller: :dashboard do
    # dashboard/resize/1/full
    # dashboard/resize/2/half
    get 'resize/:zone/:size',       action: :resize
    get 'routes/from/:from/to/:to', action: :routes
  end

  # resources :notifications, only: :create
  # resources :alarms, only: :create
  # resources :commands

  root 'dashboard#index'

  mount ActionCable.server => '/cable'
end
