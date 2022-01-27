import axios from './axios';

export const index = async () => 
  await axios.get('/alarm');

export const showAlarm = async (id) =>
  await axios.get(`/alarm/${id}`)

export const storeAlarm = async (formData) => 
  await axios.post('/alarm', formData);

export const uploadAlarm = async (id, body) => 
  await axios.put(`/alarm/${id}`, body)

export const uploadHour = async (id, body) =>
  await axios.put(`/alarm/hour/${id}`, body)

export const deleted = async (id) =>
  await axios.delete(`/alarm/${id}`);
