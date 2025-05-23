import api from '../api';

// Login service function
export const login = async (email, password,isRemember) => {

  try {
    console.log("before log");
    
    const response = await api.post('/user/auth/login', {"password": password ,"email": email});

    if (response.data.token) {
      console.log("save token"+response.data.token);
        
      localStorage.setItem('token', response.data.token);
      return { success: true, message: 'Login successful', data: response.data };
    } else {
      return { success: false, message: 'Login failed: No token returned' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};
