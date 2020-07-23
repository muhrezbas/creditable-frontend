import axios from "axios";
let instance = axios.create({
  baseURL: "https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=0"
});
export default instance
