module Users
  class RegistrationsController < ApplicationController
    def new
    end

    def create
      dot_api_connector = DotApiConnector.new

      response = dot_api_connector.create_user_registration(user_params).data

      if response['attributes']['authentication-token'].present?
        # Override session if already set (could be deprecated one)
        # session[:authentication_token] = response['attributes']['authentication-token']

        redirect_to root_path and return
      end

      # In case API responds with HTTP code 200 but without 'user_token' field (shouldn't append)
      # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
    rescue DotApiConnector::Error => e
      # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
    end

    private
      def user_params
        params.permit(:email, :firstname, :lastname, :password)
      end
  end
end
