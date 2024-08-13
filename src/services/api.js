import axios from 'axios';

const API_URL = 'http://localhost:80/api';


const handleExpiredToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
};

const handleError = (error) => {
    if (error.response && error.response.data.expired) {
        handleExpiredToken();
    } else {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        console.log('API login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/products/add`, productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error during fetching products:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserProducts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/products/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteAccount = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addPaymentMethod = async (paymentData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/users/profile/payment-method`, paymentData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deletePaymentMethod = async (paymentData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/users/profile/payment-method`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: paymentData // Send the payment data in the request body
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPaymentMethods = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/profile/payment-method`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};