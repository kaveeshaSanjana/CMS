import api from '../api';

// Get all causes
export const getAllCauses = async (count) => {
  try {
    const response = await api.get(`/cause/${count}`);
    console.log(response.data);
    
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to fetch causes' };
  }
};

// Get a causes
export const getCause = async (id) => {
  try {
    const response = await api.get(`/cause/details/${id}`);
    console.log(response.data);
    
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to fetch causes' };
  }
};

// Create a cause (for ADMIN/TEACHER roles)
export const createCause = async (causeDTO) => {
  try {
    const response = await api.get(`/cause/create`, { data: causeDTO });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to create cause' };
  }
};

// Soft delete cause (for ADMIN/TEACHER roles)
export const softDeleteCause = async (id) => {
  try {
    const response = await api.delete(`/cause/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to delete cause' };
  }
};

// Update a cause
export const updateCause = async (causeDTO) => {
  try {
    const response = await api.put('/cause', causeDTO);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to update cause' };
  }
};

// Hard delete (for ADMIN role only)
export const hardDeleteCause = async (id) => {
  try {
    const response = await api.delete(`/cause/admin/delete/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to hard delete cause' };
  }
};
