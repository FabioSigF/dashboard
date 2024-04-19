import axios from "axios";
import { Schedule } from "../types/global.type";
import config from "../config";

const baseURL = config.apiURL;

export const getAllSchedule = () => {
  const res = axios.get(`${baseURL}/schedule`).then((res) => res.data);

  return res;
}

export const createAppointment = (body: Schedule) => {
  const res = axios.post(`${baseURL}/schedule`, body);
  return res;
}

export const getScheduleByDate = (initialDate: string, finalDate: string) => {
  const data = {
    "date-gte": initialDate,
    "date-lt": finalDate,
  };
  const res = axios.get(`${baseURL}/schedule/bydate`, { params: data });
  return res;
};

export const deleteScheduleItem = (id: string) => {
  const res = axios.delete(`${baseURL}/schedule/${id}`);
  return res;
}