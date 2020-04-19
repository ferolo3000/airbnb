json.user_bookings do
  json.array! @user_bookings,
    :id,
    :title,
    :city,
    :country,
    :image_url
end
