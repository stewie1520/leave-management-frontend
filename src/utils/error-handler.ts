import axios from 'axios';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: Array<{ field: string; message: string }>;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    if (response) {
      if (response.errors && response.errors.length > 0) {
        return response.errors.map(err => `${err.field}: ${err.message}`).join(', ');
      }

      if (response.message) {
        return response.message;
      }
      
      if (response.error) {
        return response.error;
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.';
    }
    
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }
    
    switch (error.response.status) {
      case 401:
        return 'Authentication failed. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Error: ${error.response.status} ${error.response.statusText}`;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred.';
};

export const handleApiError = (error: unknown): string => {
  return getErrorMessage(error);
};
