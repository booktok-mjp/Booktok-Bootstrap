import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import CustomHeader from '../../components/header/CustomHeader';
import CustomCard from '../../components/card/CustomCard';
import useBookcase from '../../hooks/useBookcase';

import './BookcaseView.css';

const BookcaseView = () => {
  const { books } = useBookcase();

  // add functionality
  const readingNow = 3;
  const readingNowBook = books.find((book) => book.id === readingNow);

  return (
    <Container className="bookcase-view-container">
      <div>hi</div>
    </Container>
  );
};

export default BookcaseView;
