import axios from "axios";

function post(route, params) {
    return axios.post("https://formgptbackend-szoxoe2w2a-uc.a.run.app" + route, params)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    });
}

export default post;