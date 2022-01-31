import {createStore, applyMiddleware, combineReducers} from 'redux';
import ThunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer';
import PropertyReducer from './reducers/PropertyReducer';
import SearchReducer from './reducers/SearchReducer';
import AdminReducer from './reducers/AdminReducer';
import CustomerReducer from './reducers/CustomerReducer';

const rootReducer = combineReducers({
    AuthReducer,
    PropertyReducer,
    SearchReducer,
    AdminReducer,
    CustomerReducer
});
const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export default store;