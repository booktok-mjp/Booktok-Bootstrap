import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getAllBooks } from '../../services/bookService';

const useAllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBookcase = async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const books = await getAllBooks(token);
        console.log('hook', books);
        setAllBooks(books);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error);
      }
    };

    fetchBookcase();
  }, []);

  return { allBooks, error, loading };
};

export default useAllBooks;
