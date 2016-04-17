class RoutesController < ApplicationController
  acts_as_token_authentication_handler_for User

  api :GET, '/resize/zone/:zone/size/:size', 'Resize the zone'
  description 'Get a document if user has the rights'
  param :zone, [:one, :two], desc: 'Zone ID', required: true
  param :size, [:full, :half], desc: 'Size', required: true
  def show
    if params[:from].present? && params[:to].present?
      from = Geocoder.search params[:from]
      to   = Geocoder.search params[:to]

      @from = from.first.data['geometry']['location']
      @to = to.first.data['geometry']['location']
    end
  end
end
