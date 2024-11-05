import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getLoggedInUsersBookcase } from '../services/bookcaseService';

const useBookcase = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBookcase = async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const books = await getLoggedInUsersBookcase(token);
        setBooks(books.books);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error);
      }
    };

    fetchBookcase();
  }, [getAccessTokenSilently]);

  return { books, error, loading };
};

export default useBookcase;
