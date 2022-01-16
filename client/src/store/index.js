import {createStore, applyMiddleware, combineReducers} from 'redux';
import ThunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer';
import PropertyReducer from './reducers/PropertyReducer';
import SearchReducer from './reducers/SearchReducer';

const rootReducer = combineReducers({
    AuthReducer,
    PropertyReducer,
    SearchReducer
});
const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export default store;