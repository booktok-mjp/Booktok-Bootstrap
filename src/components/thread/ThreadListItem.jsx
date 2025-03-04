import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

import BodyText from '../typography/BodyText';
import { Colors } from '../../config';

import './ThreadListItem.css';

const ThreadListItem = ({ thread }) => {
  return (
    <ListGroupItem
      as="li"
      className="d-flex justify-content-between align-items-start mb-2 item-container"
      style={{
        backgroundColor: Colors.ivory,
        borderBottom: '1px solid rgba(0, 0, 0, 0.702)',
      }}
      action={true}
    >
      <div className="ms-2 me-auto">
        <Link
          className="list-item-link"
          to={{ pathname: `/discussions/${thread.id}` }}
        >
          <div className="fw-bold">{thread.title}</div>
        </Link>
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
