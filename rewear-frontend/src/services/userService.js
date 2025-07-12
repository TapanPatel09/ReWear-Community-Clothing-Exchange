import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getProfile = async () => {
  try {
    const res = await axios.get(`${API}/user/profile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: 'Failed to fetch user profile' };
  }
};
