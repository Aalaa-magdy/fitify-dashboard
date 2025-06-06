import axios from '../../../api/axiosInstance';

export const getAllWorkouts = async () => {
  try {
    const response = await axios.get('/workout');
    console.log("workouts", response.data); // Axios uses response.data
    return response.data;
  } catch (error) {
    // More comprehensive error handling
    if (error.response) {
    
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};