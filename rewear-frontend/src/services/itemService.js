import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadItem = async (formData) => {
  try {
    const res = await axios.post(`${API}/items`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || 'Item upload failed' };
  }
};

export const getItem = async (id) => {
  try {
    const res = await axios.get(`${API}/items/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: 'Failed to fetch item' };
  }
};

export const getAllItems = async () => {
  try {
    const res = await axios.get(`${API}/admin/items`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: 'Failed to fetch items' };
  }
};

export const redeemItem = async (id) => {
  try {
    const res = await axios.post(`${API}/items/${id}/redeem`, {}, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || 'Failed to redeem item' };
  }
};

export const updateItemStatus = async (id, status) => {
  try {
    const res = await axios.put(`${API}/admin/items/${id}`, { status }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: 'Failed to update item status' };
  }
};

export const deleteItem = async (id) => {
  try {
    const res = await axios.delete(`${API}/admin/items/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return { error: 'Failed to delete item' };
  }
};
