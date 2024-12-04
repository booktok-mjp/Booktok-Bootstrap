import React from 'react';
import ThreadListItem from './ThreadListItem';
import ListGroup from 'react-bootstrap/ListGroup';

const ThreadList = ({ threads }) => {
  return (
    <ListGroup as="ol">
      {threads &&
        threads.map((thread) => (
          <ThreadListItem key={thread.id} thread={thread} />
        ))}
    </ListGroup>
  );
};

export default ThreadList;
