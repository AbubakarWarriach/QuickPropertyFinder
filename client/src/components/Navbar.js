import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
const Navbar = () => {
   const { user } = useSelector((state) => state.AuthReducer);
   //console.log(user);
   if (user) {
      if (user.admin) {
         return (
            <AdminNavbar />
         )
      } else {
         return (
            <UserNavbar user={user} />
         )
      }
   } else {
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
                           <Link to="/membership" className="nav-link">Membership</Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/login" className="nav-link">Login</Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      )
   }
}
export default Navbar;