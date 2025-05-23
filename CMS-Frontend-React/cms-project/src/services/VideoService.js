import api from "../api";

export const getAllVideos = async (id) => {
    try {
        const response = await api.get(`/cause/video/${id}`);
        console.log(response.data);
        
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to fetch videos' };
    }
}