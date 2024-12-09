import React from 'react';
import { useParams } from 'react-router-dom';
import SingleThread from '../../components/thread/SingleThread';

const ThreadView = () => {
  const { threadId } = useParams();
  return (
    <div>
      <SingleThread threadId={threadId} />
    </div>
  );
};

export default ThreadView;
