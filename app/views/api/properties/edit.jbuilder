json.property do
  json.id     @property.id
  json.title   @property.title
  json.description @property.description
  json.city       @property.city
  json.country    @property.country
  json.property_type  @property.property_type
  json.image_url      @property.image_url
  json.price_per_night @property.price_per_night
  json.max_guests       @property.max_guests
  json.bedrooms     @property.bedrooms
  json.beds       @property.beds
  json.baths      @property.baths
end