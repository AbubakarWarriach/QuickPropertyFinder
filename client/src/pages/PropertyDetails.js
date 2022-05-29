import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { BsArrowRightCircleFill } from "react-icons/bs";
import React,{ useEffect } from "react";
import axios from 'axios';
import { SET_PROPERTY } from '../store/reducers/PropertyReducer';
import { SET_RESERVE_PROPERTY } from '../store/reducers/SearchReducer';
import { GoogleMap } from '@react-google-maps/api';

const PropertyDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { property } = useSelector((state) => state.PropertyReducer);
    const { customer } = useSelector((state) => state.CustomerReducer);
    console.log(property);
    console.log(property.reserve);
    const { id } = useParams();
    const handleReserve = () => {
        if (customer) {
            dispatch({ type: SET_RESERVE_PROPERTY, paylood: property });
            // setInterval(()=>{
            history.push("/reserve_property");
            // }, 800);
        } else {
            history.push("/signup_customer");
        }
    }
    const containerStyle = {
        width: '500px',
        height: '600px'
    };
    
    const center = {
        lat: -3.745,
        lng: -38.523
    };
    const mapRef=React.useRef(undefined)
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current=map
  }, [])

  const onUnmount = React.useCallback(function callback() {
    mapRef.current=undefined
  }, [])

    useEffect(() => {
        dispatch(fetchProperty(id));
    }, [id]);
    return (
        <div className="container property-details-card">
            <div>
                <div style={{ display: 'flex' }}>
                    {/* <img src={`/PropertyImages/${property.photo}`} className="img-fluid" alt="image not found" /> */}
                    <div >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            { /* Child components, such as markers, info windows, etc. */}
                            <></>
                        </GoogleMap>
                    </div>
                </div>
                <div>
                    <span className="lead">QuickPropertyFinder / </span>
                    <span className="lead">{property.propertyType} / </span>
                    <span className="lead">{property.city} / </span>
                    <span className="lead">{property.location} / </span>
                </div>
                <hr />
            </div>
            <div className="row">
                <div className="col-md-8">
                    <h3 className='text-success'>{property.title}</h3>
                    <p>{property.location} , {property.city}</p>
                    <hr />
                    <div>
                        <h4>Property Description Details</h4>
                        <div className="row mt-3">
                            <div className="col-sm-5">
                                <p className="lead">Property Dealer: <b>{property.userName}</b></p>
                            </div>
                        </div>
                        <p><b><BsArrowRightCircleFill /> DESCRIPTION:</b></p>
                        <p>{property.description}</p>
                        {/* <p><b><BsArrowRightCircleFill /> FEATURES:</b></p> */}
                        {!(property.reserve) && <p>Reserve Amount Rs. {property.price * 0.5 / 100}</p>}
                        {
                            !(property.reserve) ? <button className='btn btn-success' onClick={handleReserve}>
                                Reserve
                            </button> : <button className='btn btn-success' disabled>
                                Reserved
                            </button>
                        }
                    </div>
                </div>
                {/* <div className="col-md-4 side-bar">
                    <h4 className="text-center mt-4">Contact Form</h4>
                    <hr className="mx-4 my-4" />
                </div> */}
            </div>
        </div>
    )
}

const fetchProperty = (id) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.get(`/fetch_property/${id}`, config);
            console.log(response);
            const { propertyData } = response.data;
            console.log(propertyData);
            dispatch({ type: SET_PROPERTY, paylood: propertyData });
        } catch (err) {
            console.log("runing is success");
            console.log(err);
        }
    }
}

export default PropertyDetails;