import axios from 'axios';

const PATH = import.meta.env.VITE_API_BOOKs_PATH;

export const getAllBooks = async (token) => {
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

export const getOneBook = async ({ token, bookId }) => {
  try {
    const response = await axios.get(`${PATH}/${bookId}`, {
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
