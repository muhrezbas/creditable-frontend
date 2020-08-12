import axios from "axios";
let instance = axios.create({
  baseURL: "http://node.dompetkilat.id/api/"
});
export default instance
