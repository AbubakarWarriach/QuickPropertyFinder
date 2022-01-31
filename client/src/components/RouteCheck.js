import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const RouteCheck = (props) => {
	const { customer } = useSelector((state) => state.CustomerReducer);
	return customer ? (
		<Redirect to='/' />
	) : (
		<Route path={props.path} component={props.component} />
	);
};
export default RouteCheck;