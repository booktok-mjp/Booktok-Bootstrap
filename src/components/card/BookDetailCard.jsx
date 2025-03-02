import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import { addBookToBookcase } from '../../services/bookcaseService';
import useBookcase from '../../hooks/useBookcase';
import CustomAlert from '../alert/CustomAlert';

const BookDetailCard = ({ currentBook, isBookcaseView }) => {
  const { fetchBookcase } = useBookcase();
  const { getAccessTokenSilently } = useAuth0();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);

  const handleAddToBookcase = async (bookId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await addBookToBookcase({ token, bookId });
      console.log('response', response);
      setShowAlert(true);
      await fetchBookcase();
    } catch (error) {
      console.error('Error adding book', error);
      setError(true);
      setShowAlert(true);
    }
  };
  return (
    <div data-testid="book-detail-container" className="book-detail-container">
      <div className="book-detail-card">
        <div className="book-detail-header">
          <img
            src={currentBook.imgUrl}
            alt={`${currentBook.title} cover`}
            className="book-detail-img"
          />
          <div className="book-detail-info">
            <h1 className="book-title">{currentBook.title}</h1>
            <p className="book-description">{currentBook.description}</p>
            <div className="d-grid gap-2">
              {!isBookcaseView && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleAddToBookcase(currentBook.id)}
                >
                  Add to Bookcase
                </Button>
              )}

              {showAlert && !error && (
                <CustomAlert
                  variant="success"
                  body="Successfully added to your bookcase!"
                  heading="Nice!"
                  setShowAlert={setShowAlert}
                />
              )}
              {showAlert && error && (
                <CustomAlert
                  variant="danger"
                  body="Book is already in your bookcase!"
                  heading="Oops!"
                  setShowAlert={setShowAlert}
                />
              )}
            </div>
          </div>
        </div>
        <div className="author-section">
          <img
            src={currentBook.author_imgUrl}
            alt={`${currentBook.author_name}`}
            className="author-img"
          />
          <div className="author-info">
            <h2 className="author-name">{currentBook.author_name}</h2>
            <p className="author-bio">{currentBook.author_bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailCard;
