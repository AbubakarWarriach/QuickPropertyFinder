export const SET_SEARCH = "SET_SEARCH";

const initState = {
    userSearch: {}
}
const SearchReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_SEARCH:
            return { ...state, userSearch: action.paylood };
        default:
            return state;
    }
});
export default SearchReducer;