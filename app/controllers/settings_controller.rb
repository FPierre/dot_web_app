class SettingsController < ApplicationController
  before_action :authenticate, :authorize
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def show
    # Récupération des informations de l'API pour l'initialisation du Front-end
    @raspberries              = @dot_api_connector.get_raspberries(params).data
    @setting                  = @dot_api_connector.get_setting(params).data
    @voice_commands           = @dot_api_connector.get_voice_commands(params).data
    @voice_recognition_server = @dot_api_connector.get_voice_recognition_server(params).data
  rescue DotApiConnector::Error => e
    ap e.message
    redirect_to root_path
  end

  def update
    setting = @dot_api_connector.update_setting(setting_param).data
  rescue DotApiConnector::Error => e

  end

  private
    def setting_param
      params.permit :sarah_enabled, :twitter_enabled, :reminders_enabled, :room_occupied, :screen_guest_enabled
    end
end
