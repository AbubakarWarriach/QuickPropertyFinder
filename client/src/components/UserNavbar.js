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
        <nav className="navbar navbar-expand-lg bg-success">
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
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/property" className="nav-link">Property</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dealers" className="nav-link">Dealers</Link>
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
                                <span className="nav-link" onClick={handleLogout}>Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default UserNavbar;