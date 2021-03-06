class UsersController < ApplicationController
  before_action :authenticate
  before_action :authorize, only: [:index, :update]
  before_action :authorize_admin, only: [:create, :destroy]
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def index
    users = @dot_api_connector.get_users(params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: users.data, status: :ok
  end

  def create
    ap 'UsersController#create'
    user = @dot_api_connector.create_user_registration(user_params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if user.errors
      render json: user.errors, status: :unprocessable_entity
    else
      render json: user.data, status: :created
    end
  end

  def update
    ap 'UsersController#update'

    # If non admin User tries to update other users
    if !@current_user['attributes']['admin'] && @current_user['id'] != params[:id]
      render json: { droits: 'Interdit' }, status: :forbidden and return
    else
      user = @dot_api_connector.update_user(params[:id], user_params)
    end
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if user.errors
      render json: user.errors, status: :unprocessable_entity
    else
      # If user updates himself
      session[:current_user] = @current_user = user.data if @current_user[:id] == params[:id]

      render json: user.data, status: :ok
    end
  end

  def destroy
    ap 'UsersController#destroy'
    user = @dot_api_connector.destroy_user(params[:id]).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: user
  end

  def myself
    render json: @current_user
  end

  private
    def user_params
      params.permit :admin, :approved, :email, :firstname, :lastname, :password
    end
end
