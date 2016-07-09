class ScreensController < ApplicationController
  layout 'screen'

  before_action -> { @dot_api_connector = DotApiConnector.new }

  def team
    @weather       = @dot_api_connector.get_weather.data
    @room_occupied = @dot_api_connector.get_setting.data['attributes']['room-occupied']
  rescue DotApiConnector::Error => e
    ap e.message
  end

  def guest
  end

  def normal
  end
end
