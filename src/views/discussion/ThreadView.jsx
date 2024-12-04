import React from 'react';
import { useParams } from 'react-router-dom';

const ThreadView = () => {
  const { threadId } = useParams();
  console.log(threadId);
  return <div>ThreadView</div>;
};

export default ThreadView;
