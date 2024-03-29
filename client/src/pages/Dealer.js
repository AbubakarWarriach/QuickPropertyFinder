import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const Dealer = () => {
    const { id } = useParams();
    const [dealerDetail, setDealerDetail] = useState([]);
    useEffect(() => {
        fetchDealerDetail(id, setDealerDetail);
    }, [id])
    return (
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me</h3>
                            <h6 class="theme-color lead">{dealerDetail.title}</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a dictum diam. Vivamus sodales diam at erat
                                mollis, in tempor neque dignissim. Suspendisse vitae dignissim nunc, nec auctor orci.
                                Nam tristique luctus imperdiet. Sed egestas lorem quis leo scelerisque, ac dignissim mi bibendum.</p>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Name</label>
                                        <p>{dealerDetail.fname} {dealerDetail.lname}</p>
                                    </div>
                                    <div class="media">
                                        <label>Email</label>
                                        <p>{dealerDetail.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Contact</label>
                                        <p>{dealerDetail.phone}</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p>{dealerDetail.address}</p>
                                    </div>
                                </div>
                                {/* <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{dealerDetail.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{dealerDetail.phone}</p>
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
                            <img src={`/ProfileImage/${dealerDetail.photo}`} title="" alt="" />
                        </div>
                    </div>
                </div>
                {/* <div class="counter">
                    <div class="row">
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
                    </div>
                </div> */}
            </div>
        </section>
    )
}

const fetchDealerDetail = async (id, setDealerDetail) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await axios.get(`/dealer/${id}`, config);
        const { data } = response;
        console.log(data);
        setDealerDetail(data);
    } catch (error) {
        console.log(error.response);
    }
}

export default Dealer;