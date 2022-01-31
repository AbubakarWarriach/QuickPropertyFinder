import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_UNVERIFY_USER } from "../../store/reducers/AdminReducer";

const _UnverifyDealers = () => {
    const dispatch = useDispatch();
    const { unverifyUser } = useSelector((state) => state.AdminReducer);
    console.log(unverifyUser);
    const verified = async(id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post('/verifyPropertyDealer', {id}, config);
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        fetchUnverifyDealers(dispatch);
    }, []);
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
                    {unverifyUser.map((val) => {
                        return (
                            <tr key={val._id}>
                                <td>
                                    <img src={`/ProfileImage/${val.photo}`} width="50" height='50' className="rounded-circle" />
                                </td>
                                <td>{val.fname} {val.lname}</td>
                                <td>{val.email}</td>
                                <td>{val.phone}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => verified(val._id)}>Verify</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
const fetchUnverifyDealers = async (dispatch) => {
    try {
        const response = await axios.get(`/unverify_dealers`);
        console.log(response);
        const { users } = response.data;
        console.log(users);
        dispatch({ type: SET_UNVERIFY_USER, paylood: { users } });
    } catch (error) {
        console.log(error.response);
    }
}
export default _UnverifyDealers;