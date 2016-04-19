class RemoveUserIdFromReminders < ActiveRecord::Migration[5.0]
  def change
    remove_index :reminders, column: :user_id
  end
end
