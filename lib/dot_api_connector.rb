require 'net/http'
require 'net/https'
require 'uri'
require 'json'

class Error < StandardError
end

class DotApiConnector
  attr_reader :api_port, :api_ssl, :api_ssl_verification, :api_token, :api_url, :user_token
  attr_accessor :data, :meta

  def initialize options = {}
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

    @user_token = options[:user_token]
  end

  # TEST
  def ping
    process{ resource.get(route_for('ping'), headers) }
  end

  # User

  def get_users options = {}
    process{ resource.get(route_for('users', options), headers) }
  end

  def create_user_registration attributes = {}
    process{ resource.post(route_for('users'), attributes.to_json, headers) }
  end

  def create_user_session attributes = {}
    process{ resource.post(route_for('sign_in'), attributes.to_json, headers) }
  end

  # def signout
  #   process{ resource.post(route_for('signout'), {}.to_json, headers ) }
  # end

  # def verify_authentication
  #   process{ resource.get(route_for('verify_authentication'), headers ) }
  # end

  # # EXTERNAL USER
  # def get_external_user
  #   process{ resource.get(route_for('external_user'), headers) }
  # end

  # def update_external_user attributes = {}
  #   process{ resource.patch(route_for('external_user'), attributes.to_json, headers) }
  # end

  # def destroy_external_user
  #   process{ resource.delete(route_for('external_user'), headers) }
  # end

  # Reminder

  def create_reminder attributes = {}
    process{ resource.patch(route_for('reminders'), attributes.to_json, headers) }
  end

  # Settings

  def update_setting attributes = {}
    process{ resource.patch(route_for('settings'), attributes.to_json, headers) }
  end

  # # COMPTE
  # def get_comptes options = {}
  #   process{ resource.get(route_for('comptes', options), headers) }
  # end

  # def get_compte compte_id
  #   process{ resource.get(route_for("comptes/#{compte_id}"), headers) }
  # end

  # def update_compte compte_id, attributes = {}
  #   process{ resource.patch(route_for("comptes/#{compte_id}"), attributes.to_json, headers) }
  # end

  # # TRANSMISSION
  # def get_transmissions_for_compte compte_id, options = {}
  #   process{ resource.get(route_for("comptes/#{compte_id}/transmissions", options), headers) }
  # end

  # def get_transmission_for_compte compte_id, transmission_id
  #   process{ resource.get(route_for("comptes/#{compte_id}/transmissions/#{transmission_id}"), headers) }
  # end

  # def update_transmission_for_compte compte_id, transmission_id, attributes = {}
  #   process{ resource.patch(route_for("comptes/#{compte_id}/transmissions/#{transmission_id}"), attributes.to_json, headers) }
  # end

  # def get_transmissions_for_piste piste_id, options = {}
  #   process{ resource.get(route_for("pistes/#{piste_id}/transmissions", options), headers) }
  # end

  # def update_transmission_for_piste piste_id, transmission_id, attributes = {}
  #   process{ resource.patch(route_for("pistes/#{piste_id}/transmissions/#{transmission_id}"), attributes.to_json, headers) }
  # end

  # # OPPORTUNITE PAIEMENTS (Factures)
  # def get_opportune_paiements compte_id, options = {}
  #   process{ resource.get(route_for("comptes/#{compte_id}/opportunite_paiements", options), headers) }
  # end

  # def get_opportune_paiement compte_id, opportunite_paiement_id
  #   process{ resource.get(route_for("comptes/#{compte_id}/opportunite_paiements/#{opportunite_paiement_id}"), headers) }
  # end

  # # PISTE
  # def get_pistes options = {}
  #   process{ resource.get(route_for('pistes', options), headers) }
  # end

  # def get_piste piste_id
  #   process{ resource.get(route_for("pistes/#{piste_id}"), headers) }
  # end

  # def update_piste piste_id, attributes = {}
  #   process{ resource.patch(route_for("pistes/#{piste_id}"), attributes.to_json, headers) }
  # end

  # def create_piste attributes = {}
  #   process{ resource.post(route_for('pistes'), attributes.to_json, headers) }
  # end

  # # QUALIFICATION
  # def update_qualification piste_id, attributes = {}
  #   process{ resource.patch(route_for("pistes/#{piste_id}/qualification"), attributes.to_json, headers) }
  # end

  # def create_qualification piste_id, attributes = {}
  #   process{ resource.post(route_for("pistes/#{piste_id}/qualification"), attributes.to_json, headers) }
  # end

  # def destroy_qualification piste_id
  #   process{ resource.delete(route_for("pistes/#{piste_id}/qualification"), headers) }
  # end

  # # COMMENT
  # def get_comments compte_id, options = {}
  #   process{ resource.get(route_for("comptes/#{compte_id}/comments", options), headers) }
  # end

  # def get_comment compte_id, comment_id
  #   process{ resource.get(route_for("comptes/#{compte_id}/comments/#{comment_id}"), headers) }
  # end

  private
    API_VERSION = 'v1'

    def process
      @data, @meta = [nil, nil]

      response = yield
    rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError => e # API unreachable
      raise DotApiConnector::Error.new 'API is unreachable'
    else
      case response
      when Net::HTTPSuccess
        begin
          result = JSON.parse(response.body).with_indifferent_access
# ap result

          @data = result&.dig :data
          # @data = result&.dig(:data)&.with_indifferent_access
          @meta = result&.dig :meta
          # @meta = result&.dig(:meta)&.with_indifferent_access

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

    def route_for path, options = {}
      route = "/api/#{API_VERSION}/#{path.to_s}"

      (options.present? && options != Hash.new) ? "#{route}?#{URI.encode_www_form(options)}" : route
    end

    def headers params = {}
      params_header = { token: @api_token, user_token: @user_token }.merge(params).map{ |k, v| "#{k}=#{v}" }.join(';')

      params.merge('Authorization' => "Token #{params_header}",
                   'Content-Type' => 'application/json',
                   'Accept' => 'application/json')
    end

    def resource
      http = Net::HTTP.new @api_url, @api_port

      http.use_ssl     = @api_ssl
      http.verify_mode = @api_ssl_verification if @api_ssl == true

      http
    end
end
