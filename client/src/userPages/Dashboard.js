import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROPERTIES } from '../store/reducers/PropertyReducer';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from "axios";
import { BsFillTrashFill, BsFillPenFill } from "react-icons/bs";

const Dashboard = () => {
    const [relod, setRelod] = useState(0);
    const pageName = "dashboard";
    const { user: { _id } } = useSelector(state => state.AuthReducer);
    const { properties, count, parPage } = useSelector(state => state.PropertyReducer);
    console.log(properties);
    const dispatch = useDispatch();
    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }
    const handleDelete = async(id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/property_disable", {id}, config);
            console.log(res);
            setRelod(1);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        // console.log(_id);
        dispatch(fetchProperties(_id, page));
    }, [page, relod]);
    // useEffect(()=>{
    //     setData(properties);
    //     console.log(data);
    // },[properties, page]);
    return (
        <div className="container">
            <h1 className="my-5 text-center">Dashboard</h1>
            <div className="row">
                <div className="col-sm-10 col-md-8 col-xxl-6 mx-auto">
                    {properties ? <div>
                            {properties.map((val, ind) => (
                                <div key={val._id}>
                                    <div className="list-properties">
                                        <span className="mx-2">
                                            <Link to={`/property_details/${val._id}`}>{val.title}</Link>
                                        </span>
                                        <span>
                                            <span className="text-success mx-2 edit-btn">
                                                <Link to={`/update_property/${val._id}`}><BsFillPenFill/></Link>
                                            </span>
                                            <span className="text-danger mx-1 del-btn" onClick={()=>handleDelete(val._id)}><BsFillTrashFill/></span>
                                        </span>
                                    </div>
                                    <hr/>
                                </div>
                            ))}
                    </div> : <div>empty</div>}
                    <Pagination count={count} parPage={parPage} page={page} pageName={pageName} />
                </div>
            </div>
        </div>
    )
}

const fetchProperties = (id, page) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        //console.log(token);
        //dispatch({ type: Set_Loader });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const response = await axios.get(`/fetch_properties/${id}/${page}`, config);
            //dispatch({ type: Close_Loader });
            const { count, parPage } = response.data;
            const propertysData = response.data.response;
            console.log(response);
            dispatch({ type: SET_PROPERTIES, paylood: { propertysData, count, parPage } });
        } catch (err) {
            console.log(err.response);
            //dispatch({ type: Close_Loader });
        }
    }
}

export default Dashboard;