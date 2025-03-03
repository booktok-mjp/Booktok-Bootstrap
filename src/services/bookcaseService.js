import axios from 'axios';

const PATH = import.meta.env.VITE_API_BOOKCASE_PATH;

export const getLoggedInUsersBookcase = async (token) => {
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

export const getUserBookcaseById = async ({ token, userId }) => {
  try {
    const response = await axios.get(`${PATH}/${userId}`, {
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

export const deletedBookFromBookcase = async ({ token, bookId }) => {
  try {
    const response = await axios.delete(`${PATH}/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('error deleting book from bookcase', error);
    throw error;
  }
};

export const addBookToBookcase = async ({ token, bookId }) => {
  try {
    const response = await axios.post(
      `${PATH}/book/${bookId}`,
      {}, // empty payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('error adding book to bookcase', error);
    throw error;
  }
};
