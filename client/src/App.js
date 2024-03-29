import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { useSelector } from 'react-redux';
import RouteLinks from './components/RouteLink';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Homes from './pages/Homes';
import Plots from './pages/Plots';
import Dealer from './pages/Dealer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './userPages/Dashboard';
import Profile from './userPages/Profile';
import EditProfile from './userPages/UpdateProfileImage';
import UpdateProfileImage from './userPages/EditProfile';
import AddProperty from './userPages/AddProperty';
import UpdateProperty from './userPages/UpdateProperty';
import AdminDashboard from './components/AdminDashboard';
import SearchProperties from './pages/SearchProperties';
import RouteCheck from './components/RouteCheck';
import SignupCustomer from './pages/SignupCustomer';
import SigninCustomer from './pages/SigninCustomer';
import Footer from './pages/Footer';
import ReserveProperty from './pages/ReserveProperty';
import Error404 from './pages/Error404';
import CustomerProfile from './pages/CustomerProfile';


function App() {
  const { user } = useSelector((state) => state.AuthReducer);
  if (!(user == null)) {
    if (user.admin) {
      return (
        <BrowserRouter>
          <AdminDashboard />
        </BrowserRouter>
      )
    }
    else {
      return (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/homes/:page?" component={Homes} />
            <Route path="/plots/:page?" component={Plots} />
            <Route path="/dealer/:id" component={Dealer} />
            <Route path="/property_details/:id" component={PropertyDetails} />
            <Route path="/your_dream_properties/:page?" component={SearchProperties} />
            <Route path="/reserve_property" component={ReserveProperty} />
            <RouteLinks path="/signup" component={Signup} />
            <RouteLinks path="/login" component={Login} />
            <PrivateRoute path="/dashboard/:page?" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit_profile" component={UpdateProfileImage} />
            <PrivateRoute path="/update_profile_image" component={EditProfile} />
            <PrivateRoute path="/add_property" component={AddProperty} />
            <PrivateRoute path="/update_property/:id" component={UpdateProperty} />
            <Route path="/*" component={Error404} />
          </Switch>
          <Footer />
        </BrowserRouter >
      );
    }
  } else {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/homes/:page?" component={Homes} />
          <Route path="/plots/:page?" component={Plots} />
          <Route path="/dealer/:id" component={Dealer} />
          <Route path="/property_details/:id" component={PropertyDetails} />
          <Route path="/your_dream_properties/:page?" component={SearchProperties} />
          <Route path="/reserve_property" component={ReserveProperty} />
          <RouteCheck path="/signup_customer" component={SignupCustomer} />
          <RouteCheck path="/signin_customer" component={SigninCustomer} />
          <Route path="/customer_profile" component={CustomerProfile} />
          <RouteLinks path="/signup" component={Signup} />
          <RouteLinks path="/login" component={Login} />
          <Route path="/*" component={Error404} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
