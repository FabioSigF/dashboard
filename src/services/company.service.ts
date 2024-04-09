import axios from "axios";
import { Company } from "../types/global.type";

const baseURL = "https://dashboardbackend-p4f0.onrender.com";

export function getAllCompanies() {
  const response = axios
    .get<Company[]>(`${baseURL}/company`)
    .then((res) => res.data);
  return response;
}

export function createCompany(data: Company) {
  const body = {
    name: data.name,
    cnpj: data.cnpj,
    category: data.category,
    sizes: data.sizes.split(","),
    tel: data.tel,
    cel: data.cel
  };

  const response = axios.post(`${baseURL}/company`, body);

  return response;
}

export function getCompanyById(id: string) {
  const res = axios.get<Company>(`${baseURL}/company/${id}`);

  console.log(res);
  return res;
}

export function deleteCompanyById(id: string) {
  const res = axios.delete(`${baseURL}/company/${id}`);

  console.log(res);
  return res;
}