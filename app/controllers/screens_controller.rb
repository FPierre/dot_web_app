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

  # api :GET, '/routes/from/:from/to/:to', 'Display the route in zone one'
  # description 'Fetch Google API to get the route from/to'
  # param :from, String, desc: '', required: true
  # param :to, String, desc: '', required: true
  # def routes
  #   if params[:from].present? && params[:to].present?
  #     from = Geocoder.search params[:from]
  #     to   = Geocoder.search params[:to]

  #     @from = from.first.data['geometry']['location']
  #     @to = to.first.data['geometry']['location']
  #   end
  # end
end
