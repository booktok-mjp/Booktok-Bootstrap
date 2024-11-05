import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { GiBookshelf } from 'react-icons/gi';
import { BsFillTrashFill } from 'react-icons/bs';

import CustomHeader from '../../header/CustomHeader';
import useBookcase from '../../../hooks/useBookcase';
import { Colors, Constants } from '../../../config';
import bookImg from '../../../assets/images/books.png';
import './MiniBookcase.css';
import ReactIconButton from '../../button/ReactIconButton';
import { useAuth0 } from '@auth0/auth0-react';
import { deletedBookFromBookcase } from '../../../services/bookcaseService';

const MiniBookcase = () => {
  const { books, error, loading } = useBookcase();
  const { getAccessTokenSilently, user } = useAuth0();

  const handleRemoveBook = async (bookId) => {
    try {
      const token = await getAccessTokenSilently();
      //! fix user id situation
      const data = await deletedBookFromBookcase({ token, bookId });
    } catch (error) {}
  };

  return (
    <Card className="minicase-card-container shadow-sm w-100">
      <Card.Img variant="top" src={bookImg} className="minicase-img" />
      <Card.Body className="minicase-body">
        <div className="d-flex align-items-center">
          <span className="mx-2">
            <GiBookshelf fontSize="30pt" color={Colors.brunswickGreen} />
          </span>
          <CustomHeader
            text={Constants.myMinicase}
            size="lg"
            color={Colors.brunswickGreen}
          />
        </div>

        <ListGroup as="ol" className="p-3">
          {books && books.length === 0 ? (
            <p>No books in the bookcase yet.</p>
          ) : (
            books &&
            books.map((book) => (
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
