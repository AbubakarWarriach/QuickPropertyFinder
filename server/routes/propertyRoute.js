const app = require('express');
const route = app.Router();
const {
    addProperty, fetchProperties, fetchProperty,
    updatePropertyFeatures, updatePropertyImage, fetchHomes,
    fetchPlots, fetch_Homes_With_Pagination, propertyDisable,
    fetchClientSearch, fetch_Plots_With_Pagination, propertyReserve,propertyFetchSearchProperties
} = require('../controlers/propertyControler');
const auth = require('../utils/auth');
route.post('/add_property', auth, addProperty);

// fetch properties for property dealer dashboard....
route.get("/fetch_properties/:id/:page", auth, fetchProperties);

// fetch property for property dealer client showing ....
route.get("/fetch_property/:id", fetchProperty);
route.post("/update_property_details/:id", auth, updatePropertyFeatures);
route.post("/update_property_image/:id", auth, updatePropertyImage);

// fetch Homes properties for showing Home page....
route.get("/fetch_homes", fetchHomes);

// fetch Plots properties for showing Home page....
route.get("/fetch_plots", fetchPlots);

// fetch Plots properties for showing Plots page....
route.get("/fetch_plots_with_pagination/:page", fetch_Plots_With_Pagination);

// fetch Homes properties for showing Plots page....
route.get("/fetch_homes_with_pagination/:page", fetch_Homes_With_Pagination);

// end point of user search....
route.post("/fetch_client_search/:page", fetchClientSearch);

// end point of property reserve....
route.post("/property_reserve", propertyReserve);

// end point of property disable....
route.post("/property_disable", propertyDisable);

route.get("/fetch_search_properties", propertyFetchSearchProperties)

module.exports = route;