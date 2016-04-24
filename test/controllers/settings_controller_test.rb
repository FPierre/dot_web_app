class SettingsControllerTest < ActionController::TestCase
  test 'reminders state with token authentication via query params' do
    post :api_v1_reminders_state, { user_email: 'pflauder@gmail.com', user_token: 'PmCh8ixSKhytH7xyGoXu' }
    assert_response :success
  end

  # test 'index with token authentication via request headers' do
  #   @request.headers['X-User-Email'] = 'alice@example.com'
  #   @request.headers['X-User-Token'] = '1G8_s7P-V-4MGojaKD7a'

  #   get :index
  #   assert_response :success
  # end
end
