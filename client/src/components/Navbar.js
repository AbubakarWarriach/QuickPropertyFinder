import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import AdminDashboard from "./AdminDashboard";
import UserNavbar from "./UserNavbar";
import { LOGOUT_CUSTOMER } from '../store/reducers/CustomerReducer';

const Navbar = () => {
   const history = useHistory();
   const { user } = useSelector((state) => state.AuthReducer);
   const { customer } = useSelector((state) => state.CustomerReducer);
   const dispatch = useDispatch();
   const handleLagout = () => {
      dispatch({ type: LOGOUT_CUSTOMER });
      history.push("/");
   }
   console.log(user);

   // console.log(check);
   if (!(user == null)) {
      return (
         <UserNavbar user={user} />
      )
   } else {
      return (
         <>
            <nav className="navbar navbar-expand-lg navbar-design">
               <div className="container">
                  <Link className="navbar-brand" to="/">QuickPropertyFinder</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                     <ul className="navbar-nav navbar-right">
                        <li className="nav-item">
                           <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/plots">Plots</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/homes">Homes</Link>
                        </li>
                        {
                           customer ? <>
                              <li className="nav-item">
                                 <Link className="nav-link" to='/customer_profile' >Profile</Link>
                              </li>
                              <li className="nav-item">
                                 <span className="nav-link" onClick={handleLagout} style={{ cursor: 'pointer' }} >logout</span>
                              </li>
                           </> : <>
                              <li className="nav-item">
                                 <Link className="nav-link" to="/signup">SignUp</Link>
                              </li>
                              <li className="nav-item">
                                 <Link className="nav-link" to="/login">Login</Link>
                              </li>
                           </>
                        }
                     </ul>
                  </div>
               </div>
            </nav>
         </>
      )
   }
}
export default Navbar;