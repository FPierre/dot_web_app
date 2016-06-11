require 'net/http'
require 'net/https'
require 'uri'
require 'json'

class DotApiConnector
  class Error < StandardError; end

  attr_reader :api_url, :api_port, :api_ssl, :api_ssl_verification, :user_email, :user_token
  attr_accessor :data, :meta

  def initialize options = {}
    # ap 'DotApiConnector#initialize'
    # ap options
    config = Rails.application.config_for(:dot_api).deep_symbolize_keys!

    @api_port = config[:api_port]
    @api_ssl  = config[:api_ssl]
    @api_url  = config[:api_url]

    # Optionnal
    @api_ssl_verification = config[:api_ssl_verification].present? ? config[:api_ssl_verification] : OpenSSL::SSL::VERIFY_NONE
  rescue NoMethodError => e
    raise Error.new "Please add 'api_url', 'api_port' and 'api_ssl' keys into your configuration"
  else
    if options
      options.deep_symbolize_keys

      @user_email = options[:email]
      @user_token = options[:token]

      ap @user_email
    end
  end

  # User

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



  def ping
    process { resource.get(route_for('ping'), headers) }
  end

  # def get_comptes options = {}
  #   process { resource.get(route_for('comptes', options), headers) }
  # end

  def get_compte compte_id
    process { resource.get(route_for("comptes/#{compte_id}"), headers) }
  end

  def signin attributes = {}
    process { resource.post(route_for('signin'), {}.to_json, headers(attributes)) }
  end

  # def create_transmission_for_piste piste_id, attributes = {}
  #   process { resource.post(route_for("pistes/#{piste_id}/transmissions"), attributes.to_json, headers) }
  # end

  def update_external_user attributes = {}
    process { resource.patch(route_for('external_user'), attributes.to_json, headers) }
  end

  def update_compte compte_id, attributes = {}
    process { resource.patch(route_for("comptes/#{compte_id}"), attributes.to_json, headers) }
  end

  # def destroy_external_user
  #   process { resource.delete(route_for('external_user'), headers) }
  # end

  def process
    @data, @meta = [nil, nil]

    response = yield
  rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError => e # API unreachable
    raise Error.new 'API is unreachable'
  else
    case response
    when Net::HTTPSuccess
      begin
        result = JSON.parse(response.body).with_indifferent_access

        # ap result

        @data = result&.dig :data
        @meta = result&.dig :meta

        self
      rescue JSON::ParserError => e # JSON error
        raise Error.new e.message
      end
    else
      raise Error.new(response.code == 401)

      result = (JSON.parse(response.body) rescue {})

      raise Error.new(result['errors'].presence || result['error'].presence || 'undefined error')
    end
  end

  private
    API_VERSION = 'v1'

    def route_for path, options = {}
      route = %Q(/api/#{API_VERSION}/#{path.to_s})
      options = { user_email: @user_email, user_token: @user_token }.merge(options)

      # ap @user_email

      "#{route}?#{URI.encode_www_form(options)}"
    end

    def headers params = {}
      params.merge('Content-Type' => 'application/json', 'Accept' => 'application/json')
    end

    def resource
      http = Net::HTTP.new @api_url, @api_port
      http.use_ssl = @api_ssl
      http.verify_mode = @api_ssl_verification if @api_ssl == true

      http
    end
end




# require 'net/http'
# require 'net/https'
# require 'uri'
# require 'json'

# class Error < StandardError; end

# class DotApiConnector
#   attr_reader :api_port, :api_ssl, :api_ssl_verification, :api_url, :token, :user_email, :authentication_params
#   attr_accessor :data, :meta

#   def initialize **options
#     ap 'DotApiConnector#initialize'

#     config = Rails.application.config_for(:dot_api).deep_symbolize_keys!
#     # ap config
#     @api_port = config[:api_port]
#     @api_ssl  = config[:api_ssl]
#     @api_url  = config[:api_url]

#     # Optionnal
#     @api_ssl_verification = config[:api_ssl_verification].present? ? config[:api_ssl_verification] : OpenSSL::SSL::VERIFY_NONE
#   rescue NoMethodError => e
#     raise DotApiConnector::Error.new "Please add 'api_port' and 'api_ssl' keys into your configuration"
#   else
#     # options.deep_symbolize_keys!

#     # @user_email = options[:user_email]
#     # @token = options[:token]

#     # OPTIMIZE vérifier la présence d'user_email et token
#     # @authentication_params = { user_email: options[:user_email], token: options[:token] }
#   end

#   # Test

#   def ping
#     process { resource.get(route_for('ping')) }
#   end

#   # User

#   def get_users params = {}
#     process { resource.get(route_for('users', params)) }
#   end

#   def create_user_registration attributes = {}
#     process { resource.post(route_for('users'), attributes.to_json) }
#   end

#   def create_user_session attributes = {}
#     process { resource.post(route_for('sign_in'), attributes.to_json, headers) }
#   end

#   def destroy_user attributes = {}
#     ap 'destroy_user'
#     # ap route_for('users')
#     # ap attributes.to_json
#     process { resource.delete(route_for('users'), attributes.to_json) }
#   end

#   # Reminder

#   def get_reminders params = {}
#     process { resource.get(route_for('reminders', params)) }
#   end

#   def create_reminder attributes = {}
#     process { resource.patch(route_for('reminders'), attributes.to_json) }
#   end

#   # Setting

#   def get_setting params = {}
#     process { resource.get(route_for('settings/1', params)) }
#   end

#   def update_setting attributes = {}
#     process { resource.patch(route_for('settings'), attributes.to_json) }
#   end

#   # Raspberry

#   def get_raspberries params = {}
#     process { resource.get(route_for('raspberries', params)) }
#   end

#   def create_raspberry attributes = {}
#     process { resource.patch(route_for('raspberries'), attributes.to_json) }
#   end

#   private
#     API_VERSION = 'v1'

#     def process
#       @data, @meta = [nil, nil]

#       response = yield
#       ap '1'
#     rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError => e
#       ap '1 bis'
#       raise DotApiConnector::Error.new 'API is unreachable'
#     else
#       ap '2'
#       case response
#       when Net::HTTPSuccess
#         ap '3'
#         begin
#           result = JSON.parse(response.body).with_indifferent_access
#           ap '4'

#           @data = result&.dig :data
#           @meta = result&.dig :meta

#           self
#         # JSON error
#         rescue JSON::ParserError => e
#           ap '5'
#           raise DotApiConnector::Error.new e.message
#         end
#       else
#         ap '6'
#         result = (JSON.parse(response.body) rescue {})
#         ap '7'

#         raise DotApiConnector::Error.new(result['errors'].presence || result['error'].presence || 'undefined error')
#       end
#     end

#     def route_for path, params = {}
#       # ap 'route_for'
#       route = "/api/#{API_VERSION}/#{path.to_s}"

#       (params.present? && params != Hash.new) ? "#{route}?#{URI.encode_www_form(params)}" : route
#     end

#     # TODO Deprecated
#     def headers params = {}
#       ap 'headers'
#       params_header = { token: @api_token, user_token: @user_token }.merge(params).map{|k, v| "#{k}=#{v}"}.join(';')

#       params.merge('Authorization' => "Token #{params_header}", 'Content-Type' => 'application/json', 'Accept' => 'application/json')
#     end

#     def resource
#       # ap 'resource'
#       http = Net::HTTP.new @api_url, @api_port
#       http.use_ssl = @api_ssl
#       http.verify_mode = @api_ssl_verification if @api_ssl == true

#       http
#     end
# end
