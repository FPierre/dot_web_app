class Reminder < ApplicationRecord
  belongs_to :user

  after_create -> { ActionCable.server.broadcast 'reminder_channel', { reminder: self }}
end
