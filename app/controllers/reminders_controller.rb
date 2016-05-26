class RemindersController < ApplicationController
  before_action :reminder_params, only: :create

  def new
  end

  def create
    response = @dot_api_connector.create_reminder(reminder_params).data

    if response['attributes']['authentication-token'].present?
      # Override session if already set (could be deprecated one)
      # session[:authentication_token] = response['attributes']['authentication-token']

      redirect_to root_path and return
    end

    # In case API responds with HTTP code 200 but without 'user_token' field (shouldn't append)
    # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
  rescue DotApiConnector::Error => e
    # redirect_to external_users_ui.sign_in_path(redirect_url: params[:redirect_url]), alert: 'Mauvais identifiants.' and return
  end

  private
    def reminder_params
      params.permit :content, :display_at, :duration, :priority, :title
    end
end


# "content",    limit: 75,             null: false
# "display_at"
# "duration",   limit: 2,  default: 1, null: false
# "priority",              default: 3, null: false
# "title"
