import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CustomHeader from '../../components/header/CustomHeader';
import CustomCard from '../../components/card/CustomCard';
import useBookcase from '../../hooks/useBookcase';
import BookDetailCard from '../../components/card/BookDetailCard';

import './BookcaseView.css';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import { Colors } from '../../config';

const BookcaseView = () => {
  const { books, loading, fetchBookcase } = useBookcase();

  // add functionality
  const readingNow = 2;
  const readingNowBook = books.find((book) => book.id === readingNow);

  const customBookCards =
    books &&
    books.map((book) => (
      <CustomCard
        book={book}
        fetchBookcase={fetchBookcase}
        isBookcaseView={true}
        key={book.id}
        showAddBtn={false}
      />
    ));

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="bookcase-view-container">
      <Row className="mb-4">
        <CustomHeader color={Colors.navyBlue} text="My Bookcase" size="xlg" />
      </Row>
      <Row className="reading-now-container">
        <Col className="reading-now sticky-col" lg={5} xs={12}>
          <CustomHeader text="Reading Now..." />
          {readingNowBook && (
            <BookDetailCard
              isBookcaseView={true}
              currentBook={readingNowBook}
            />
          )}
        </Col>
        <Col lg={7} xs={12} className="d-flex flex-wrap justify-content-around">
          {customBookCards}
        </Col>
      </Row>
    </Container>
  );
};

export default BookcaseView;
