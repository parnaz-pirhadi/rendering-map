import React from 'react';
import axios from 'axios';
import {authHeader} from "../methodService/auth-header";

let SearchApi = {
    searchLocation(model) {
        return post(`https://map.ir/search/v2/autocomplete`, model, {headers: authHeader()});
    },

    makePostRequestCreator() {
        let call;
        return (url, body) => {
            if (call) {
                call.cancel();
            }
            call = axios.CancelToken.source();
            return axios.post(url, body, {cancelToken: call.token, headers: authHeader()});
        };
    }

};
let post = SearchApi.makePostRequestCreator();
export default SearchApi;
