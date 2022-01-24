import axios from './axios';

export const index = async () => 
  await axios.get('/alarm');

export const store = async (formData) => 
  await axios.post('/alarm', formData);

export const deleted = async (id) =>
  await axios.delete(`/alarm/${id}`);
