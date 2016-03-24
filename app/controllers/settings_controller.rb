class SettingsController < ApplicationController
  before_action :authenticate_user!
  # before_filter do
  #   redirect_to :new_user_session_path unless current_user && current_user.admin?
  # end

  def index
    @users_to_approve = User.find_by approved: false
    @users = User.all.order :approved
  end
end
