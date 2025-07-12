import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const signupUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/auth/signup`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || 'Signup failed' };
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/auth/login`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || 'Login failed' };
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || 'Logout failed' };
  }
};
