import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, ListGroup } from 'react-bootstrap';
import { GiBookshelf } from 'react-icons/gi';
import { BsFillTrashFill } from 'react-icons/bs';

import CustomHeader from '../../header/CustomHeader';
import ReactIconButton from '../../button/ReactIconButton';
import bookImg from '../../../assets/images/books.png';
import { Colors } from '../../../config';
import { deletedBookFromBookcase } from '../../../services/bookcaseService';

import './MiniBookcase.css';

const MiniBookcase = ({ books, fetchBookcase }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleRemoveBook = async (bookId) => {
    try {
      const token = await getAccessTokenSilently();
      await deletedBookFromBookcase({ token, bookId });
      fetchBookcase();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const latestBooks =
    books && books.length > 0
      ? [...books].sort((a, b) => b.id - a.id).slice(0, 3)
      : [];

  return (
    <Card className="minicase-card-container shadow-lg w-100">
      <Card.Img variant="top" src={bookImg} className="minicase-img" />
      <Card.Body className="minicase-body">
        <div className="d-flex align-items-center">
          <span className="mx-2">
            <GiBookshelf fontSize="30pt" color={Colors.brunswickGreen} />
          </span>
          <CustomHeader
            text="Your Latest Reads"
            size="lg"
            color={Colors.brunswickGreen}
          />
        </div>
        <ListGroup as="ol" className="p-3">
          {books.length === 0 || !books ? (
            <p>No books in the bookcase yet.</p>
          ) : (
            latestBooks.map((book) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center mb-2 minicase-book"
                key={book.id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold minicase-book-title">
                    {book.title}
                  </div>
                  <span className="minicase-book-author">
                    {book.author_name}
                  </span>
                </div>
                <ReactIconButton
                  icon={<BsFillTrashFill />}
                  onClick={() => handleRemoveBook(book.id)}
                  tooltipText="Delete from Bookcase"
                />
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default MiniBookcase;
