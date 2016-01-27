class RoutesController < ApplicationController
  acts_as_token_authentication_handler_for User

  def show
    if params[:from].present? && params[:to].present?
      from = Geocoder.search params[:from]
      to   = Geocoder.search params[:to]

      @from = from.first.data['geometry']['location']
      @to = to.first.data['geometry']['location']
    end
  end
end
