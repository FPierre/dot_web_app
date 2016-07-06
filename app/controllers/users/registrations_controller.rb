module Users
  class RegistrationsController < ApplicationController
    layout 'user'

    before_action -> { @dot_api_connector = DotApiConnector.new }

    def new
    end

    def create
      response = @dot_api_connector.create_user_registration(user_params)
    rescue DotApiConnector::Error => e
      ap e.message
    else
      if response.errors
        flash.now[:notice] = response.errors

        render :new
      else
        # User not approved yet
        redirect_to root_path
      end
    end

    private
      def user_params
        params.permit :email, :firstname, :lastname, :password
      end
  end
end
