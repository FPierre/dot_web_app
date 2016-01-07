class TestController < ApplicationController
  def index
  end

  def delay
    ActionCable.server.broadcast 'notification_channel', notification: 'test'

    head :ok
  end
end
