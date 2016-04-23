class Users::RegistrationsController < Devise::RegistrationsController
  resource_description do
    resource_id 'Users'
  end

  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  api :GET, '/users/sign_up', 'Display the form for create an User'
  show false
  def new
    super
  end

  # api :POST, '/users', 'Create an User'
  # # description ''
  # # error code: 400, desc: 'Bad request'
  # # example 'curl http://<domain_url>/api/v1/dashboard/path/from/paris/to/lyon'
  # meta client: [:android_application, :web_application], status: :pending
  # # param :from, String, desc: 'Departure city', required: true
  # def create
  #   super do |resource|
  #     avatar = Avatarly.generate_avatar resource.email, size: 256

  #     File.open("public/images/#{resource.email.parameterize}.png", 'wb') do |f|
  #       f.write avatar
  #     end

  #     resource.update avatar: File.new("public/images/#{resource.email.parameterize}.png")
  #   end
  # end

  api :GET, '/users/edit', 'Display the form for edit an User'
  show false
  def edit
    super
  end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
