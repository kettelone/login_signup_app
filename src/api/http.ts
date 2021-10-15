import axios from "axios";

const rootURL = "http://142.93.134.108:1111";
const  $api = axios.create({
  baseURL: rootURL,
});

export {$api, rootURL}