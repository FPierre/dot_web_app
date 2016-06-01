# require 'tweetstream'

class ScreensController < ApplicationController
  layout 'screen'

  def team
    weather_client = YahooWeatherService.new
    @weather = weather_client.fetch
  end

  def news

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
