class SettingsController < ApplicationController
  before_action :authenticate, :authorize
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def show
    ap 'SettingsController#show'

    @raspberries              = @dot_api_connector.get_raspberries(params).data
    @setting                  = @dot_api_connector.get_setting(params).data
    @voice_commands           = @dot_api_connector.get_voice_commands(params).data
    @voice_recognition_server = @dot_api_connector.get_voice_recognition_server(params).data
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
      params.permit :sarah_enabled, :twitter_enabled, :reminders_enabled, :weather_enabled, :weather_current_day_only,
                    :room_occupied, :screen_guest_enabled
    end
end
