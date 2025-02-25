import axios from 'axios';

const PATH = import.meta.env.VITE_API_THREADS_PATH;

export const getAllThreads = async (token) => {
  try {
    const response = await axios.get(`${PATH}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getThreadById = async ({ token, threadId }) => {
  try {
    const response = await axios.get(`${PATH}/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addMessageToThread = async ({ token, message, threadId }) => {
  try {
    const response = await axios.put(`${PATH}/${threadId}`, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addNewThread = async ({ token, thread }) => {
  console.log('thread in service: ', thread);
  try {
    const response = await axios.post(`${PATH}`, thread, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
