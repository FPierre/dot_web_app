class RaspberriesController < ApplicationController
  before_action :authenticate
  before_action :authorize, only: :index
  before_action :authorize_admin, only: [:create, :update, :destroy]
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def index
    raspberries = @dot_api_connector.get_raspberries(params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: raspberries.data, status: :ok
  end

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
      render json: raspberry.data, status: :ok
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
      params.permit :api_port, :ip_address, :mac_address, :master_device, :name
    end
end
