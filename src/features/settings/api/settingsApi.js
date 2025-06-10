import { toast } from 'react-toastify';
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

export const addAdmin = async (data) => {
    try {
    const response = await axios.post('/users/admin/add', data);
    console.log(response)
    toast.success("New admin added successfully")
    return response.data.data;
  } catch (error) {
    toast.error("somthing went wrong");
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

export const editPassword = async (data) => {
    try {
    const response = await axios.put('/users/change-password', data);
    console.log(response)
    toast.success("Password changed successfully")
    return response.data.data;
  } catch (error) {
    toast.error("somthing went wrong");
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}

export const editInfo = async (data) => {
    try {
    const response = await axios.put('/users/update-info', data);
    console.log(response)
    toast.success("Data updated successfully")
    return response.data.data;
  } catch (error) {
    toast.error("somthing went wrong");
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
    
  }
}