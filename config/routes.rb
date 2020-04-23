Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id'               => 'static_pages#property'
  get '/login'                      => 'static_pages#login'
  get '/users/:username'            => 'static_pages#user'
  get '/booking/:id/success'        => 'static_pages#success'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :create, :show, :edit, :update]
    resources :bookings, only: [:create, :destroy]
    resources :charges, only: [:create]

    get '/properties/:id/bookings'        => 'bookings#get_property_bookings'
    get '/authenticated'                  => 'sessions#authenticated'
    get '/users/:user_id/properties'      => 'properties#index_by_user'
    get '/users/:user_id/financials'      => 'properties#index_financials'
    #get '/users/:user_id/bookings'       => 'bookings#index_by_user'
    get '/users/:user_id/bookings'        => 'bookings#index'
    get '/properties'                     => 'properties#index'
    put '/properties/:id'                 => 'properties#update'
    post '/bookings/:id'                  => 'bookings#create'
    post '/properties'                    => 'properties#create'
    delete '/sessions'                    => 'sessions#destroy'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end
end
