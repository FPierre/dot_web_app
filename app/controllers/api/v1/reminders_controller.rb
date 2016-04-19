module Api
  module V1
    class RemindersController < ApplicationController
      acts_as_token_authentication_handler_for User, fallback: :none

      before_action :set_reminder, only: [:show, :edit, :update, :destroy]

      def index
        @reminders = Reminder.all
      end

      def show
      end

      def new
        @reminder = Reminder.new
      end

      def edit
      end

      def create
        @reminder = Reminder.new(reminder_params)

        respond_to do |format|
          if @reminder.save
            format.html { redirect_to @reminder, notice: 'Reminder was successfully created.' }
            format.json { render :show, status: :created, location: @reminder }
          else
            format.html { render :new }
            format.json { render json: @reminder.errors, status: :unprocessable_entity }
          end
        end
      end

      def update
        respond_to do |format|
          if @reminder.update(reminder_params)
            format.html { redirect_to @reminder, notice: 'Reminder was successfully updated.' }
            format.json { render :show, status: :ok, location: @reminder }
          else
            format.html { render :edit }
            format.json { render json: @reminder.errors, status: :unprocessable_entity }
          end
        end
      end

      def destroy
        @reminder.destroy
        respond_to do |format|
          format.html { redirect_to reminders_url, notice: 'Reminder was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      private
        def set_reminder
          @reminder = Reminder.find(params[:id])
        end

        def reminder_params
          params.require(:reminder).permit(:title, :content, :user_id)
        end
    end
  end
end
