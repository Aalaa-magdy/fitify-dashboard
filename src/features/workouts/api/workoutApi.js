import axios from '../../../api/axiosInstance';

// Get all workouts
export const getAllWorkouts = async () => {
  try {
    const response = await axios.get('/workout');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

// Create a new workout
export const createWorkout = async (formData) => {
  try {
    const response = await axios.post('/workout/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to create workout: ${error.response.data.message || error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received when trying to create workout');
    } else {
      throw new Error(`Error setting up create request: ${error.message}`);
    }
  }
};

// Update an existing workout
export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await axios.put(`/workout/${id}`, workoutData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to update workout: ${error.response.data.message || error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received when trying to update workout');
    } else {
      throw new Error(`Error setting up update request: ${error.message}`);
    }
  }
};

// Delete a workout
export const deleteWorkout = async (id) => {
  try {
    const response = await axios.delete(`/workout/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to delete workout: ${error.response.data.message || error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received when trying to delete workout');
    } else {
      throw new Error(`Error setting up delete request: ${error.message}`);
    }
  }
};

// Optional: Get single workout by ID
export const getWorkoutById = async (id) => {
  try {
    const response = await axios.get(`/workout/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to get workout: ${error.response.data.message || error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received when trying to get workout');
    } else {
      throw new Error(`Error setting up get request: ${error.message}`);
    }
  }
};