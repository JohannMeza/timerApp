import axios from './axios';

export const index = async () =>
  await axios.get('/timer')

export const store = async (time) => 
  await axios.post('/timer', time)

export const deleted = async (id) => 
  await axios.delete(`/timer/${id}`);