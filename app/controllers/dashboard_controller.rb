class DashboardController < ApplicationController
  def index
    # TODO Initializer
    # weather_client = YahooWeatherService.new
    # @weather = weather_client.fetch

    # api_sarah
    # Gmail : Sarah Paris, api.test.sarah@gmail.com, SarahParisAPI
    # Twitter : SarahParisTest, api.test.sarah@gmail.com, TwSarahParisAPIitter

    # Sarah Dot
    # projet.dot@gmail.com
    # .dot.project2016
    # +33651043417



    # http://www.matheuslima.com/twitters-streaming-api-with-ruby-on-rails/

    # fetch_ratp_tweets

    # client = Twitter::REST::Client.new do |config|
    #   config.consumer_key        = 'fQERq2RGEUnAAy6OS14RRhLTs'
    #   config.consumer_secret     = 'cmeo9G5Hv6oQQqpHbYRx9aR4UD8C1CAabirknMobHfVQhdrPxi'
    #   config.access_token        = '4839018556-okWUT63S7kf4Uo9lC909siHXCNaFVGBilBrldZw'
    #   config.access_token_secret = '3wjflgAkvtG0jwLXXeGNzsjLa4BzWg71YzZf19pLgXaB0'
    # end

    # @tweets = client.follow 'Ligne1_RATP'

    # client = Twitter::Streaming::Client.new do |config|
    #   config.consumer_key        = 'fQERq2RGEUnAAy6OS14RRhLTs'
    #   config.consumer_secret     = 'cmeo9G5Hv6oQQqpHbYRx9aR4UD8C1CAabirknMobHfVQhdrPxi'
    #   config.access_token        = '4839018556-okWUT63S7kf4Uo9lC909siHXCNaFVGBilBrldZw'
    #   config.access_token_secret = '3wjflgAkvtG0jwLXXeGNzsjLa4BzWg71YzZf19pLgXaB0'
    # end
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', minutes: params[:minutes]

    head :ok
  end
end
