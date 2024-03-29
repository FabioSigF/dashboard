import axios from "axios";
import { School } from "../types/global.type";

const baseURL = "https://dashboardbackend-p4f0.onrender.com";

export function getAllSchools() {
  const response = axios.get<School[]>(`${baseURL}/school`).then(res => res.data);
  return response;
}
