Rails.application.routes.draw do
  scope 'users' do
    get 'sign_in', to: 'users/sessions#new'
    post 'sign_in', to: 'users/sessions#create', as: :user_session
    delete 'sign_out', to: 'users/sessions#destroy'

    get 'sign_up', to: 'users/registrations#new'
    post 'sign_up', to: 'users/registrations#create', as: :user_registration
  end

  namespace :screens do
    get 'guest', action: 'guest'
    get 'normal', action: 'normal'
    get 'team', action: 'team'
  end

  namespace :tests do
    get 'ping'
    post 'voice'
  end

  get :settings, to: 'settings#show'

  resources :raspberries, only: [:index, :create, :update, :destroy]
  resources :reminders, only: [:index, :create, :destroy]
  resources :settings, only: :update
  resources :users, only: [:index, :create, :update, :destroy]
  resources :voice_recognition_servers, only: :update

  root 'screens#team'
end
