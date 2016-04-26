# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in
Rails.application.routes.draw do
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

  root 'dashboard#index'
end
