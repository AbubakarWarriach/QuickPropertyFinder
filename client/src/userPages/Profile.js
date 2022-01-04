import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    const {user} = useSelector(state=>state.AuthReducer);
    return (
        <div className="container">
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-8 col-md-6 col-lg-4 col-10 profile-column p-0">
                    <div className="card">
                        <img src={`/ProfileImage/${user.photo}`} className="card-img-top rounded" alt="..." />
                        <div className ="card-body">
                        <h5 className ="card-title">{user.title}</h5>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="td-title">Full Name: </td>
                                    <td>{user.fname+" "+user.lname}</td>
                                </tr>
                                <tr>
                                    <td className="td-title">Email: </td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="td-title">Phone No: </td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td className="td-title">Address: </td>
                                    <td>{user.address}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="profile-btn mt-4">
                            <Link to="/update_profile_image"><span class="badge rounded-pill bg-primary py-2">Update Image</span></Link>
                            <Link to="/edit_profile"><span class="badge rounded-pill bg-primary py-2">Update Profile</span></Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;