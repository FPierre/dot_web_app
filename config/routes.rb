
# https://github.com/plataformatec/devise/wiki/How-To:-Require-admin-to-activate-account-before-sign_in

Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    get '/users/delay/:minutes', to: 'user#delay'
  end

  root to: 'dashboard#index'

  mount ActionCable.server => '/cable'
end
