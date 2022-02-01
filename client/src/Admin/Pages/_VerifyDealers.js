import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_VERIFY_USER } from "../../store/reducers/AdminReducer";
import Pagination from "../../components/Pagination";
import { BsJustify } from "react-icons/bs";

const _VerifyDealers = () => {
    let { page } = useParams();
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false);
    if (page === undefined) {
        page = 1;
    }
    const { verifyUser, count, parPage } = useSelector((state) => state.AdminReducer);
    console.log(verifyUser);
    const unVerified = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post('/unVerifyPropertyDealer', { id }, config);
            console.log(response);
            setReload(!reload);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        fetcVerifyDealers(page, dispatch);
    }, [page, reload]);
    return (
        <div className="my-5 mx-4" style={{ backgroundColor: 'white' }}>
            <table class="table table-hover">
                <thead style={{ backgroundColor: 'whitesmoke' }}>
                    <tr>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>UnVerify</th>
                    </tr>
                </thead>
                <tbody>
                    {verifyUser.map((val) => {
                        return (
                            <tr key={val._id}>
                                <td>
                                    <img src={`/ProfileImage/${val.photo}`} width="50" height='50' className="rounded-circle" />
                                </td>
                                <td>{val.fname} {val.lname}</td>
                                <td>{val.email}</td>
                                <td>{val.phone}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => unVerified(val._id)}>Verify</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={count} parPage={parPage} page={page} pageName="verify_dealers" />
            </div>
        </div>
    )
}
const fetcVerifyDealers = async (page, dispatch) => {
    try {
        const response = await axios.get(`/verify_dealers/${page}`);
        //console.log(response);
        const { verifyUser, count, parPage } = response.data;
        console.log(verifyUser);
        console.log(count);
        dispatch({ type: SET_VERIFY_USER, paylood: { verifyUser, count, parPage } });
    } catch (error) {
        console.log(error.response);
    }
}
export default _VerifyDealers;