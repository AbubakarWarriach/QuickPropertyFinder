import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {LOGOUT} from "../store/reducers/AuthReducer";

const UserNavbar = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("myToken");
        dispatch({type: LOGOUT});
        history.push("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link to="/" className="navbar-brand">QuickPropertyFinder</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="ml-auto">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/plots" className="nav-link">Plots</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/homes" className="nav-link">Homes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">{props.user.fname+"_"+props.user.lname}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add_property" className="nav-link">AddProperty</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default UserNavbar;