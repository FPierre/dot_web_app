class SettingsController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new }
  before_action -> { @current_user = session[:current_user].with_indifferent_access if session[:current_user] }

  def show
    @users     = @dot_api_connector.get_users.data
    @setting   = @dot_api_connector.get_setting(1).data
    @reminders = @dot_api_connector.get_reminders.data

    # if response['attributes']['authentication-token'].present?
      # Override session if already set (could be deprecated one)
      # session[:authentication_token] = response['attributes']['authentication-token']

      # redirect_to root_path and return
    # end
  rescue DotApiConnector::Error => e
    redirect_to root_path
  end

  def update
    setting = @dot_api_connector.update_setting(setting_param).data
  rescue DotApiConnector::Error => e
  else
  end

  private
    def setting_param
      params.permit!
    end
end
