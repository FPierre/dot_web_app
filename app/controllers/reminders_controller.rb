class RemindersController < ApplicationController
  before_action :authenticate
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def create
    ap 'RemindersController#create'

    reminder = @dot_api_connector.create_reminder(reminder_params).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: reminder
  end

  def destroy
    ap 'RemindersController#destroy'
    reminder = @dot_api_connector.destroy_reminder(params[:id]).data
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: reminder
  end

  private
    def reminder_params
      params.permit(:content, :displayed_at, :duration, :priority, :title).merge(user_id: @current_user[:id])
    end
end
