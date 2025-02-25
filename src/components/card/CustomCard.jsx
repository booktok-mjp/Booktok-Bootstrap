import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { BiBookAdd } from 'react-icons/bi';
import { FaBookReader } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';

import ReactIconButton from '../button/ReactIconButton';
import { Colors } from '../../config';
import {
  addBookToBookcase,
  deletedBookFromBookcase,
} from '../../services/bookcaseService';
import BodyText from '../typography/BodyText';

import './CustomCard.css';

const CustomCard = ({
  book,
  showAddBtn = true,
  fetchBookcase,
  isBookcaseView,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/book/${book.id}`, { state: book });
  };

  const handleAddToBookcase = async (bookId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await addBookToBookcase({ token, bookId });
      console.log('response', response);
      await fetchBookcase();
    } catch (error) {
      console.error('Error adding book', error);
      r;
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      const token = await getAccessTokenSilently();
      await deletedBookFromBookcase({ token, bookId });
      await fetchBookcase();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
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
        <BodyText
          text={`${book.description.substring(0, 70)}...`}
          className="flex-grow-1"
        />
      </Card.Body>
      <ListGroup className="list-group-flush bg-body-tertiary">
        <ListGroup.Item>{book.author_name}</ListGroup.Item>
      </ListGroup>
      <Card.Body
        className="text-center align-items-end"
        style={{ backgroundColor: Colors.ivory }}
      >
        <div className="d-flex justify-content-between w-100">
          {showAddBtn ? (
            <ReactIconButton
              icon={<BiBookAdd />}
              onClick={() => handleAddToBookcase(book.id)}
              tooltipText="Add to Bookcase"
            />
          ) : (
            <ReactIconButton
              icon={<FaBookReader />}
              onClick={() => handleSetReadingNow(book.id)}
              tooltipText="Set to Reading Now"
            />
          )}
          {isBookcaseView && (
            <ReactIconButton
              icon={<BsFillTrashFill />}
              onClick={() => handleRemoveBook(book.id)}
              tooltipText="Delete from Bookcase"
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
