import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

import { getOneBook } from '../../services/bookService';
import BookDetailCard from '../../components/card/BookDetailCard';
import RelatedBooks from '../../components/relatedbooks/RelatedBooks';

import './BookDetailView.css';

const BookDetailView = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const { bookId } = useParams();

  const handleGetBookDetails = async () => {
    try {
      const token = await getAccessTokenSilently();
      const book = await getOneBook({ token, bookId });
      setCurrentBook(book);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetBookDetails();
  }, []);

  return (
    <div>
      {currentBook ? (
        <>
          <BookDetailCard currentBook={currentBook} />
          <RelatedBooks />
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailView;
