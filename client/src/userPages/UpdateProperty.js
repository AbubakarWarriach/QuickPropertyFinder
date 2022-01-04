import {useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";
//import { BsArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from 'axios';
import UpdatePropertyFeatures from './UpdatePropertyFeatures';
import UpdatePropertyImage from './UpdatePropertyImage';

const UpdateProperty = () => {
    const [selectUpdate, setSelectUpdate] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
    useEffect(()=>{
        dispatch(fetchProperty(id));
    }, [id]);
    if(selectUpdate === null){
        return(
            <div className="container my-5">
                <h1 className='text-center'>Select Update</h1>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success mx-2' onClick={()=>setSelectUpdate(false)}>Update Image</button>
                    <button className='btn btn-success' onClick={()=>setSelectUpdate(true)}>Update Features</button>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                {selectUpdate ? <div><UpdatePropertyFeatures/></div> : <div><UpdatePropertyImage/></div>}
            </div>
        )
    }
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
        }catch(err){
            console.log("runing is success");
            console.log(err);
        }
    }
}

export default UpdateProperty;