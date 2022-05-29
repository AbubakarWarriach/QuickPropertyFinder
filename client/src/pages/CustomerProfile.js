import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerProfile = () => {
    const { customer } = useSelector(state => state.CustomerReducer);
    const [resve, setResrve] = useState();
    useEffect(()=>{
        fetchReserv(setResrve);
    }, []);
    return (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me</h3>
                            {/* <h6 class="theme-color lead">Customer Profile</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae accumsan tellus. Praesent sed
                                ullamcorper justo, sed tincidunt lacus. In dignissim lectus sit amet felis efficitur feugiat. Morbi mattis
                                mauris sed mollis vestibulum..</p> */}
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Name</label>
                                        <p>{customer.name}</p>
                                    </div>
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{customer.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone No</label>
                                        <p>{customer.phone}</p>
                                    </div>
                                    {/* <div class="media">
                                        <label>Address</label>
                                        <p>Gujrat, Punjab</p>
                                    </div> */}
                                </div>
                                {/* <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{user.phone}</p>
                                    </div>
                                    <div class="media">
                                        <label>Skype</label>
                                        <p>skype.0404</p>
                                    </div>
                                    <div class="media">
                                        <label>Freelance</label>
                                        <p>Available</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            {/* <img src={`/ProfileImage/${user.photo}`} title="" alt="" /> */}
                        </div>
                        {/* <div className="profile-update-button">
                            <Link to="/update_profile_image"><span class="badge rounded-pill bg-success py-2">Update Image</span></Link>
                            <Link to="/edit_profile"><span class="badge rounded-pill bg-success py-2">Update Profile</span></Link>
                        </div> */}
                    </div>
                </div>
                <div class="counter">
                    {/* {resve.map((res)=>{
                        return(
                            <div key={res_id}>
                                <h1>{res.}</h1>
                            </div>
                        )
                    })} */}
                </div>
            </div>
        </section>
    )
}
const fetchReserv = async() => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.get("/fetchReserveCustomerProperty");
        console.log(res);
    } catch (error) {
        console.log(error.res);
    }
}
export default CustomerProfile;