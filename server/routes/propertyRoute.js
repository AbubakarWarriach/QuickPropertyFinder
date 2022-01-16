const app = require('express');
const route = app.Router();
const {
    addProperty, fetchProperties, fetchProperty,
    updatePropertyFeatures, updatePropertyImage, fetchHomes,
    fetchPlots, fetch_Homes_With_Pagination,
    fetchClientSearch, fetch_Plots_With_Pagination
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

// fetch Plots properties for showing Plots page....
route.get("/fetch_homes_with_pagination/:page", fetch_Homes_With_Pagination);
// fetch Comercial Plots for showing  plots page....
//route.get("/fetch_comercial_plots", fetchComercialPlots);
// fetch Residential Plots for showing plots page....
//route.get("/fetch_residential_plots", fetchResidentialPlots);
// fetch Residential Plots for showing plots page....
//route.get("/fetch_agricultural_plots", fetchResidentialPlots);
// end point of user search....
route.post("/fetch_client_search", fetchClientSearch);
module.exports = route;