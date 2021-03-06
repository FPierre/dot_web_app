class TestsController < ApplicationController
  before_action :authenticate, :authorize
  before_action -> { @dot_api_connector = DotApiConnector.new(@current_user[:attributes]) }

  def voice
    @dot_api_connector.voice(test_params)
  end

  private
    def test_params
      params.permit :text
    end
end
