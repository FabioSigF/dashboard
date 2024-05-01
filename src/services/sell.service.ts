import axios from "axios";
import { Sell, Sellings } from "../types/global.type";
import config from "../config";

const baseURL = config.apiURL;

export const getAllSellings = () => {
  const res = axios.get<Sellings[]>(`${baseURL}/sell`).then((res) => res.data);
  return res;
};

export const addSell = (data: Sell) => {
  const res = axios.post(`${baseURL}/sell`, data);
  return res;
};

export const findSellByCompanyId = (id: string) => {
  const res = axios.get(`${baseURL}/sell/${id}`).then((res) => res.data);
  return res;
};

export const findSellingsByCompanyAndDate = (
  id: string,
  initialDate: string,
  finalDate: string
) => {
  const date = {
    "date_gte": initialDate,
    "date_lt": finalDate,
  };

  const res = axios.get(`${baseURL}/sell/bydate/${id}`, { params: date });
  return res;
};

export const findSellByDate = (initialDate: string, finalDate: string) => {
  const date = {
    "date_gte": initialDate,
    "date_lt": finalDate,
  };
  const res = axios.get(`${baseURL}/sell/bydate`, { params: date });
  return res;
};

export const deleteSell = (id: string) => {
  const res = axios.delete(`${baseURL}/sell/${id}`);
  return res;
};
