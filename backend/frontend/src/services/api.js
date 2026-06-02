import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-chsp.onrender.com"
});

export default API;
