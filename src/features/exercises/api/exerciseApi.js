import axios from "../../../api/axiosInstance";

export const getAllExercises = async () => {
  const response = await axios.get('/exercise');
  return response.data;
};

export const createExercise = async (formData) => {
  const response = await axios.post('/exercise/create', formData);
  return response.data;
};

export const updateExercise = async (id, exerciseData) => {
  const response = await axios.put(`/exercise/${id}`, exerciseData);
  return response.data;
};

export const deleteExercise = async (id) => {
  const response = await axios.delete(`/exercise/${id}`);
  return response.data;
};