import { useCallback, useEffect, useState } from 'react';

import { getThreadById } from '../services/threadService';
import { useAuth0 } from '@auth0/auth0-react';

const useThreadById = (threadId) => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const { getAccessTokenSilently } = useAuth0();

  const fetchThreadById = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const thread = await getThreadById({ token, threadId });
      setThread(thread);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching thread:', error);
      setError(error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchThreadById();
  }, [fetchThreadById]);

  return { thread, loading, error };
};

export default useThreadById;
