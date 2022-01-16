import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//import AdminDashboard from "./AdminDashboard";
import UserNavbar from "./UserNavbar";
const Navbar = () => {
   const { user } = useSelector((state) => state.AuthReducer);
   //console.log(user);
   if (user) {
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
                        <li className="nav-item">
                           <Link className="nav-link" to="/signup">SignUp</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/login">Login</Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
         </>
      )
   }
}
export default Navbar;