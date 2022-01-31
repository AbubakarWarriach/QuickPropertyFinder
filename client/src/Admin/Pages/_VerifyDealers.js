import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_VERIFY_USER } from "../../store/reducers/AdminReducer";

const _VerifyDealers = () => {
    let {page} = useParams();
    const dispatch = useDispatch();
    if(page===undefined){
        page=1;
    }
    const {verifyUser, count, parPage} = useSelector((state)=>state.AdminReducer);
    console.log(verifyUser);
    useEffect(()=>{
        fetcVerifyDealers(page, dispatch);
    }, [page]);
    return (
        <div className="my-5 mx-4" style={{backgroundColor: 'white'}}>
            <table class="table table-hover">
                <thead style={{backgroundColor: 'whitesmoke'}}>
                    <tr>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
const fetcVerifyDealers = async(page, dispatch) => {
    try {
        const response = await axios.get(`/verify_dealers/${page}`);
        //console.log(response);
        const { verifyUser, count, parPage } = response.data;
        console.log(verifyUser);
        console.log(count);
        dispatch({type: SET_VERIFY_USER, paylood: {verifyUser, count, parPage}});
    } catch (error) {
        console.log(error.response);
    }
}
export default _VerifyDealers;