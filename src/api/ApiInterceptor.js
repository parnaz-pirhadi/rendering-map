import axios from "axios";

export default {
    setupInterceptors: (store) => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401) {
                console.log("EXPIRED TOKEN!");
            }return Promise.reject(error);
        });
    }
};
