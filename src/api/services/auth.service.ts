import axiosInstance from '../axios';
import {
  EmployeeResponse,
  LoginRequest,
  LoginResponse,
} from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    
    localStorage.setItem('accessToken', response.data.value);
    
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get<EmployeeResponse>('/employee');
    return response.data;
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout');

    localStorage.removeItem('accessToken');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
};

export default authService;
