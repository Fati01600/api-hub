import axios from "axios";

const API_URL = import.meta.env.VITE_URL+ "/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; 
  } catch (error) {
  console.log(import.meta.env.VITE_URL);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const addRole = async (role, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/addrole`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add role:", error);
    throw error;
  }
};
