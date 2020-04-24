class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def user
    @data = { username_id: params[:username] }.to_json
    puts "----------------------------------"
    puts @data
    render 'user'
  end

  def success
    @data = { property_id: params[:id] }.to_json
    render 'success'
  end

end
