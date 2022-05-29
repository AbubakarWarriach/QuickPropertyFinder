export const SET_SEARCH = "SET_SEARCH";
export const SET_RESERVE_PROPERTY = "SET_RESERVE_PROPERTY";

const initState = {
    userSearch: {},
    reserveProperty: [],
}
const SearchReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_SEARCH:
            console.log("dfdf")
            console.log(action.paylood);
            return { ...state, userSearch: action.paylood };
        case SET_RESERVE_PROPERTY:
            return { ...state, reserveProperty: action.paylood };
        default:
            return state;
    }
});
export default SearchReducer;