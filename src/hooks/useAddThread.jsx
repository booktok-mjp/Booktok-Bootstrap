import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

import { addNewThread } from '../services/threadService';

const useAddThread = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newThread, setNewThread] = useState(null);

  const handleAddThread = async (thread) => {
    setLoading(true);
    setError(null);

    console.log('thread in hook', thread);

    try {
      const token = await getAccessTokenSilently();
      const response = await addNewThread({ token, thread });
      console.log('response in hook:', response);
      setNewThread(response);
      return response;
    } catch (err) {
      console.error('Error creating new thread:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddThread,
    loading,
    error,
    newThread,
  };
};

export default useAddThread;
