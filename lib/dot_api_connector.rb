require 'net/http'
require 'uri'
require 'json'

class DotApiConnector
  class Error < StandardError; end

  attr_reader :api_url, :api_port, :user_email, :user_token
  attr_accessor :data, :links, :errors

  def initialize options = {}
    ap 'DotApiConnector#initialize'
    config = Rails.application.config_for(:dot_api).deep_symbolize_keys!

    @api_port = config[:api_port]
    @api_ssl  = config[:api_ssl]
    @api_url  = config[:api_url]
  rescue NoMethodError => e
    raise Error.new "Please add 'api_url' and 'api_port' keys into your configuration"
  else
    if options
      options.deep_symbolize_keys

      @user_email = options[:email]
      @user_token = options[:token]

      ap "@user_email: #{@user_email}"
    end
  end

  # User

  def create_user_session attributes = {}
    process { resource.post(route_for('sign_in'), attributes.to_json, headers) }
  end

  def get_users options = {}
    process { resource.get(route_for('users', options), headers) }
  end

  def create_user_registration attributes = {}
    process { resource.post(route_for('users'), attributes.to_json, headers) }
  end

  def update_user user_id, attributes = {}
    process { resource.patch(route_for("users/#{user_id}"), attributes.to_json, headers) }
  end

  def destroy_user user_id
    process { resource.delete(route_for("users/#{user_id}"), headers) }
  end

  # Setting

  def get_setting options = {}
    process { resource.get(route_for('settings/1', options), headers) }
  end

  def update_setting attributes = {}
    process { resource.patch(route_for('settings/1'), attributes.to_json, headers) }
  end

  # Raspberry

  def get_raspberries options = {}
    process { resource.get(route_for('raspberries', options), headers) }
  end

  def create_raspberry attributes = {}
    process { resource.post(route_for('raspberries'), attributes.to_json, headers) }
  end

  def update_raspberry raspberry_id, attributes = {}
    process { resource.patch(route_for("raspberries/#{raspberry_id}"), attributes.to_json, headers) }
  end

  def destroy_raspberry raspberry_id
    process { resource.delete(route_for("raspberries/#{raspberry_id}"), headers) }
  end

  # Reminder

  def get_reminders options = {}
    process { resource.get(route_for('reminders', options), headers) }
  end

  def create_reminder attributes = {}
    process { resource.post(route_for('reminders'), attributes.to_json, headers) }
  end

  def destroy_reminder reminder_id
    process { resource.delete(route_for("reminders/#{reminder_id}"), headers) }
  end

  # Test

  def ping options = {}
    process { resource.get(route_for('reminders', options), headers) }
  end

  def voice attributes = {}
    process { resource.post(route_for('tests/voice'), attributes.to_json, headers) }
  end

  # Voice command

  def get_voice_commands options = {}
    process { resource.get(route_for('voice_commands', options), headers) }
  end

  # Voice Recognition Server

  def get_voice_recognition_server options = {}
    process { resource.get(route_for('voice_recognition_servers/1', options), headers) }
  end

  def update_voice_recognition_server attributes = {}
    process { resource.patch(route_for('voice_recognition_servers/1'), attributes.to_json, headers) }
  end

  # Weather

  def get_weather options = {}
    process { resource.get(route_for('weather', options), headers) }
  end

  def process
    @data, @links, @errors = [nil, nil, nil]

    response = yield
  rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError => e # API unreachable
    raise Error.new 'API is unreachable'
  else
    case response
    when Net::HTTPSuccess
      ap 'no error from api'
      begin
        result = (JSON.parse(response.body).with_indifferent_access rescue {})
        @data = result&.dig :data
        @links = result&.dig :links

        self
      rescue JSON::ParserError => e
        raise Error.new e.message
      end
    else
      ap 'error from api'
      begin
        @errors = (JSON.parse(response.body).with_indifferent_access rescue {})

        self
      rescue JSON::ParserError => e
        raise Error.new e.message
      end
    end
  end

  private
    API_VERSION = 'v1'

    def route_for path, options = {}
      route = %Q(/api/#{API_VERSION}/#{path.to_s})
      options = { user_email: @user_email, user_token: @user_token }.merge(options)

      "#{route}?#{URI.encode_www_form(options)}"
    end

    def headers params = {}
      params.merge('Content-Type' => 'application/json', 'Accept' => 'application/json')
    end

    def resource
      http = Net::HTTP.new @api_url, @api_port

      http
    end
end
