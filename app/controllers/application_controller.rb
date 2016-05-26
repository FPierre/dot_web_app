class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  protected
    def authenticate
      authenticate_by_session || render_unauthorized
    end

    def authorize
      @current_user['approved'] == true || render_forbidden
    end

    def authorize_admin
      (self.authorize && @current_user['admin'] == true) || render_forbidden
    end

 private
    def authenticate_by_session
      @current_user = session[:current_user].presence
    end

    def render_unauthorized
      redirect_to root_path and return
    end

    def render_forbidden
      redirect_to root_path and return
    end
end
