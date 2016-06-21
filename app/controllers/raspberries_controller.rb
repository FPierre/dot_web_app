class RaspberriesController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    ap 'RaspberriesController#create'
    rapsberry = @dot_api_connector.create_raspberry(raspberry_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: rapsberry
  end

  def update
    ap 'RaspberriesController#update'
    raspberry = @dot_api_connector.update_raspberry(params[:id], raspberry_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: raspberry
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
    def raspberry_params
      params.permit :ip_address, :mac_address, :name
    end
end
