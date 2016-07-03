module SidebarHelper
  def user_image imgClass = ''
    "<img class='#{imgClass}' src='http://<%= ENV['api_url'] %>:<%= ENV['api_port'] %>/images/#{@current_user[:attributes][:avatar]}'>"
  end
end
