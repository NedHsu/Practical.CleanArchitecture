import axios from 'axios'
import env from '../../environments';
import addAuthInterceptors from "../auth/authInterceptors";

const service = axios.create({
  baseURL: env.ResourceServer.Endpoint, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

addAuthInterceptors(service)
export default service