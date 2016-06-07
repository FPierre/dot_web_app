require 'net/http'
require 'net/https'
require 'uri'
require 'json'

class Error < StandardError; end

class DotApiConnector
  attr_reader :api_port, :api_ssl, :api_ssl_verification, :api_token, :api_url, :token, :email, :authentication_params
  attr_accessor :data, :meta

  def initialize **options
    ap 'DotApiConnector#initialize'

    config = Rails.application.config_for(:dot_api).deep_symbolize_keys!

    # Required
    @api_port  = config[:api_port]
    @api_ssl   = config[:api_ssl]
    @api_token = config[:api_token]
    @api_url   = config[:api_url]

    # Optionnal
    @api_ssl_verification = config[:api_ssl_verification].present? ? config[:api_ssl_verification] : OpenSSL::SSL::VERIFY_NONE
  rescue NoMethodError => e
    raise DotApiConnector::Error.new "Please add 'api_port', 'api_ssl' 'api_token' and 'api_token' keys into your configuration"
  else
    options.deep_symbolize_keys!

    # @email = options[:email]
    # @token = options[:token]

    # OPTIMIZE vérifier la présence d'email et token
    # @authentication_params = { email: options[:email], token: options[:token] }
  end

  # Test

  def ping
    process { resource.get(route_for('ping')) }
  end

  # User

  def get_users params = {}
    process { resource.get(route_for('users', params)) }
  end

  def create_user_registration attributes = {}
    process { resource.post(route_for('users'), attributes.to_json) }
  end

  def create_user_session attributes = {}
    process { resource.post(route_for('sign_in'), attributes.to_json, headers) }
  end

  # Reminder

  def get_reminders params = {}
    process { resource.get(route_for('reminders', params)) }
  end

  def create_reminder attributes = {}
    process { resource.patch(route_for('reminders'), attributes.to_json) }
  end

  # Setting

  def get_setting params = {}
    process { resource.get(route_for('settings/1', params)) }
  end

  def update_setting attributes = {}
    process { resource.patch(route_for('settings'), attributes.to_json) }
  end

  # Raspberry

  def get_raspberries params = {}
    process { resource.get(route_for('raspberries', params)) }
  end

  def create_raspberry attributes = {}
    process { resource.patch(route_for('raspberries'), attributes.to_json) }
  end

  private
    API_VERSION = 'v1'

    def process
      @data, @meta = [nil, nil]

      response = yield
    rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError => e
      raise DotApiConnector::Error.new 'API is unreachable'
    else
      case response
      when Net::HTTPSuccess
        begin
          result = JSON.parse(response.body).with_indifferent_access

          @data = result&.dig :data
          @meta = result&.dig :meta

          self
        # JSON error
        rescue JSON::ParserError => e
          raise DotApiConnector::Error.new e.message
        end
      else
        result = (JSON.parse(response.body) rescue {})

        raise DotApiConnector::Error.new(result['errors'].presence || result['error'].presence || 'undefined error')
      end
    end

    def route_for path, params = {}
      route = "/api/#{API_VERSION}/#{path.to_s}"

      (params.present? && params != Hash.new) ? "#{route}?#{URI.encode_www_form(params)}" : route
    end

    def headers params = {}
      params_header = { token: @api_token, user_token: @user_token }.merge(params).map{|k, v| "#{k}=#{v}"}.join(';')

      params.merge('Authorization' => "Token #{params_header}", 'Content-Type' => 'application/json', 'Accept' => 'application/json')
    end

    def resource
      http = Net::HTTP.new @api_url, @api_port

      http.use_ssl = @api_ssl
      http.verify_mode = @api_ssl_verification if @api_ssl == true

      http
    end
end
