import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
const PrivateRoute = (props) => {
    const {user} = useSelector((state=>state.AuthReducer));
    return user ? (
        <Route exact={props.exact} path={props.path} component={props.component} />
    ) : (<Redirect to='/login' />)
}
export default PrivateRoute;