import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const AdminRouteLinks = (props) => {
	const { user } = useSelector((state) => state.AuthReducer);
	return user ? (
		<Redirect to='/' />
	) : (
		<Route path={props.path} component={props.component} />
	);
};
export default AdminRouteLinks;