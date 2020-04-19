json.user_properties do
  json.array! @user_properties,
    :id,
    :title,
    :property_type,
    :city,
    :country,
    :image_url

end
