json.user_bookings do
  json.array! @user_bookings,
    :id,
    :start_date,
    :end_date,
    :property_id
end
