import axios from "../../../api/axiosInstance";

// Challenge API functions
export const getAllChallenges = async () => {
  const response = await axios.get('/challenge');
  return response.data;
};

export const createChallenge = async (formData) => {
  const response = await axios.post('/challenge/create', formData);
  return response.data;
};

export const updateChallenge = async (id, challengeData) => {
  const response = await axios.put(`/challenge/${id}`, challengeData);
  return response.data;
};

export const deleteChallenge = async (id) => {
  const response = await axios.delete(`/challenge/${id}`);
  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await axios.get(`/challenge/${id}`);
  return response.data;
};

// Exercise API functions
export const getExerciseById = async (id) => {
  const response = await axios.get(`/exercise/${id}`);
  return response.data;
};

// Trivia Questions API functions
export const getTriviaQuestionById = async (id) => {
  const response = await axios.get(`/trivia-questions/${id}`);
  return response.data;
};

export const createTriviaQuestion = async (formData) => {
  const response = await axios.post('/trivia-questions/createTriviaQuestion', formData);
  return response.data;
};

export const updateTriviaQuestion = async (id, triviaData) => {
  const response = await axios.put(`/trivia-questions/${id}`, triviaData);
  return response.data;
};

export const deleteTriviaQuestion = async (id) => {
  const response = await axios.delete(`/trivia-questions/${id}`);
  return response.data;
};