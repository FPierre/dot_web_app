module Api
  module V1
    class DashboardController < ApplicationController
      api :GET, '/dashboard/path/from/:from/to/:to', 'Display the path between two cities'
      description 'Request Google API to get the car path between the city "from" and the other city "to"'
      param :from, String, desc: 'Departure city', required: true
      param :to, String, desc: 'Arrival city', required: true
      meta target: :sarah, status: 'ok'
      # show false
      def path
        if params[:from].blank? || params[:to].blank?
          render json: { status: :bad_request, message: "Absence du paramètre from ou to" }
        end

        from = Geocoder.search params[:from]
        to = Geocoder.search params[:to]

        if from.blank? || to.blank?
          render json: { status: :bad_request, message: "Erreur lors de la recherche de l'itinéraire" }
        end

        path = {
          from: from&.first&.data['geometry']['location'],
          to: to&.first&.data['geometry']['location']
        }

        render head :ok
      end
    end
  end
end
