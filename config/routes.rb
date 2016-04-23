# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in
Rails.application.routes.draw do
  apipie

  # Must be above devise_for :users method
  # https://github.com/plataformatec/devise/wiki/How-To:-Change-Default-Sign_up---Registration-Path-with-Custom-Path
  devise_scope :user do
    scope 'users' do
      get 'sign_in', to: 'users/sessions#new', as: :new_user_session
      get 'sign_up', to: 'users/registrations#new', as: :new_user_registration
      get 'edit', to: 'users/registrations#edit', as: :edit_user_registration
    end

    get 'settings', to: 'settings#index'
  end

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post 'users/sign_in', to: 'users/sessions#create', as: :user_session
        delete 'users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
        post 'users', to: 'users/registrations#create', as: :user_registration
        put 'users', to: 'users/registrations#update'
      end

      scope 'dashboard', controller: :dashboard do
        get 'path/from/:from/to/:to', action: :path
      end

      scope 'settings', controller: :settings do
        post 'reminders-state/:state', action: :reminders_state
        post 'sarah-state/:state', action: :sarah_state
        post 'twitter-state/:state', action: :twitter_state
        post 'weather-state/:state', action: :weather_state
      end

      resources :reminders, only: [:create]
    end
  end

  # devise_for :users, controllers: {
  #   registrations: 'api/v1/users/registrations',
  #   sessions: 'users/sessions'
  # }
  devise_for :users, skip: [:sessions, :passwords, :registrations]

  # scope 'dashboard', controller: :dashboard do
  #   # ex : dashboard/resize/1/full, dashboard/resize/2/half
  #   get 'resize/:zone/:size',       action: :resize
  #   get 'routes/from/:from/to/:to', action: :routes
  # end

  root 'dashboard#index'

  mount ActionCable.server => '/cable'
end

# OK        new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
# OK            user_session POST   /users/sign_in(.:format)       devise/sessions#create
# OK    destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy

# KO           user_password POST   /users/password(.:format)      devise/passwords#create
# KO       new_user_password GET    /users/password/new(.:format)  devise/passwords#new
# KO      edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
# KO                         PATCH  /users/password(.:format)      devise/passwords#update
# KO                         PUT    /users/password(.:format)      devise/passwords#update

# KO cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
# OK        user_registration POST   /users(.:format)               devise/registrations#create
# OK    new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
# OK   edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
# OK                          PATCH  /users(.:format)               devise/registrations#update
# KO                          PUT    /users(.:format)               devise/registrations#update
# KO                          DELETE /users(.:format)               devise/registrations#destroy
