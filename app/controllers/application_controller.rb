class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected
    def authenticate
      authenticate_by_session || render_unauthorized
    end

    def authorize
      @current_user['attributes']['approved'] == true || render_forbidden
    end

    def authorize_admin
      (@current_user['attributes']['approved'] == true && @current_user['attributes']['admin'] == true) || render_forbidden
    end

  private
    def authenticate_by_session
      @current_user = (session[:current_user].present?) ? session[:current_user].with_indifferent_access : nil
    end

    def render_unauthorized
      redirect_to sign_in_path, notice: 'Non autorisé' and return
    end

    def render_forbidden
      respond_to do |format|
        format.html { redirect_to sign_in_path, notice: 'Droits administrateur requis' and return }
        format.json { render json: { droits: 'Forbidden' }, status: :forbidden and return }
      end
    end
end
