import axios from '../../../api/axiosInstance';

// Get all workouts
export const getAllWorkouts = async () => {
    const response = await axios.get('/workout');
    return response.data;
};

// Create a new workout
export const createWorkout = async (formData) => {
    const response = await axios.post('/workout/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
};

// Update an existing workout
export const updateWorkout = async (id, workoutData) => {
    const response = await axios.put(`/workout/${id}`, workoutData);
    return response.data;
};

// Delete a workout
export const deleteWorkout = async (id) => {
    const response = await axios.delete(`/workout/${id}`);
    return response.data;
};

// Optional: Get single workout by ID
export const getWorkoutById = async (id) => {
    const response = await axios.get(`/workout/${id}`);
    return response.data;
};