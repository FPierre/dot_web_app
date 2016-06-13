module Users
  class SessionsController < ApplicationController
    layout 'user'

    before_action -> { @dot_api_connector = DotApiConnector.new }

    def new
    end

    def create
      ap 'Users::SessionsController#create'

      if params[:email].present? && params[:password].present?
        user = @dot_api_connector.create_user_session(user_params).data

        if user
          session[:current_user] = user

          redirect_to settings_path and return
        # else
        #   ap 'else'
        #   redirect_to root_path and return
        end
      end
    rescue DotApiConnector::Error => e
      ap 'rescue'
      redirect_to root_path and return
    end

    def destroy
      reset_session
      redirect_to root_path and return
    end

    private
      def user_params
        params.permit :email, :password
      end
  end
end
