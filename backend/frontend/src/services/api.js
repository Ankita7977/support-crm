import axios from "axios";

const API = axios.create({
  baseURL:
    "https://support-crm-production-323c.up.railway.app",
});

export default API;
