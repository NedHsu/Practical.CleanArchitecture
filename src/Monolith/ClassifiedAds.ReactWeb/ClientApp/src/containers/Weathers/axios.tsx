import axios from "axios"

import env from "../../environments";
import addAuthInterceptors from "../Auth/authInterceptors"


const instance = axios.create({
    baseURL: env.ResourceServer.Endpoint + "weathers/",
});
addAuthInterceptors(instance);
export default instance