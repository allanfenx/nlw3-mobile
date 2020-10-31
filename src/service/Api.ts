import axios from "axios";

const Api = axios.create({
    baseURL: ' http://192.168.0.102:8080',
});

export default Api;