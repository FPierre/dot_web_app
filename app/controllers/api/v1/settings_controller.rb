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

      api :POST, '/settings/reminder-state/:state', 'Set the Reminder display state'
      description 'Set the Reminder display state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/reminder-state/active'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Reminder display state', required: true
      def alert_state

      end

      api :POST, '/settings/memo-state/:state', 'Set the Memo display state'
      description 'Set the Memo display state if user has the rights'
      example 'curl http://<domain_url>/api/v1/settings/memo-state/active'
      meta client: [:android_application, :web_application], status: :pending
      param :state, [:sleep, :active], desc: 'Memo display state', required: true
      def memo_state

      end
    end
  end
end
