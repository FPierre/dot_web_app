class SettingsController < ApplicationController
  before_action :authenticate, :authorize_admin
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def show
    ap 'SettingsController#show'

    @raspberries              = @dot_api_connector.get_raspberries(params).data
    @setting                  = @dot_api_connector.get_setting(params).data
    @users                    = @dot_api_connector.get_users(params).data
    @voice_commands           = @dot_api_connector.get_voice_commands(params).data
    @voice_recognition_server = @dot_api_connector.get_voice_recognition_server(params).data

    reminders_info   = @dot_api_connector.get_reminders(params)

    @reminders       = reminders_info.data
    @reminders_links = reminders_info.links
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
