import React from 'react';
import { useParams } from 'react-router-dom';

import useAllBooks from '../../hooks/book/useAllBooks';
import CustomCard from '../card/CustomCard';

const RelatedBooks = () => {
  const { allBooks: books } = useAllBooks();
  const { bookId } = useParams();

  return (
    <div className="w-75 m-auto mt-5">
      <h2 className="related-books-title mb-4">Related Books</h2>
      <div className="d-flex justify-content-around flex-wrap mt-5">
        {books
          .filter((book) => book.id !== bookId)
          .slice(0, 4)
          .map((relatedBook) => (
            <CustomCard book={relatedBook} showAddBtn key={relatedBook.id} />
          ))}
      </div>
    </div>
  );
};

export default RelatedBooks;