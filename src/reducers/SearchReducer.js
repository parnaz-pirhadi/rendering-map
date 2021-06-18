import SearchConstant from "../constants/SearchConstant";

const initialState = {
    loading: true
};
const initialAction = {type: 'initial state'};

const searchReducer = (state = initialState, action = initialAction) => {
    switch (action.type) {
        case SearchConstant.SEARCH_LOCATION:
            return {
                ...state,
                loading: true
            };
        case SearchConstant.SEARCH_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                searchData: action.payload.response.data.value
            };
        case SearchConstant.SEARCH_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                emptyList: action.payload.error
            };
        case SearchConstant.SEARCH_LOCATION_CANCEL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};

export default searchReducer;
