class UsersController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    ap 'UsersController#create'
    user = @dot_api_connector.create_user_registration(user_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: user
  end

  def update
    ap 'UsersController#update'
    user = @dot_api_connector.update_user(params[:id], user_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: user
  end

  def destroy
    ap 'UsersController#destroy'
    user = @dot_api_connector.destroy_user(params[:id]).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: user
  end

  private
    def user_params
      params.permit :admin, :approved, :email, :firstname, :lastname, :password
    end
end
