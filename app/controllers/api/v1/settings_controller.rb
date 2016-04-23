module Api
  module V1
    class SettingsController < ApplicationController
      api :POST, '/settings/sarah-state/:state', 'Set the SARAH listening state'
      description 'Set the SARAH listening state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/sarah-state/active'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Listening state', required: true
      def sarah_state

      end

      api :POST, '/settings/twitter-state/:state', 'Set the Twitter daemon state'
      description 'Set the Twitter daemon state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/twitter-state/sleep'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Daemon state', required: true
      def twitter_state

      end

      api :POST, '/settings/reminders-state/:state', 'Set the Reminders display state'
      description 'Set the Reminders display state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/reminders-state/active'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Reminder display state', required: true
      def reminders_state

      end

      api :POST, '/settings/weather-state/:state', 'Set the weather display state'
      description 'Set the weather display state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/weather-state/active'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Weather display state', required: true
      def weather_state

      end

      private
        def settings_params
          params.required(:settings).permit!(:state)
        end
    end
  end
end
