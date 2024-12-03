import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import CustomHeader from '../../components/header/CustomHeader';
import CustomCard from '../../components/card/CustomCard';
import useBookcase from '../../hooks/useBookcase';

import './BookcaseView.css';
import BookDetailCard from '../../components/card/BookDetailCard';
import CustomGrid from '../../components/grid/CustomGrid';

const BookcaseView = () => {
  const { books } = useBookcase();

  // add functionality
  const readingNow = 4;
  const readingNowBook = books.find((book) => book.id === readingNow);

  const customBookCards =
    books &&
    books.map((book) => (
      <CustomCard key={book.id} book={book} showAddBtn={false} />
    ));

  return (
    <Container className="bookcase-view-container">
      <CustomHeader text="My Bookcase" size="xlg" />
      <Row>
        <Col lg={4} xs={12}>
          {readingNowBook && <BookDetailCard currentBook={readingNowBook} />}
        </Col>
        <Col lg={8} xs={12} className="d-flex flex-wrap justify-content-evenly">
          {customBookCards}
        </Col>
      </Row>
    </Container>
  );
};

export default BookcaseView;
