json.user_properties do
  json.array! @user_properties,
    :id,
    :title,
    :property_type,
    :city,
    :country,
    :description,
    :property_type,
    :price_per_night,
    :max_guests,
    :bedrooms,
    :beds,
    :baths,
    :image_url

end
