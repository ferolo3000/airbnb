json.user_properties do
  json.array! @user_properties,
    :id,
    :user,
    :title,
    :city,
    :country,
    :image_url

end
