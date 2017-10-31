var map;
var markers = [];
var polygon = null;
function initMap() {
  var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    }
  ];
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.2904976, lng: -80.1100212},
    zoom: 3,
    styles: styles,
    mapTypeControl: false
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
  heatmap.set('radius',20);
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', gradient);

  function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);

  }

  var locations = [
      {"name": "Park Ave Penthouse", "latitude": 40.7713024, "longitude": -73.9632393},
    /*    {name: 'Chelsea Loft', lat: 40.7444883, lng: -73.9949465},
      {name: 'Union Square Open Floor Plan', lat: 40.7347062, lng: -73.9895759},
      {name: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {name: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {name: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}, */
      {"business_id": "kFtuYklkAIlmYw8RZAieGw", "name": "JAB Jewelry Designs", "neighborhood": "", "address": "3220 Washington Rd", "city": "McMurray", "state": "PA", "postal_code": "15317", "latitude": 40.2904976, "longitude": -80.1100212, "stars": 5.0, "review_count": 7, "is_open": 1, "attributes": {"DogsAllowed": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "ByAppointmentOnly": false, "WheelchairAccessible": true}, "categories": ["Jewelry Repair", "Gold Buyers", "Local Services", "Shopping", "Appraisal Services", "Jewelry"], "hours": {"Monday": "10:00-18:00", "Tuesday": "10:00-18:00", "Friday": "10:00-18:00", "Wednesday": "10:00-20:00", "Thursday": "10:00-20:00", "Saturday": "10:00-16:00"}},
      {"business_id": "NqiQdFa93wzUJGo29NbTPQ", "name": "Neighborhood Vision Center", "neighborhood": "", "address": "1425 S Higley Rd, Ste 103", "city": "Gilbert", "state": "AZ", "postal_code": "85296", "latitude": 33.3245392, "longitude": -111.7204486, "stars": 5.0, "review_count": 8, "is_open": 1, "attributes": {"AcceptsInsurance": true, "ByAppointmentOnly": true, "BusinessAcceptsCreditCards": true}, "categories": ["Health & Medical", "Optometrists"], "hours": {"Friday": "7:30-11:00", "Tuesday": "7:30-17:00", "Thursday": "7:30-17:00", "Wednesday": "7:30-17:00", "Monday": "7:30-17:00"}},
      {"business_id": "N9BN9ldVl1FNzcB9_eAstw", "name": "Red Rock Bowling UYE Part 2", "neighborhood": "Summerlin", "address": "11022 W Charleston Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89135", "latitude": 36.1590984, "longitude": -115.3379148, "stars": 4.5, "review_count": 13, "is_open": 1, "attributes": {"BusinessAcceptsCreditCards": true, "GoodForKids": true, "BusinessParking": {"garage": true, "street": false, "validated": false, "lot": false, "valet": false}, "BikeParking": true}, "categories": ["Bowling", "Active Life"], "hours": {}},
      {"business_id": "BmSJ6C7Y9s3tHotRetVbmA", "name": "U.S. Bank", "neighborhood": "Southeast", "address": "2385 E Windmill Ln", "city": "Las Vegas", "state": "NV", "postal_code": "89123", "latitude": 36.0404133, "longitude": -115.119104, "stars": 3.5, "review_count": 3, "is_open": 1, "attributes": {}, "categories": ["Financial Services", "Banks & Credit Unions"], "hours": {"Monday": "10:00-19:00", "Tuesday": "10:00-19:00", "Friday": "10:00-19:00", "Wednesday": "10:00-19:00", "Thursday": "10:00-19:00", "Sunday": "12:00-16:00", "Saturday": "10:00-16:00"}},
      {"business_id": "xmY0pzNvZKEzuN0XEqeV5w", "name": "QQ Foot Spa", "neighborhood": "", "address": "6162 W Flamingo Rd", "city": "Las Vegas", "state": "NV", "postal_code": "89103", "latitude": 36.115465, "longitude": -115.226764, "stars": 4.5, "review_count": 20, "is_open": 1, "attributes": {"BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "AcceptsInsurance": false, "ByAppointmentOnly": false, "WheelchairAccessible": false}, "categories": ["Massage", "Beauty & Spas", "Reflexology", "Health & Medical"], "hours": {"Monday": "10:00-0:00", "Tuesday": "10:00-0:00", "Friday": "10:00-0:00", "Wednesday": "10:00-0:00", "Thursday": "10:00-0:00", "Sunday": "10:00-0:00", "Saturday": "10:00-0:00"}},
      {"business_id": "45arahaS6jTtYBw_STLDXg", "name": "Wells Fargo Bank", "neighborhood": "Summerlin", "address": "9410 W Lake Mead Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89134", "latitude": 36.206763, "longitude": -115.3007233, "stars": 2.5, "review_count": 4, "is_open": 1, "attributes": {}, "categories": ["Financial Services", "Banks & Credit Unions"], "hours": {"Monday": "9:00-17:00", "Tuesday": "9:00-17:00", "Friday": "9:00-18:00", "Wednesday": "9:00-17:00", "Thursday": "9:00-17:00", "Saturday": "10:00-14:00"}},
      {"business_id": "LDMCrFlGIFUN6L-FEFgzWg", "name": "El Pollo Loco", "neighborhood": "", "address": "2400 E Lake Mead Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89030", "latitude": 36.1962026, "longitude": -115.1167987, "stars": 3.0, "review_count": 12, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": false, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "DriveThru": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Restaurants", "American (Traditional)", "Mexican", "Fast Food"], "hours": {"Monday": "9:00-23:00", "Tuesday": "9:00-23:00", "Friday": "9:00-23:00", "Wednesday": "9:00-23:00", "Thursday": "9:00-23:00", "Sunday": "9:00-23:00", "Saturday": "9:00-23:00"}},
      {"business_id": "LDMCrFlGIFUN6L-FEFgzWg", "name": "El Pollo Loco", "neighborhood": "", "address": "2400 E Lake Mead Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89030", "latitude": 36.1962026, "longitude": -115.1167987, "stars": 3.0, "review_count": 12, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": false, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "DriveThru": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Restaurants", "American (Traditional)", "Mexican", "Fast Food"], "hours": {"Monday": "9:00-23:00", "Tuesday": "9:00-23:00", "Friday": "9:00-23:00", "Wednesday": "9:00-23:00", "Thursday": "9:00-23:00", "Sunday": "9:00-23:00", "Saturday": "9:00-23:00"}},
      {"business_id": "QTH_XGh4rWYdd0fTW-tUDw", "name": "Baja Fresh Mexican Grill", "neighborhood": "Spring Valley", "address": "4190 S Rainbow Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89103", "latitude": 36.1125192, "longitude": -115.2426053, "stars": 3.5, "review_count": 7, "is_open": 0, "attributes": {"RestaurantsPriceRange2": 1, "RestaurantsAttire": "casual", "Alcohol": "none", "RestaurantsReservations": false}, "categories": ["Mexican", "Restaurants"], "hours": {}},
      {"business_id": "Oto60yDwk1z72WmfWEYrjg", "name": "Baja Miguel's", "neighborhood": "Southeast", "address": "South Point Hotel & Casino, 9777 S Las Vegas Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89183", "latitude": 36.0121912, "longitude": -115.1739932, "stars": 3.0, "review_count": 175, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "full_bar", "Caters": false, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": false, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "WheelchairAccessible": true, "BusinessParking": {"garage": true, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Food", "Restaurants", "Mexican"], "hours": {"Sunday": "11:00-23:00", "Wednesday": "10:00-23:00", "Thursday": "10:00-23:00", "Saturday": "11:00-23:00"}},
      {"business_id": "mUk-0jToBuzk4KaDXp-uew", "name": "Taza Indian Kitchen", "neighborhood": "Southeast", "address": "9530 S Eastern Ave", "city": "Las Vegas", "state": "NV", "postal_code": "89123", "latitude": 36.0165803, "longitude": -115.1187014, "stars": 3.0, "review_count": 17, "is_open": 0, "attributes": {"GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "beer_and_wine", "RestaurantsGoodForGroups": true, "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "RestaurantsTableService": true, "RestaurantsDelivery": false, "RestaurantsTakeOut": true, "GoodForKids": true, "WheelchairAccessible": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}}, "categories": ["Indian", "Pakistani", "Restaurants"], "hours": {}},
      {"business_id": "gduTP-ujJ89tWOSdb3WMPA", "name": "Winchell's Donut House", "neighborhood": "Southwest", "address": "8110 W Warm Springs Rd", "city": "Las Vegas", "state": "NV", "postal_code": "89113", "latitude": 36.0559407, "longitude": -115.2680339, "stars": 3.5, "review_count": 31, "is_open": 1, "attributes": {"BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "Caters": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsTakeOut": true}, "categories": ["Donuts", "Food"], "hours": {"Monday": "0:00-0:00", "Tuesday": "0:00-0:00", "Friday": "0:00-0:00", "Wednesday": "0:00-0:00", "Thursday": "0:00-0:00", "Sunday": "0:00-0:00", "Saturday": "0:00-0:00"}},
      {"business_id": "TYGVaav4hWZioQlk9Ig78A", "name": "Cody's Smokin' Barbecue", "neighborhood": "Downtown", "address": "1675 S Industrial Rd", "city": "Las Vegas", "state": "NV", "postal_code": "89102", "latitude": 36.1510984, "longitude": -115.1598044, "stars": 4.5, "review_count": 70, "is_open": 0, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": true}, "Alcohol": "full_bar", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "RestaurantsDelivery": true, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": true, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": false, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}}, "categories": ["Restaurants", "Barbeque"], "hours": {"Friday": "11:00-19:00", "Tuesday": "11:00-19:00", "Thursday": "11:00-19:00", "Wednesday": "11:00-19:00", "Monday": "11:00-19:00"}},
      {"business_id": "Wbi-x-1Nbn6LFCMOSN6F5Q", "name": "Cafe Rio", "neighborhood": "Centennial", "address": "6575 N Decatur Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89131", "latitude": 36.2794672, "longitude": -115.2080128, "stars": 2.5, "review_count": 189, "is_open": 1, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": false, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}}, "categories": ["Restaurants", "Mexican"], "hours": {}},
      {"business_id": "rihKlAiPgJa5XcpZ1h9-bw", "name": "KFC", "neighborhood": "Centennial", "address": "5930 Centennial Center Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89149", "latitude": 36.2707001, "longitude": -115.263, "stars": 1.5, "review_count": 45, "is_open": 1, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": false, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "DriveThru": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Fast Food", "Chicken Wings", "Restaurants"], "hours": {"Monday": "10:00-22:00", "Tuesday": "10:00-22:00", "Friday": "10:00-22:00", "Wednesday": "10:00-22:00", "Thursday": "10:00-22:00", "Sunday": "10:00-22:00", "Saturday": "10:00-22:00"}},
      {"business_id": "cGHdjkXa2n9B2apkicdCXQ", "name": "The Coffee Bean & Tea Leaf", "neighborhood": "Summerlin", "address": "10834 W Charleston Blvd, Ste 200", "city": "Las Vegas", "state": "NV", "postal_code": "89135", "latitude": 36.1611321711, "longitude": -115.331700319, "stars": 4.0, "review_count": 81, "is_open": 1, "attributes": {"BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "Caters": false, "WiFi": "free", "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsTakeOut": true, "WheelchairAccessible": true}, "categories": ["Food", "Coffee & Tea"], "hours": {"Monday": "5:00-21:00", "Tuesday": "5:00-21:00", "Friday": "5:00-21:00", "Wednesday": "5:00-21:00", "Thursday": "5:00-21:00", "Sunday": "5:00-20:30", "Saturday": "5:30-21:30"}},
      {"business_id": "vjLgZg0DH_9xwcujFNb0pA", "name": "BJ's Buffet", "neighborhood": "", "address": "4945 W Tropicana Ave", "city": "Las Vegas", "state": "NV", "postal_code": "89103", "latitude": 36.099494, "longitude": -115.2083645, "stars": 1.5, "review_count": 35, "is_open": 0, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Restaurants", "Buffets"], "hours": {}},
      {"business_id": "y-O3h7CV6X6P5ey1ZFcQwA", "name": "Murdock Meals", "neighborhood": "Spring Valley", "address": "", "city": "Las Vegas", "state": "NV", "postal_code": "89148", "latitude": 36.0612353, "longitude": -115.2896852, "stars": 5.0, "review_count": 6, "is_open": 1, "attributes": {"BusinessAcceptsCreditCards": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "RestaurantsPriceRange2": 1, "RestaurantsTableService": false, "BikeParking": false}, "categories": ["Health & Medical", "Food Delivery Services", "American (New)", "Restaurants", "Specialty Food", "Health Markets", "Home Services", "Desserts", "Weight Loss Centers", "Food"], "hours": {"Monday": "7:00-19:00", "Tuesday": "7:00-19:00", "Friday": "7:00-19:00", "Wednesday": "7:00-19:00", "Thursday": "7:00-19:00", "Sunday": "7:00-19:00", "Saturday": "7:00-19:00"}},
      {"business_id": "hMe7hiCo90jnMXyzmPnO6Q", "name": "Alfonso's Mexican Food", "neighborhood": "", "address": "5725 Losee Rd", "city": "North Las Vegas", "state": "NV", "postal_code": "89031", "latitude": 36.2603405, "longitude": -115.1171278, "stars": 2.0, "review_count": 4, "is_open": 0, "attributes": {"BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}, "HasTV": true, "NoiseLevel": "average", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "BusinessAcceptsCreditCards": true}, "categories": ["Restaurants", "Mexican"], "hours": {}},
      {"business_id": "cNd3G6WB3D8BUp46UX-J1A", "name": "Midway Bar at Hard Rock", "neighborhood": "Eastside", "address": "4455 Paradise Rd", "city": "Las Vegas", "state": "NV", "postal_code": "89169", "latitude": 36.1100828, "longitude": -115.1538714, "stars": 3.5, "review_count": 3, "is_open": 1, "attributes": {"BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Nightlife"], "hours": {}},
      {"business_id": "eS76100l3h7Ollb5s3_M4A", "name": "Mad House Coffee", "neighborhood": "Southeast", "address": "8899 S Eastern Ave", "city": "Las Vegas", "state": "NV", "postal_code": "89123", "latitude": 36.0280675, "longitude": -115.1189137, "stars": 4.0, "review_count": 214, "is_open": 1, "attributes": {"GoodForMeal": {"dessert": true, "latenight": false, "lunch": true, "dinner": false, "breakfast": true, "brunch": true}, "Alcohol": "none", "Caters": true, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "loud", "WiFi": "paid", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "ByAppointmentOnly": false, "WheelchairAccessible": true, "RestaurantsTableService": false}, "categories": ["Bagels", "Breakfast & Brunch", "Restaurants", "Coffee & Tea", "Juice Bars & Smoothies", "Bakeries", "Food"], "hours": {"Monday": "6:00-20:00", "Tuesday": "6:00-20:00", "Friday": "6:00-20:00", "Wednesday": "6:00-20:00", "Thursday": "6:00-20:00", "Sunday": "7:00-17:00", "Saturday": "6:00-20:00"}},
      {"business_id": "REJPrXEZly4PDQNmiMGI8Q", "name": "Robertos Taco Shop", "neighborhood": "Northwest", "address": "10030 W Cheyenne Ave, Ste130", "city": "Las Vegas", "state": "NV", "postal_code": "89129", "latitude": 36.2186971729, "longitude": -115.313933321, "stars": 3.0, "review_count": 51, "is_open": 1, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": false, "breakfast": true, "brunch": false}, "Alcohol": "none", "Caters": false, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "ByAppointmentOnly": false, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}}, "categories": ["Mexican", "Food", "Restaurants", "Specialty Food", "Tacos"], "hours": {}},
      {"business_id": "YQ--LJ7pvjiDSqNv0TuKTQ", "name": "Grimaldi's Pizzeria", "neighborhood": "The Strip", "address": "3327 Las Vegas Blvd S, Ste 2710", "city": "Las Vegas", "state": "NV", "postal_code": "89109", "latitude": 36.1248767264, "longitude": -115.169034004, "stars": 4.0, "review_count": 738, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "full_bar", "Caters": false, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": false, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": true, "street": false, "validated": false, "lot": false, "valet": true}}, "categories": ["Restaurants", "Pizza"], "hours": {"Monday": "11:00-0:00", "Tuesday": "11:00-0:00", "Friday": "11:00-2:00", "Wednesday": "11:00-0:00", "Thursday": "11:00-0:00", "Sunday": "11:00-0:00", "Saturday": "11:00-2:00"}},
      {"business_id": "4hG2j_ibsNblDgqei05U_g", "name": "Social House", "neighborhood": "The Strip", "address": "Crystals Mall City Center, 3720 Las Vegas Blvd S", "city": "Las Vegas", "state": "NV", "postal_code": "89158", "latitude": 36.108713, "longitude": -115.173192, "stars": 4.0, "review_count": 579, "is_open": 0, "attributes": {"Alcohol": "full_bar", "HasTV": false, "NoiseLevel": "average", "RestaurantsAttire": "casual", "BusinessAcceptsCreditCards": true, "Music": {"dj": false, "background_music": true, "no_music": false, "karaoke": false, "live": false, "video": false, "jukebox": false}, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": true, "upscale": false, "casual": false}, "RestaurantsGoodForGroups": true, "BYOBCorkage": "no", "Caters": false, "WiFi": "no", "RestaurantsReservations": true, "BYOB": false, "BikeParking": false, "RestaurantsTakeOut": true, "GoodForKids": false, "HappyHour": true, "GoodForDancing": false, "RestaurantsTableService": true, "OutdoorSeating": false, "RestaurantsPriceRange2": 3, "RestaurantsDelivery": false, "BestNights": {"monday": false, "tuesday": false, "friday": true, "wednesday": false, "thursday": true, "sunday": false, "saturday": true}, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": true, "breakfast": false, "brunch": false}, "BusinessParking": {"garage": true, "street": false, "validated": false, "lot": false, "valet": true}, "CoatCheck": false, "Smoking": "no", "WheelchairAccessible": true, "RestaurantsCounterService": true}, "categories": ["Japanese", "Lounges", "Bars", "Nightlife", "Asian Fusion", "Restaurants"], "hours": {"Monday": "12:00-22:00", "Tuesday": "12:00-22:00", "Friday": "12:00-23:00", "Wednesday": "12:00-22:00", "Thursday": "12:00-22:00", "Sunday": "12:00-22:00", "Saturday": "12:00-23:00"}},
      {"business_id": "_XM07jbQGliVPwnAfyyGUA", "name": "Yafo Kosher Restaurant", "neighborhood": "The Strip", "address": "3049 S Las Vegas Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89109", "latitude": 36.1314439, "longitude": -115.1648858, "stars": 3.0, "review_count": 4, "is_open": 0, "attributes": {"GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "RestaurantsTableService": true, "RestaurantsDelivery": true, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Kosher", "Restaurants"], "hours": {}},
      {"business_id": "mVIU34pAjLCmRpftGPaH1A", "name": "Dee's Donuts", "neighborhood": "Southwest", "address": "8680 W Warm Springs Rd", "city": "Las Vegas", "state": "NV", "postal_code": "89148", "latitude": 36.055627, "longitude": -115.2804128, "stars": 4.0, "review_count": 32, "is_open": 0, "attributes": {"BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "WheelchairAccessible": true}, "categories": ["Donuts", "Food"], "hours": {"Monday": "6:00-14:00", "Tuesday": "6:00-14:00", "Friday": "6:00-19:00", "Wednesday": "6:00-14:00", "Thursday": "6:00-19:00", "Sunday": "6:00-15:00", "Saturday": "6:00-18:00"}},
      {"business_id": "LtO6vTBfYzlgWArn3kRe_A", "name": "Tacos El Gordo", "neighborhood": "", "address": "3260 Losee Rd", "city": "North Las Vegas", "state": "NV", "postal_code": "89030", "latitude": 36.2186522367, "longitude": -115.125405192, "stars": 4.0, "review_count": 287, "is_open": 1, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": true, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": false, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "WheelchairAccessible": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}}, "categories": ["Mexican", "Restaurants"], "hours": {"Monday": "10:00-2:00", "Tuesday": "10:00-2:00", "Friday": "10:00-4:00", "Wednesday": "10:00-2:00", "Thursday": "10:00-2:00", "Sunday": "10:00-2:00", "Saturday": "10:00-4:00"}},
      {"business_id": "1uDUisf3ro5V3vC60cxfFw", "name": "Mr. Cooker", "neighborhood": "", "address": "", "city": "Las Vegas", "state": "NV", "postal_code": "89044", "latitude": 35.9208835, "longitude": -115.1652008, "stars": 4.5, "review_count": 44, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": false, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Latin American", "Food", "Restaurants", "Food Trucks", "Venezuelan"], "hours": {"Monday": "11:30-20:00", "Tuesday": "11:30-20:00", "Friday": "11:30-20:00", "Wednesday": "11:30-20:00", "Thursday": "11:30-20:00", "Sunday": "11:30-20:00", "Saturday": "11:30-20:00"}},
      {"business_id": "DzshamutZ350laV6Ji9xFQ", "name": "Cafe de Cebu", "neighborhood": "Chinatown", "address": "3399 S Jones Blvd", "city": "Las Vegas", "state": "NV", "postal_code": "89146", "latitude": 36.1278425, "longitude": -115.225183, "stars": 3.0, "review_count": 84, "is_open": 1, "attributes": {"Alcohol": "beer_and_wine", "HasTV": true, "NoiseLevel": "average", "RestaurantsAttire": "casual", "BusinessAcceptsCreditCards": true, "Music": {"dj": false, "background_music": false, "no_music": false, "karaoke": false, "live": true, "video": false, "jukebox": false}, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": true, "upscale": false, "casual": false}, "RestaurantsGoodForGroups": true, "Caters": true, "WiFi": "free", "RestaurantsReservations": true, "BusinessAcceptsBitcoin": false, "BikeParking": true, "RestaurantsTakeOut": true, "GoodForKids": true, "HappyHour": true, "GoodForDancing": true, "DogsAllowed": true, "RestaurantsTableService": true, "OutdoorSeating": false, "RestaurantsPriceRange2": 2, "RestaurantsDelivery": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": true}, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "CoatCheck": false, "Smoking": "no", "WheelchairAccessible": true}, "categories": ["Restaurants", "Karaoke", "Nightlife", "Hawaiian", "Filipino", "Seafood"], "hours": {"Monday": "16:00-22:00", "Tuesday": "11:00-1:00", "Friday": "11:00-1:00", "Wednesday": "11:00-1:00", "Thursday": "11:00-23:00", "Sunday": "11:00-0:00", "Saturday": "11:00-1:00"}},

      {"business_id": "EPkV2_H0TRcARa-2IFZ-2A", "name": "Papa John's Pizza", "neighborhood": "", "address": "524 W Broadway Rd", "city": "Tempe", "state": "AZ", "postal_code": "85282", "latitude": 33.4080579, "longitude": -111.9469356, "stars": 2.0, "review_count": 3, "is_open": 1, "attributes": {}, "categories": ["Pizza", "Restaurants"], "hours": {}},
      {"business_id": "K8ZeT5Y5L0SDh18wO0ZOAQ", "name": "Famous Potato", "neighborhood": "", "address": "425 S Mill Ave", "city": "Tempe", "state": "AZ", "postal_code": "85281", "latitude": 33.425763, "longitude": -111.939614, "stars": 1.5, "review_count": 8, "is_open": 0, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "none", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": false, "NoiseLevel": "quiet", "WiFi": "free", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "RestaurantsDelivery": true, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Fruits & Veggies", "Food Delivery Services", "Food", "Greek", "Comfort Food", "Restaurants", "Specialty Food"], "hours": {"Monday": "10:00-23:30", "Tuesday": "10:00-23:30", "Friday": "10:00-3:00", "Wednesday": "10:00-23:30", "Thursday": "10:00-23:30", "Sunday": "10:00-21:00", "Saturday": "10:00-3:00"}},
      {"business_id": "kZxFQvjgaMnAxFDkK1bfxA", "name": "Cold Stone Creamery", "neighborhood": "", "address": "3330 S Mcclintock Dr, Ste 1", "city": "Tempe", "state": "AZ", "postal_code": "85282", "latitude": 33.3916359331, "longitude": -111.909659764, "stars": 3.5, "review_count": 15, "is_open": 1, "attributes": {"BusinessParking": {"garage": false, "street": false, "validated": false, "lot": true, "valet": false}, "Caters": true, "WiFi": "no", "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsTakeOut": true, "WheelchairAccessible": true}, "categories": ["Ice Cream & Frozen Yogurt", "Juice Bars & Smoothies", "Food"], "hours": {"Monday": "11:00-22:00", "Tuesday": "11:00-22:00", "Friday": "11:00-23:00", "Wednesday": "11:00-22:00", "Thursday": "11:00-22:00", "Sunday": "11:00-22:00", "Saturday": "11:00-23:00"}},
      {"business_id": "0-TtzWmjREl7lIKDcmGONQ", "name": "Mango Flats", "neighborhood": "", "address": "5500 S Mill Ave", "city": "Tempe", "state": "AZ", "postal_code": "85283", "latitude": 33.3714095, "longitude": -111.9392497, "stars": 2.5, "review_count": 5, "is_open": 1, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "beer_and_wine", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "quiet", "WiFi": "free", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": true, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "RestaurantsDelivery": true, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Noodles", "Food", "Restaurants", "Food Trucks"], "hours": {}},
      {"business_id": "XvYwUnuWEai7p-95cj8S1w", "name": "Barro's Pizza", "neighborhood": "", "address": "8830 S Kyrene Rd, Ste 106", "city": "Tempe", "state": "AZ", "postal_code": "85284", "latitude": 33.3334387, "longitude": -111.9477553, "stars": 3.5, "review_count": 30, "is_open": 1, "attributes": {"RestaurantsTableService": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": false, "breakfast": false, "brunch": false}, "Alcohol": "beer_and_wine", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 1, "BikeParking": true, "RestaurantsDelivery": true, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": false}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Italian", "Pizza", "Restaurants", "Sandwiches"], "hours": {"Monday": "10:30-22:00", "Tuesday": "10:30-22:00", "Friday": "10:30-23:00", "Wednesday": "10:30-22:00", "Thursday": "10:30-22:00", "Sunday": "10:30-22:00", "Saturday": "10:30-23:00"}},
      {"business_id": "PQTtKaBK_WdvLm-zp4fQ1g", "name": "Aachi Southindian Kitchen", "neighborhood": "", "address": "325 W Elliot Rd, Ste 101", "city": "Tempe", "state": "AZ", "postal_code": "85284", "latitude": 33.348750911, "longitude": -111.944757559, "stars": 4.0, "review_count": 29, "is_open": 0, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": false, "breakfast": false, "brunch": false}, "DogsAllowed": false, "Alcohol": "none", "Caters": true, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "free", "RestaurantsAttire": "casual", "RestaurantsReservations": false, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "WheelchairAccessible": true, "BusinessParking": {"garage": false, "street": false, "validated": true, "lot": false, "valet": false}}, "categories": ["Shopping", "Indian", "Restaurants"], "hours": {"Tuesday": "11:00-14:30", "Friday": "11:00-15:00", "Wednesday": "11:00-14:30", "Thursday": "11:00-14:30", "Sunday": "17:00-21:00", "Saturday": "17:00-22:00"}},




    ];
  var largeInfowindow = new google.maps.InfoWindow();
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    }
  });
  var defaultIcon = makeMarkerIcon('0091ff');

  var highlightedIcon = makeMarkerIcon('FFFF24');
  for (var i = 0; i < locations.length; i++) {
    var position = {lat: locations[i].latitude, lng: locations[i].longitude};
    var title = locations[i].name;
    var stars = locations[i].stars;
    var review = locations[i].review_count;
    var city = locations[i].city;
    console.log(position);
    console.log(title);
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      rating: stars,
      review: review,
      city: city,
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
  document.getElementById('toggle-drawing').addEventListener('click', function() {
    toggleDrawing(drawingManager);
  });

  document.getElementById('zoom-to-area').addEventListener('click', function() {
    zoomToArea();
  });

  drawingManager.addListener('overlaycomplete', function(event) {
    if (polygon) {
      polygon.setMap(null);
      hideListings(markers);
    }
    drawingManager.setDrawingMode(null);
    polygon = event.overlay;
    polygon.setEditable(true);
    searchWithinPolygon();
    polygon.getPath().addListener('set_at', searchWithinPolygon);
    polygon.getPath().addListener('insert_at', searchWithinPolygon);
  });
}

function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.setContent('');
    infowindow.marker = marker;
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;

    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
          infowindow.setContent('<div>' + marker.title + marker.rating
              + marker.review + marker.city +'</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }

    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    infowindow.open(map, marker);
  }
}
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function toggleDrawing(drawingManager) {
  if (drawingManager.map) {
    drawingManager.setMap(null);
    if (polygon !== null) {
      polygon.setMap(null);
    }
  } else {
    drawingManager.setMap(map);
  }
}
function searchWithinPolygon() {
  for (var i = 0; i < markers.length; i++) {
    if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
}

function zoomToArea() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('zoom-to-area-text').value;
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } else {
    geocoder.geocode(
      { address: address
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(12);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
  }
}

function getPoints() {
  return [
    new google.maps.LatLng(37.782551, -122.445368),
    new google.maps.LatLng(37.782745, -122.444586),
    new google.maps.LatLng(37.782842, -122.443688),
    new google.maps.LatLng(37.782919, -122.442815),
    new google.maps.LatLng(37.782992, -122.442112),
    new google.maps.LatLng(37.783100, -122.441461),
    new google.maps.LatLng(37.783206, -122.440829),
    new google.maps.LatLng(37.783273, -122.440324),
    new google.maps.LatLng(37.783316, -122.440023),
    new google.maps.LatLng(37.756335, -122.403719),
    new google.maps.LatLng(37.755503, -122.403406),
    new google.maps.LatLng(37.754665, -122.403242),
    new google.maps.LatLng(37.753837, -122.403172),
    new google.maps.LatLng(37.752986, -122.403112),
    new google.maps.LatLng(37.751266, -122.403355)
  ];
}



