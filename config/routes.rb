# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in
Rails.application.routes.draw do
  scope 'users' do
    get 'sign_in', to: 'users/sessions#new'
    post 'sign_in', to: 'users/sessions#create', as: :user_session

    get 'sign_up', to: 'users/registrations#new'
    post 'sign_up', to: 'users/registrations#create', as: :user_registration
  end

  get :settings, to: 'settings#show'
  resources :settings, only: :update
  resources :reminders, only: [:new, :create]

  root 'dashboard#index'
end

# OK        new_user_session GET     /users/sign_in(.:format)       devise/sessions#new
# OK            user_session POST    /users/sign_in(.:format)       devise/sessions#create
# OK    destroy_user_session DELETE  /users/sign_out(.:format)      devise/sessions#destroy

# KO           user_password POST    /users/password(.:format)      devise/passwords#create
# KO       new_user_password GET     /users/password/new(.:format)  devise/passwords#new
# KO      edit_user_password GET     /users/password/edit(.:format) devise/passwords#edit
# KO                         PATCH   /users/password(.:format)      devise/passwords#update
# KO                         PUT     /users/password(.:format)      devise/passwords#update

# KO cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
# OK        user_registration POST   /users(.:format)               devise/registrations#create
# OK    new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
# OK   edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
# OK                          PATCH  /users(.:format)               devise/registrations#update
# KO                          PUT    /users(.:format)               devise/registrations#update
# KO                          DELETE /users(.:format)               devise/registrations#destroy
