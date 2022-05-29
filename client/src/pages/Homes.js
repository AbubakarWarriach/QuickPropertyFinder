import { useEffect, useState } from 'react';
import { SET_SEARCH } from "../store/reducers/SearchReducer";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { SET_PROPERTIES } from '../store/reducers/PropertyReducer';
import Pagination from '../components/Pagination';

const Homes = () => {
    const pageName = "homes";
    let { page } = useParams();
    const [searchData, setSearchData] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const { properties, count, parPage } = useSelector(state => state.PropertyReducer);
    console.log(properties);

    if (page == undefined) {
        page = 1
    }

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
        fetchHomesTypeProperties(page, dispatch);
    }, [page]);
    return (
        <>
            <div class="header-section header-section-plot">
                <div class="inner-header-section inner-header-section-plot">
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

            <div className="container my-5">

                {properties && properties.map((val) => {
                    return (
                        <div class="card mb-4" style={{ width: '100%' }} key={val._id}>
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <Link to={`/property_details/${val._id}`}>
                                        <img src={`/PropertyImages/${val.photo}`} class="img-fluid rounded-start" alt="..." />
                                    </Link>
                                </div>
                                <div class="col-md-8 right-side-details">
                                    <div class="card-body">
                                        <h5 class="card-title text-success">{val.title}</h5>
                                        <p class="card-text">{val.description}</p>
                                        <p class="card-text text-danger">Rs: {val.price}</p>
                                        <p class="card-text"><small class="text-muted">{val.city} / {val.location}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <Pagination count={count} parPage={parPage} page={page} pageName={pageName} />

            </div>

        </>
    )
}

const fetchHomesTypeProperties = async (page, dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await axios.get(`/fetch_homes_with_pagination/${page}`, config);
        //dispatch({ type: Close_Loader });
        const { count, parPage } = response.data;
        const propertysData = response.data.response;
        //console.log(response);
        dispatch({ type: SET_PROPERTIES, paylood: { propertysData, count, parPage } });
    } catch (err) {
        console.log(err.response);
        //dispatch({ type: Close_Loader });
    }
}

export default Homes;