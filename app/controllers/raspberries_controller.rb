class RaspberriesController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    ap 'RaspberriesController#create'
    raspberry = @dot_api_connector.create_raspberry(raspberry_params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if raspberry.errors
      render json: raspberry.errors, status: :unprocessable_entity
    else
      render json: raspberry.data, status: :created
    end
  end

  def update
    ap 'RaspberriesController#update'
    raspberry = @dot_api_connector.update_raspberry(params[:id], raspberry_params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if raspberry.errors
      render json: raspberry.errors, status: :unprocessable_entity
    else
      render json: raspberry.data, status: :created
    end
  end

  def destroy
    ap 'RaspberriesController#destroy'
    raspberry = @dot_api_connector.destroy_raspberry(params[:id])
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if raspberry.errors
      render json: raspberry.errors, status: :unprocessable_entity
    else
      render json: raspberry.data, status: :created
    end
  end

  private
    def raspberry_params
      params.permit :ip_address, :mac_address, :name
    end
end
