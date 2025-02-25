import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import BookDetailCard from '../../components/card/BookDetailCard';
import RelatedBooks from '../../components/relatedbooks/RelatedBooks';

import './BookDetailView.css';

const BookDetailView = () => {
  const location = useLocation();
  const book = location.state;

  return (
    <div>
      {book ? (
        <>
          <BookDetailCard currentBook={book} />
          <RelatedBooks />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BookDetailView;
