import { Redirect } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { LOGOUT } from "../store/reducers/AuthReducer";
import { BsFillPersonCheckFill, BsFillPaletteFill, BsFillPersonXFill } from "react-icons/bs";
// --------
import './AdminDashboardStyle.css';
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";
// Import Route....
import PrivateRoute from "./PrivateRoute";
import AdminRouteLinks from "../Admin/component/AdminRouteLink";
import _Dashboard from "../Admin/Pages/_Dashboard";
import _VerifyDealers from "../Admin/Pages/_VerifyDealers";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("myToken");
        dispatch({ type: LOGOUT });
        //Redirect("/login");
        history.push("/login");
    }
    return (
        <div class="d-flex" id="wrapper">
            <div class="bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold border-bottom">
                    PropertyFinder</div>
                <div class="list-group list-group-flush my-3">
                    <Link to="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <span className="react-icon"><BsFillPaletteFill /></span> Dashboard</Link>
                    <Link to="/verify_dealers" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <span className="react-icon"><BsFillPersonCheckFill /></span> User </Link>
                    <Link to="/unverify_dealers" class="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <span className="react-icon"><BsFillPersonXFill /></span> User </Link>
                    <Link href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-paperclip me-2"></i>Reports</Link>
                    <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-shopping-cart me-2"></i>Store Mng</a>
                    <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-gift me-2"></i>Products</a>
                    <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-comment-dots me-2"></i>Chat</a>
                    <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-map-marker-alt me-2"></i>Outlet</a>
                    <span class="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                        class="fas fa-power-off me-2"></i>Logout</span>
                </div>
            </div>

            <div id="page-content-wrapper">
                <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 class="fs-2 m-0">Dashboard</h2>
                    </div>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-user me-2"></i>John Doe
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="#">Settings</a></li>
                                    <li style={{ cursor: 'pointer' }}><span class="dropdown-item" onClick={handleLogout}>Logout</span></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <PrivateRoute exact path="/" component={_Dashboard} />
                    <PrivateRoute path="/verify_dealers" component={_VerifyDealers} />
                    <AdminRouteLinks path="/membership" component={Signup} />
                    <AdminRouteLinks path="/login" component={Login} />
                    <Route path="/*" component={Error404} />
                </Switch>
            </div>
        </div>
    )
}
export default AdminDashboard;