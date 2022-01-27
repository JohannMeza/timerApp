import axios from './axios';

export const index = async () => 
  await axios.get('/pomodoro')

export const uploadPomodoro = async (id, body) =>
  await axios.put(`/pomodoro/${id}`, body)

export const showPomodoro = async (id) => 
  await axios.get(`/pomodoro/${id}`)

export const storePomodoro = async (formData) => 
  await axios.post('/pomodoro', formData)

export const deleted = async (id) => 
  await axios.delete(`/pomodoro/${id}`)