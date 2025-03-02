import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CustomHeader from '../../components/header/CustomHeader';
import CustomCard from '../../components/card/CustomCard';
import useBookcase from '../../hooks/useBookcase';
import BookDetailCard from '../../components/card/BookDetailCard';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import { Colors } from '../../config';

import './BookcaseView.css';

const BookcaseView = () => {
  const { books, loading, fetchBookcase } = useBookcase();

  // TODO: change user schema and add currentlyReading Book. For now, using local storage.
  const [readingNow, setReadingNow] = useState(() => {
    const stored = localStorage.getItem('readingNow');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem('readingNow', JSON.stringify(readingNow));
  }, [readingNow]);

  const currentlyReading = useMemo(() => {
    return readingNow ? books.find((book) => book.id === readingNow.id) : null;
  }, [readingNow, books]);

  const filteredBooks = readingNow
    ? books.filter((book) => book.id !== readingNow.id)
    : books;

  const customBookCards = useMemo(() => {
    return filteredBooks.map((book) => {
      const isBeingRead = readingNow ? book.id === readingNow.id : false;
      return (
        <CustomCard
          book={book}
          fetchBookcase={fetchBookcase}
          isBookcaseView={true}
          key={book.id}
          showAddBtn={false}
          isBeingRead={isBeingRead}
          setReadingNow={setReadingNow}
        />
      );
    });
  }, [filteredBooks, readingNow, fetchBookcase]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="bookcase-view-container">
      <Row className="mb-4">
        <CustomHeader color={Colors.navyBlue} text="My Bookcase" size="xlg" />
      </Row>
      <Row
        data-testid="reading-now-container"
        className="reading-now-container"
      >
        {currentlyReading && (
          <Col className="reading-now mb-4" lg={5} xs={12}>
            <div className="mb-3">
              <CustomHeader text="Reading Now..." />
            </div>
            <BookDetailCard
              isBookcaseView={true}
              currentBook={currentlyReading}
            />
          </Col>
        )}
        <Col
          lg={currentlyReading ? 7 : 12}
          xs={12}
          className="d-flex flex-wrap justify-content-around"
        >
          {customBookCards}
        </Col>
      </Row>
    </Container>
  );
};

export default BookcaseView;
