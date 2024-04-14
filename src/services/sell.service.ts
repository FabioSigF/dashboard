import axios from "axios";
import { Sellings } from "../types/global.type";

const baseURL = import.meta.env.BASE_URL;

export const getAllSellings = () => {
  const res = axios.get<Sellings[]>(`${baseURL}/sell`).then((res) => res.data);
  return res;
};

export const addSell = (data: Sellings) => {
  const res = axios.post(`${baseURL}/sell`, data);
  return res;
};

export const getBySellId = (id: string) => {
  const res = axios.get(`${baseURL}/sell/${id}`).then((res) => res.data);
  return res;
};

export const getByDate = (initialDate: string, finalDate: string) => {
  const data = {
    "date-gte": initialDate,
    "date-lt": finalDate,
  };
  const res = axios.get(`${baseURL}/sell/bydate`, { params: data });
  return res;
};

export const deleteSell = (id: string) => {
  const res = axios.delete(`${baseURL}/sell/${id}`);
  return res;
};