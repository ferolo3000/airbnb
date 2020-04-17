json.properties_listing do
    json.array! @properties_listing, 
                :id, 
                :start_date, 
                :end_date, 
                :complete, 
                :property_id, 
                :title, 
                :description, 
                :image_url,
                :username,
                :email
end