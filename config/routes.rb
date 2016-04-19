# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in
Rails.application.routes.draw do
  apipie
  devise_for :users, controllers: { registrations: 'users/registrations' }

  devise_scope :user do
    scope 'users' do

    end

    get 'settings', to: 'settings#index'
    # get 'delay/:minutes', to: 'user#delay'
  end

  namespace :api do
    namespace :v1 do
      scope 'dashboard', controller: :dashboard do
        get 'path/from/:from/to/:to', action: :path
      end

      scope 'settings', controller: :settings do
        post 'sarah-state/:state', action: :sarah_state
        post 'twitter-state/:state', action: :twitter_state
        post 'alert-state/:state', action: :alert_state
        post 'memo-state/:state', action: :memo_state
      end

      resources :reminders, only: [:create, :update, :destroy]
    end
  end

  # scope 'dashboard', controller: :dashboard do
  #   # ex : dashboard/resize/1/full, dashboard/resize/2/half
  #   get 'resize/:zone/:size',       action: :resize
  #   get 'routes/from/:from/to/:to', action: :routes
  # end

  # resources :notifications, only: :create
  # resources :alarms, only: :create
  # resources :commands

  root 'dashboard#index'

  mount ActionCable.server => '/cable'
end
