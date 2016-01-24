class SettingsController < ApplicationController
  def index
    @users_to_approve = User.find_by approved: false
    @users = User.all.order :approved
  end
end
