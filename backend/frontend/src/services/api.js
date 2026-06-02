import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-chsp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
