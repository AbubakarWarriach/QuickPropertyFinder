import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useSelector(state => state.AuthReducer);
    return (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me</h3>
                            <h6 class="theme-color lead">{user.title}</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae accumsan tellus. Praesent sed
                                ullamcorper justo, sed tincidunt lacus. In dignissim lectus sit amet felis efficitur feugiat. Morbi mattis
                                mauris sed mollis vestibulum..</p>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Name</label>
                                        <p>{user.fname} {user.lname}</p>
                                    </div>
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Residence</label>
                                        <p>Pakistan</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p>Gujrat, Punjab</p>
                                    </div>
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
                            <img src={`/ProfileImage/${user.photo}`} title="" alt="" />
                        </div>
                        <div className="profile-update-button">
                            <Link to="/update_profile_image"><span class="badge rounded-pill bg-success py-2">Update Image</span></Link>
                            <Link to="/edit_profile"><span class="badge rounded-pill bg-success py-2">Update Profile</span></Link>
                        </div>
                    </div>
                </div>
                <div class="counter">
                    {/* <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                                <p class="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                                <p class="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                                <p class="m-0px font-w-600">Photo Capture</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                                <p class="m-0px font-w-600">Telephonic Talk</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
export default Profile;