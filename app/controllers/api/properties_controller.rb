module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = user.property.new(property_params)

      render 'api/properties/create'
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @properties = user.properties
        render 'api/properties/index'
      end
    end

    private

     def property_params
       params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests,
          :bedrooms, :beds, :baths, :image_url)
     end
  end
end
