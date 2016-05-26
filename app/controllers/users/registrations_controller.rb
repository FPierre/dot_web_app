module Users
  class RegistrationsController < ApplicationController
    layout 'user'

    before_action -> { @dot_api_connector = DotApiConnector.new }

    def new
    end

    def create
      response = @dot_api_connector.create_user_registration(user_params).data

      # User not approved yet
      redirect_to root_path

      # In case API responds with HTTP code 200 but without 'user_token' field (shouldn't append)
      # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
    rescue DotApiConnector::Error => e
      # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
    end

    private
      def user_params
        params.permit :email, :firstname, :lastname, :password
      end
  end
end
