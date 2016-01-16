class DashboardController < ApplicationController
  def index
    @users_to_approve = User.find_by approved: false
    @users = User.all

    # TODO Initializer
    weather_client = YahooWeatherService.new
    @weather = weather_client.fetch

    ap @weather.forecasts
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', minutes: params[:minutes]

    head :ok
  end
end
