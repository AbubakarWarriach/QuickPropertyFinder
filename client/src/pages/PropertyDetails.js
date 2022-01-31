import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from 'axios';
import { SET_PROPERTY } from '../store/reducers/PropertyReducer';

const PropertyDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const {property} = useSelector((state)=>state.PropertyReducer);
    const {customer} = useSelector((state)=>state.CustomerReducer);
    console.log(property);
    const { id } = useParams();
    const handleReserve = () => {
        if(customer){
            history.push("/reserve_property");
        }else{
            history.push("/signup_customer");
        }
    }
    useEffect(()=>{
        dispatch(fetchProperty(id));
    }, [id]);
    return (
        <div className="container property-details-card">
            <div>
                <img src={`/PropertyImages/${property.photo}`} className="img-fluid" alt="image not found" />
                <div>
                    <span className="lead">QuickPropertyFinder / </span>
                    <span className="lead">Homes / </span>
                    <span className="lead">House / </span>
                    <span className="lead">Address / </span>
                </div>
                <hr />
            </div>
            <div className="row">
                <div className="col-md-8">
                    <h3>5 Marla House For Sale In Gulshan E Ali Colony Lahore</h3>
                    <p>Jazz Franchise, Bhatta Chock, Gulshan e Ali Colony , Lahore</p>
                    <hr />
                    <div>
                        <h4>Property Description Details</h4>
                        <div className="row mt-3">
                            <div className="col-sm-5">
                                <p className="lead">Property ID: <b>68659</b></p>
                            </div>
                            <div className="col-sm-5">
                                <p className="lead">Type: <b>Homes / House</b></p>
                            </div>
                        </div>
                        <p className="">5 Marla House For Sale In Gulshan E Ali Colony Lahore</p>
                        <p><b><BsArrowRightCircleFill /> FEATURES:</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac orci eu dui tincidunt
                            efficitur non non erat. Sed scelerisque turpis vel nisi euismod viverra. Mauris aliquet,
                            purus vel lobortis fermentum, arcu dui eleifend orci, sed porta odio nulla vel mauris.
                            Proin euismod metus vel ante interdum efficitur. Aenean maximus ante risus, vel sodales
                            purus elementum non. Vivamus tristique augue vitae nisl tempus ornare. Integer sit amet
                            dapibus arcu. Curabitur eget pellentesque ante. Nullam pretium erat sit amet orci dictum
                            malesuada. Maecenas aliquam felis vel odio dictum, vitae tincidunt neque porttitor.
                            Curabitur tempor ac urna sit amet commodo. Mauris feugiat nulla non mollis sollicitudin.
                            In a dui sit amet nisl venenatis dapibus. Fusce dapibus, turpis a elementum pharetra,
                            justo tortor scelerisque velit, ut euismod purus elit ultricies sem. Fusce mollis eget
                            metus vitae tristique.</p>
                            <button className='btn btn-success' onClick={handleReserve}>Reserve</button>
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
    return async(dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try{
            const response = await axios.get(`/fetch_property/${id}`, config);
            console.log(response);
            const {propertyData} = response.data;
            console.log(propertyData);
            dispatch({type: SET_PROPERTY, paylood: propertyData});
        }catch(err){
            console.log("runing is success");
            console.log(err);
        }
    }
}

export default PropertyDetails;