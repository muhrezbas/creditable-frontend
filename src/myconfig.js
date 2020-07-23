import axios from "axios";
let instance = axios.create({
  baseURL: "http://192.168.1.160:3000/api/"
});
export default instance
