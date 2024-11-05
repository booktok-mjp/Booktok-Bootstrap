import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { BiBookAdd } from 'react-icons/bi';
import { FaBookReader } from 'react-icons/fa';

import './CustomCard.css';
import ReactIconButton from '../button/ReactIconButton';
import { Colors } from '../../config';

const CustomCard = ({ book, showAddBtn = true }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/book/${book.id}`);
  };

  const handleAddToBookcase = () => {
    console.log('add book to bookcase');
  };

  const handleSetReadingNow = (bookId) => {
    console.log('set to reading now', bookId);
  };

  return (
    <Card bg="light" className="mb-5 custom-card shadow-sm">
      <div className="custom-card-img-container">
        <Card.Img
          variant="top"
          src={book.imgUrl}
          onClick={handleNavigate}
          className="custom-card-img"
        />
      </div>
      <Card.Body
        className="d-flex flex-column"
        style={{ backgroundColor: Colors.ivory }}
      >
        <Card.Title>{book.title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {book.description.substring(0, 80)}...
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush bg-body-tertiary">
        <ListGroup.Item>{book.author_name}</ListGroup.Item>
      </ListGroup>
      <Card.Body
        className="text-center align-items-end"
        style={{ backgroundColor: Colors.ivory }}
      >
        {showAddBtn ? (
          <ReactIconButton
            icon={<BiBookAdd />}
            onClick={handleAddToBookcase}
            tooltipText="Add to Bookcase"
          />
        ) : (
          <ReactIconButton
            icon={<FaBookReader />}
            onClick={() => handleSetReadingNow(book.id)}
            tooltipText="Set to Reading Now"
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
