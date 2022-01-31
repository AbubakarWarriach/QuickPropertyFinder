export const SET_UNVERIFY_USER = "SET_UNVERIFY_USER";
export const SET_VERIFY_USER = "SET_VERIFY_USER";

const initState = {
    count: '',
    parPage: '',
    unverifyUser: [],
    verifyUser: []
}
const AdminReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_UNVERIFY_USER:
            const { users } = action.paylood;
            // console.log(users);
            return { ...state, unverifyUser: users };
        case SET_VERIFY_USER:
            const { count, parPage, verifyUser } = action.paylood;
            return { ...state, verifyUser: verifyUser, parPage: parPage, count: count };
        default:
            return state;
    }
});
export default AdminReducer;