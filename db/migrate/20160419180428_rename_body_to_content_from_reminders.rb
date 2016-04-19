class RenameBodyToContentFromReminders < ActiveRecord::Migration[5.0]
  def change
    rename_column :reminders, :body, :content
  end
end
