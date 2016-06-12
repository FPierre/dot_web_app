Rails.application.routes.draw do
  scope 'users' do
    get 'sign_in', to: 'users/sessions#new'
    post 'sign_in', to: 'users/sessions#create', as: :user_session

    get 'sign_up', to: 'users/registrations#new'
    post 'sign_up', to: 'users/registrations#create', as: :user_registration
  end

  namespace :screens do
    get 'team', action: 'team'
    get 'news', action: 'news'
    get 'guest', action: 'guest'
  end

  get :settings, to: 'settings#show'

  resources :raspberries, only: [:create, :update, :destroy]
  resources :reminders, only: [:create, :destroy]
  resources :settings, only: :update
  resources :users, only: [:create, :update, :destroy]

  root 'screens#team'
end
