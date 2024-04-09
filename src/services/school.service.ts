import axios from "axios";
import { School } from "../types/global.type";

const baseURL = "https://dashboardbackend-p4f0.onrender.com";

export function getAllSchools() {
  const response = axios
    .get<School[]>(`${baseURL}/school`)
    .then((res) => res.data);
  return response;
}

export function createSchool(data: School) {
  const body = {
    name: data.name,
    category: data.category,
    colors: data.colors.split(","),
    sizes: data.sizes.split(","),
  };

  const response = axios.post(`${baseURL}/school`, body);

  return response;
}

export function getSchoolById(id: string) {
  const res = axios.get<School>(`${baseURL}/school/${id}`);

  console.log(res);
  return res;
}

export function deleteSchoolById(id: string) {
  const res = axios.delete(`${baseURL}/school/${id}`);

  console.log(res);
  return res;
}