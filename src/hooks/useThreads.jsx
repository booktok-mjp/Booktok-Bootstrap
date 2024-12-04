import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getAllThreads,
  getLoggedInUsersThreads,
} from '../services/threadService';

const useThreads = () => {
  const [allThreads, setAllThreads] = useState([]);
  const [myThreads, setMyThreads] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const [all, mine] = await Promise.all([
        getAllThreads(token),
        getLoggedInUsersThreads(token),
      ]);
      setAllThreads(all);
      setMyThreads(mine);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching threads:', error);
      setError(error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return { allThreads, myThreads, error, loading, fetchThreads };
};

export default useThreads;
