class RemindersController < ApplicationController
  before_action :authenticate, :authorize
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def index
    reminders_info = @dot_api_connector.get_reminders(params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    render json: { data: reminders_info.data, links: reminders_info.links }, status: :ok
  end

  def create
    reminder = @dot_api_connector.create_reminder(reminder_params)
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if reminder.errors
      render json: reminder.errors, status: :unprocessable_entity
    else
      render json: reminder.data, status: :created
    end
  end

  def destroy
    reminder = @dot_api_connector.destroy_reminder(params[:id])
  rescue DotApiConnector::Error => e
    ap e.message
  else
    if reminder.errors
      render json: reminder.errors, status: :unprocessable_entity
    else
      render json: reminder.data, status: :created
    end
  end

  private
    def reminder_params
      params.permit(:content, :displayed_at, :duration, :priority, :title).merge(user_id: @current_user[:id])
    end
end
