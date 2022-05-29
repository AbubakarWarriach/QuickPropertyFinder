import jwt_decode from "jwt-decode";
export const SET_TOKON = "SET_TOKEN";
export const LOGOUT="LOGOUT";

const initState = {
    token: '',
    user: null,
};
const verifyToken = (token) => {
    const decodedToken = jwt_decode(token);
    const expireIn = new Date(decodedToken.exp * 1000);
    if (new Date() > expireIn) {
        localStorage.removeItem("myToken");
        return null;
    } else {
        return decodedToken;
    }
}
const token = localStorage.getItem('myToken');
if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initState.token = token;
        const { user } = decoded;
        initState.user = user;
    }
}
const AuthReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_TOKON:
            const decoded = verifyToken(action.paylood);
            const { user } = decoded;
            //console.log(user);
            return { ...state, token: action.paylood, user: user };
        case LOGOUT:
            return{ ...state, token: '', user: null};
        default:
            return state
    }
})
export default AuthReducer;