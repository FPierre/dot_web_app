json.array!(@reminders) do |reminder|
  json.extract! reminder, :id, :title, :body, :user_id
  json.url reminder_url(reminder, format: :json)
end
