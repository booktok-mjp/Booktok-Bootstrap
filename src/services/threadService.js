import axios from 'axios';

const PATH = import.meta.env.VITE_API_THREADS_PATH;

export const getAllThreads = async (token) => {
  try {
    const response = await axios.get(`${PATH}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLoggedInUsersThreads = async (token) => {
  try {
    const response = await axios.get(`${PATH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
