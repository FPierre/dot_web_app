module Api
  module V1
    class SettingsController < ApplicationController
      api :POST, '/settings/listening-state/:state', 'Set the SARAH listening state'
      description 'Set the SARAH listening state if user has the rights'
      param :state, [:sleep, :active], desc: 'Listening state', required: true
      def listening_state

      end
    end
  end
end
