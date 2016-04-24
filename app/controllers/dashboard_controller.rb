require 'tweetstream'

class DashboardController < ApplicationController
  layout 'screen'

  def index
    # TODO Initializer
    weather_client = YahooWeatherService.new
    @weather = weather_client.fetch

    # Ancien
    # api_sarah
    # Gmail : Sarah Paris, api.test.sarah@gmail.com, SarahParisAPI
    # Twitter : SarahParisTest, api.test.sarah@gmail.com, TwSarahParisAPIitter

    # Nouveau
    #
    # Gmail
    # Sarah Dot
    # projet.dot@gmail.com
    # .dot.project2016
    # +33651043417
    #
    # Twitter
    # dot_project_16
    # projet.dot@gmail.com
    # 2016_dot_pftasanj


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

    TweetStream.configure do |config|
      config.consumer_key       = 'b03z1apXYtpHHFWJY0LYRN4uI'
      config.consumer_secret    = 'ADJm66KjZjZxId3MfIuoZZ7W2pvTBavSGtq2Plk44n0fXllO24'
      config.oauth_token        = '4853273541-Bbab8VYmVwZt3e4FUkVnzg5WPKR3a0Ds48mG2Ax'
      config.oauth_token_secret = '45rJCCPJJjUMK9qndAqmEKrzbsaLi0YgzEf4qF68Dv8Aa'
      config.auth_method        = :oauth
    end

    # http://gettwitterid.com/?user_name=Ligne1_RATP&submit=GET+USER+ID

    # PierreFlauder => 1882342668
    # Ligne1_RATP => 799788259
    # Ligne13_RATP => 799916960


    # TweetStream::Client.new.track('SNCF') do |status|
    #   # puts "#{status.text}"

    #   ActionCable.server.broadcast 'notification_channel', author: 'SNCF', message: status.text, duration: 10000

    #   head :ok
    # end

    # TweetStream::Client.new.follow(799788259, 799916960) do |status|
    #   ap "#{status.text}"

    #   ActionCable.server.broadcast 'notification_channel'

    #   head :ok
    # end
  end

  api :GET, '/resize/zone/:zone/size/:size', 'Resize the zone'
  description 'Get a document if user has the rights'
  param :zone, [:one, :two], desc: 'Zone ID', required: true
  param :size, [:full, :half], desc: 'Size', required: true
  def resize
    if params[:zone].present? && params[:size].present?
      ActionCable.server.broadcast 'resize_channel', zone: params[:zone], size: params[:size]
    end
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', minutes: params[:minutes]

    head :ok
  end

  api :GET, '/routes/from/:from/to/:to', 'Display the route in zone one'
  description 'Fetch Google API to get the route from/to'
  param :from, String, desc: '', required: true
  param :to, String, desc: '', required: true
  def routes
    if params[:from].present? && params[:to].present?
      from = Geocoder.search params[:from]
      to   = Geocoder.search params[:to]

      @from = from.first.data['geometry']['location']
      @to = to.first.data['geometry']['location']
    end
  end
end
