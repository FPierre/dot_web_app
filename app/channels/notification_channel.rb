# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class NotificationChannel < ApplicationCable::Channel
  def subscribed
    ap 'NotificationChannel subscribed'
    stream_from 'notification_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak notification
    ap 'speak'
    ap notification
    ActionCable.server.broadcast 'notification_channel', notification: notification['notification']
  end
end
