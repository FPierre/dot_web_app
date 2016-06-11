class RaspberriesController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    ap 'RaspberriesController#create'
    rapsberry = @dot_api_connector.create_raspberry(rapsberry_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: rapsberry
  end

  def destroy
    ap 'RaspberriesController#destroy'
    rapsberry = @dot_api_connector.destroy_raspberry(params[:id]).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: rapsberry
  end

  private
    def rapsberry_params
      params.permit :ip_address, :mac_address, :name
    end
end