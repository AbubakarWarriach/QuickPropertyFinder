export const SET_PROPERTIES = "SET_PROPERTIES";
export const SET_PROPERTY = "SET_PROPERTY";

const initState = {
    count: '',
    parPage: '',
    property: {},
    properties: []
}
const PropertyReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_PROPERTIES:
            const { count, parPage, propertysData } = action.paylood;
            return { ...state, properties: propertysData, parPage: parPage, count: count };
        case SET_PROPERTY:
            return { ...state, property: action.paylood };
        default:
            return state;
    }
});
export default PropertyReducer;