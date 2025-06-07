import axios from '../../../api/axiosInstance';

// Get all workouts
export const getMyProfile = async () => {
  try {
    const response = await axios.get('/users/my-profile');
    console.log(response)
    return response.data.data;
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