class UsersController < ApplicationController
  before_action :authenticate
  before_action -> { @current_user = session[:current_user].with_indifferent_access if session[:current_user] }
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    user = @dot_api_connector.create_user_registration(user_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: user
  end

  def destroy
    @dot_api_connector.destroy_user params[:id]
  rescue DotApiConnector::Error => e
    ap e.message
  else
    head :no_content
  end

  private
    def user_params
      params.permit :email, :firstname, :lastname, :password
    end
end
