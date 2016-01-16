class DashboardController < ApplicationController
  def index
    @users_to_approve = User.find_by approved: false
    @users = User.all
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', minutes: params[:minutes]

    head :ok
  end
end
