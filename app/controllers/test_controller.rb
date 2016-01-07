class TestController < ApplicationController
  def index
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', minutes: params[:minutes]

    head :ok
  end
end
