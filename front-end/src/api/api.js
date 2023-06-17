import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:8002" });

const APIConfiguration = {
    API: instance,
};

export default APIConfiguration;
