class SettingsController < ApplicationController
  # before_action :authenticate_user!
  # before_filter do
  #   redirect_to :new_user_session_path unless current_user && current_user.admin?
  # end

  def index
    dot_api_connector = DotApiConnector.new

    @users = dot_api_connector.get_users.data

    # if response['attributes']['authentication-token'].present?
      # Override session if already set (could be deprecated one)
      # session[:authentication_token] = response['attributes']['authentication-token']

      # redirect_to root_path and return
    # end
  # In case API responds with HTTP code 200 but without 'user_token' field (shouldn't append)
  # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
  rescue DotApiConnector::Error => e
    ap e.message
    # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
  end

  def update
    dot_api_connector = DotApiConnector.new

    setting = dot_api_connector.update_setting(setting_param).data
  rescue DotApiConnector::Error => e
  else
  end

  private
    def setting_param
      params.permit!
    end
end
