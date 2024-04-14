import axios from "axios";
import { Company } from "../types/global.type";

const baseURL = import.meta.env.BASE_URL;

export function getAllCompanies() {
  const response = axios
    .get<Company[]>(`${baseURL}/company`)
    .then((res) => res.data);
  return response;
}

export function createCompany(data: Company) {
  console.log(data);
  const body = {
    name: data.name,
    cnpj: data.cnpj,
    clothing: data.clothing,
    category: data.category,
    tel: data.tel,
    cel: data.cel
  };

  const response = axios.post(`${baseURL}/company`, body);

  return response;
}

export function getCompanyById(id: string) {
  const res = axios.
    get<Company>(`${baseURL}/company/${id}`)
    .then((res) => res.data);
  return res;
}

export function deleteCompanyById(id: string) {
  const res = axios.delete(`${baseURL}/company/${id}`);
  return res;
}