import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import BodyText from '../typography/BodyText';

import './ThreadListItem.css';

const ThreadListItem = ({ thread }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/discussions/${id}`);
  };

  return (
    <ListGroupItem
      as="li"
      className="d-flex justify-content-between align-items-start mb-2 item-container"
      onClick={() => handleNavigate(thread.id)}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{thread.title}</div>
        <div>{thread.subject}</div>
        <BodyText text={thread.book} />
      </div>
      <Badge bg="danger" pill>
        {thread.messages.length}
      </Badge>
    </ListGroupItem>
  );
};

export default ThreadListItem;
