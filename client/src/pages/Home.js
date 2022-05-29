import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { SET_SEARCH } from "../store/reducers/SearchReducer";

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState({});
    const [homesPropertyData, setHomesPropertyData] = useState([]);
    const [plotsPropertyData, setPlotsPropertyData] = useState([]);
    const [dealersData, setDealersData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchData);
        dispatch({ type: SET_SEARCH, paylood: searchData });
        history.push('/your_dream_properties');
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, " : ", value);
        setSearchData({
            ...searchData,
            [name]: value,
        })
    }

    useEffect(() => {
        fetchHomesProperty(setHomesPropertyData);
        fetchPlotsProperty(setPlotsPropertyData);
        fetchDealers(setDealersData);
        // fetchPropertyForSearch()
    }, []);
    return (
        <>
            <div class="header-section">
                <div class="inner-header-section">
                    <h1 class="text-light text-center">We 'll find your dream house</h1>
                    <div class="search-form">
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" name="city" onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>All cities</option>
                                        <option value="gujrat">Gujrat</option>
                                        <option value="gujranwala">Gujranwala</option>
                                        <option value="lahore">Lahore</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <input type="text" name="location" onChange={handleInput} class="form-control form-control-sm" placeholder="Find location" />
                                </div>
                                <div class="col-2">
                                    <input type="submit" value="Search" class="btn btn-sm btn-success" />
                                </div>
                            </div>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" name="type" onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>Property Type</option>
                                        <option value="house">House</option>
                                        <option value="flat">Flat</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="residential">Residential</option>
                                        <option value="agriculture">Agricultural</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select class="form-select form-select-sm" name="unit" onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>Area Unit</option>
                                        <option value="acre">Acre</option>
                                        <option value="kanal">Kanal</option>
                                        <option value="feet">Sequare Feet</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" name="min_area" onChange={handleInput} placeholder="Min area" />
                                </div>
                            </div>
                            <div class="row mb-2 g-3">

                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" name="max_area" onChange={handleInput} placeholder="Max area" />
                                </div>
                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" name="max_price" onChange={handleInput} placeholder="Max price" />
                                </div>
                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" name="max_price" onChange={handleInput} placeholder="Max price" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {homesPropertyData && <div className="hot-property-section">
                <div className="hot-property-heading text-center">
                    <h1 className="text-success">SUPER HOT HOMES</h1>
                    <h5>Top Links to search your properties</h5>
                </div>
                <div className="container">
                    <div className="row g-4">
                        {homesPropertyData.map((val) => {
                            return (
                                <div className="col-sm-6 col-md-4 col-xl-3" key={val._id}>
                                    <div class="card">
                                        <Link to={`/property_details/${val._id}`}>
                                            <img src={`/PropertyImages/${val.photo}`} class="card-img-top" alt="not found" />
                                        </Link>
                                        <div class="card-body">
                                            <h5 class="card-title text-center">{val.title}</h5>
                                            <p className="text-center">PKR {val.price}</p>
                                            <p className="text-center my-0">{val.location}</p>
                                        </div>
                                        <div class="card-footer text-center">
                                            <Link to={`/dealer/${val.userId}`} class="text-light link">View Dealer Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="hot-property-button">
                    <button className="btn btn-success">
                        <Link to="/homes" className="link">View All</Link>
                    </button>
                </div>
            </div>}

            {plotsPropertyData && <div className="hot-property-section">
                <div className="hot-property-heading text-center">
                    <h1 className="text-success">SUPER HOT PLOTS</h1>
                    <h5>Top Links to search your properties</h5>
                </div>
                <div className="container">
                    <div className="row g-4">
                        {plotsPropertyData.map((val) => {
                            return (
                                <div className="col-sm-6 col-md-4 col-xl-3" key={val._id}>
                                    <div class="card">
                                        <Link to={`/property_details/${val._id}`}>
                                            <img src={`/PropertyImages/${val.photo}`} class="card-img-top" alt="not found" />
                                        </Link>
                                        <div class="card-body">
                                            <h5 class="card-title text-center">{val.title}</h5>
                                            <p className="text-center">Rs. {val.price}</p>
                                            <p className="text-center"></p>
                                        </div>
                                        <div class="card-footer text-center">
                                            <Link to={`/dealer/${val.userId}`} class="text-light link">View Dealer Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="hot-property-button">
                    <button className="btn btn-success">
                        <Link to="/plots" className="link">View All</Link>
                    </button>
                </div>
            </div>}

            <div className="top-dealers-section">
                <div className="hot-property-heading text-center">
                    <h1 className="text-success">TOP DEALERS</h1>
                    <h5>We are backed & trusted by</h5>
                </div>
                <div className="container">
                    <div className="row g-4">
                        {dealersData.map((val) => {
                            return (
                                <div className="col-sm-6 col-md-4 col-xl-3" key={val._id}>
                                    <div class="text-center card-box">
                                        <div class="member-card pt-2 pb-2">
                                            <div class="thumb-lg member-thumb mx-auto">
                                                <Link to={`/dealer/${val._id}`}>
                                                    <img src={`/ProfileImage/${val.photo}`} class="profile-image-home" alt="not found" />
                                                </Link>
                                            </div>
                                            <div class="">
                                                <h4>{val.fname} {val.lname}</h4>
                                                <h6>{val.title}</h6>
                                            </div>
                                            <Link to={`/dealer/${val._id}`} class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">View Details</Link>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

const fetchHomesProperty = async (setHomesPropertyData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get("fetch_homes", config);
        const { data } = response;
        //console.log(data);
        setHomesPropertyData(data);
    } catch (error) {
        console.log(error.response);
    }
}

const fetchPlotsProperty = async (setPlotsPropertyData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get("fetch_plots", config);
        const { data } = response;
        console.log(data);
        setPlotsPropertyData(data);
    } catch (error) {
        console.log(error.response);
    }
}

const fetchDealers = async (setDealersData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get("fetch_dealers_home", config);
        const { data } = response;
        console.log(data);
        setDealersData(data);
    } catch (error) {
        console.log(error.response);
    }
}

export default Home;