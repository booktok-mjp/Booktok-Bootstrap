import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserBookcaseById } from '../services/bookcaseService';

const useBookcaseByUserId = (userId) => {
  const [userBooks, setUserBooks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBookcase = async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const books = await getUserBookcaseById({ token, userId });
        setUserBooks(books);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error);
      }
    };

    fetchBookcase();
  }, [getAccessTokenSilently]);

  return { userBooks, error, loading };
};

export default useBookcaseByUserId;
