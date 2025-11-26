import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI backend
});

export const fetchMenu = () => API.get("/menu");
export const createOrder = (data) => API.post("/orders", data);
export const getOrder = (id) => API.get(`/orders/${id}`);
export const getOrderBill = (id) => API.get(`/billing/${id}`);
