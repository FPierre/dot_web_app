class VoiceRecognitionServersController < ApplicationController
  before_action :authenticate, :authorize_admin
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def update
    voice_recognition_server = @dot_api_connector.update_voice_recognition_server(voice_recognition_server_param).data
  rescue DotApiConnector::Error => e

  end

  private
    def voice_recognition_server_param
      params.permit :api_port, :domain_name, :ip_address, :mac_address
    end
end
