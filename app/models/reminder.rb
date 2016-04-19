class Reminder < ApplicationRecord
  after_create -> { ActionCable.server.broadcast 'reminder_channel', { reminder: self }}
end
