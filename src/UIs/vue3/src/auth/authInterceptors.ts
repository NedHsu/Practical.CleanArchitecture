import env from "../../environments";
import authService from "./authService";
import { AxiosInstance } from "axios";

const addAuthInterceptors = (axios: AxiosInstance, response?: any) => {
    {
        axios.interceptors.request.use(config => {
            if (config.baseURL?.startsWith(env.ResourceServer.Endpoint) || config.url?.startsWith(env.ResourceServer.Endpoint)) {
                config.headers["Authorization"] = "Bearer " + authService.getAccessToken();
            }
            return config;
        });
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log(error);
            if (401 === error.response.status) {
                authService.login(window.location.href);
            } else {
                return Promise.reject(error);
            }
        });
    }
}

export default addAuthInterceptors

