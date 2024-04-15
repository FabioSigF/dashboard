import axios from "axios";
import { Stock } from "../types/global.type";

const baseURL = import.meta.env.BASE_URL;

export const getAllStock = () => {
  const res = axios.get(`${baseURL}/stock`).then((res) => res.data);

  return res;
};

export const getStockByCompany = (id: string) => {
  const res = axios.get(`${baseURL}/stock/${id}`).then((res) => res.data);

  return res;
};

export const addStock = (data: Stock) => {
  const res = axios.post(`${baseURL}/stock`, data);
  return res;
};

export const deleteStockItem = (id: string) => {
  const res = axios.delete(`${baseURL}/stock/${id}`);
  return res;
}
