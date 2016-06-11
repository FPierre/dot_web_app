class SettingsController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def show
    ap 'SettingsController#show'

    @users       = @dot_api_connector.get_users(params).data
    @setting     = @dot_api_connector.get_setting(params).data
    @reminders   = @dot_api_connector.get_reminders(params).data
    @raspberries = @dot_api_connector.get_raspberries(params).data
  rescue DotApiConnector::Error => e
    ap e.message
    redirect_to root_path
  end

  def update
    ap 'SettingsController#update'

    setting = @dot_api_connector.update_setting(setting_param).data
  rescue DotApiConnector::Error => e

  else

  end

  private
    def setting_param
      params.permit!
    end
end
