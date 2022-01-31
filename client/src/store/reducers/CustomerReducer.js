import jwt_decode from "jwt-decode";
export const SET_TOKON_CUSTOMER = "SET_TOKEN";
export const LOGOUT_CUSTOMER = "LOGOUT";

const initState = {
    token: '',
    customer: '',
};
const verifyToken = (token) => {
    const decodedToken = jwt_decode(token);
    const expireIn = new Date(decodedToken.exp * 1000);
    if (new Date() > expireIn) {
        localStorage.removeItem("customerToken");
        return null;
    } else {
        return decodedToken;
    }
}
const token = localStorage.getItem('customerToken');
if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initState.token = token;
        const { customer } = decoded;
        initState.customer = customer;
    }
}
const CustomerReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_TOKON_CUSTOMER:
            const decoded = verifyToken(action.paylood);
            const { customer } = decoded;
            //console.log(user);
            return { ...state, token: action.paylood, customer: customer };
        case LOGOUT_CUSTOMER:
            localStorage.removeItem("customerToken");
            return{ ...state, token: '', customer: ''};
        default:
            return state
    }
})
export default CustomerReducer;