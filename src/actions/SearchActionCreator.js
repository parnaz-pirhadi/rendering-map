import {dispatchAsync} from '../ReduxDispatcher';
import SearchApi from "../api/SearchApi";
import SearchConstant from "../constants/SearchConstant";


const searchLocation = (model) => dispatch => {
    dispatchAsync(SearchApi.searchLocation(model), dispatch, {
        request: SearchConstant.SEARCH_LOCATION,
        success: SearchConstant.SEARCH_LOCATION_SUCCESS,
        failure: SearchConstant.SEARCH_LOCATION_ERROR,
        cancel: SearchConstant.SEARCH_LOCATION_CANCEL
    });
};


export {searchLocation};
