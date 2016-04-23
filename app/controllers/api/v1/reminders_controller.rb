module Api
  module V1
    class RemindersController < ApplicationController
      api :POST, '/reminders', 'Create a Reminder'
      # description ''
      error code: 422, desc: 'Unprocessable entity'
      example "curl -X POST http://localhost:3000/api/v1/reminders -H \"Content-type: application/json\" -d '{ \"title\": \"title\", \"content\": \"content\" }'"
      meta client: [:android_application], status: :pending
      param :title, String, desc: 'Reminder title', required: true
      param :content, String, desc: 'Reminder content', required: true
      def create
        reminder = Reminder.new reminder_params

        if reminder.save
          render json: reminder, status: :created
        else
          render json: reminder.errors, status: :unprocessable_entity
        end
      end

      private
        def reminder_params
          params.permit(:title, :content)
        end
    end
  end
end
