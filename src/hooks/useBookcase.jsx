import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getLoggedInUsersBookcase } from '../services/bookcaseService';

const useBookcase = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const fetchBookcase = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const bookcase = await getLoggedInUsersBookcase(token);
      setBooks(bookcase.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching bookcase:', error);
      setError(error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchBookcase();
  }, []);

  return { books, error, loading, fetchBookcase };
};

export default useBookcase;
