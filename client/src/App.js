import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import RouteLinks from './components/RouteLink';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Property from './pages/Property';
import Dealer from './pages/Dealer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './userPages/Dashboard';
import Profile from './userPages/Profile';
import Admin from './adminPages/Admin';
import EditProfile from './userPages/UpdateProfileImage';
import UpdateProfileImage from './userPages/EditProfile';
import AddProperty from './userPages/AddProperty';
import UpdateProperty from './userPages/UpdateProperty';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/property" component={Property} />
          <Route path="/dealers" component={Dealer} />
          <Route path="/property_details/:id" component={PropertyDetails} />
          <RouteLinks path="/membership" component={Signup} />
          <RouteLinks path="/login" component={Login} />
          <PrivateRoute path="/dashboard/:page?" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/edit_profile" component={UpdateProfileImage} />
          <PrivateRoute path="/update_profile_image" component={EditProfile} />
          <PrivateRoute path="/add_property" component={AddProperty} />
          <PrivateRoute path="/update_property" component={UpdateProperty} />
        </Switch>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
