import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Container, Row } from 'react-bootstrap';

import SearchBar from '../../components/search/SearchBar';
import MiniBookcase from '../../components/bookcase/mini/MiniBookcase';
import Divider from '../../components/divider/Divider';
import CustomGrid from '../../components/grid/CustomGrid';
import CustomCard from '../../components/card/CustomCard';
import RecommendationCard from '../../components/recommendation/RecommendationCard';
import useAllBooks from '../../hooks/book/useAllBooks';
import colors from '../../config/colors';

const HomeView = () => {
  const { user } = useAuth0();
  const { allBooks } = useAllBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setFilteredBooks(allBooks);
  }, [allBooks]);

  const handleSearch = (searchResults) => {
    setFilteredBooks(searchResults);
  };

  const customBookCards =
    filteredBooks &&
    filteredBooks.map((book) => (
      <CustomCard
        key={book.id}
        book={book}
        onAddToBookcase={() => handleAddBook(book)}
      />
    ));

  return (
    <Container>
      <Row>
        <Col>
          <SearchBar
            placeholder="Search books and authors..."
            onSearch={handleSearch}
            allBooks={allBooks}
          />
        </Col>
      </Row>
      <Divider color={colors.navyBlue} thickness="1px" marginBottom="40px" />
      <Row className="justify-content-center">
        <Col
          lg={4}
          xs={12}
          className="d-flex flex-column align-items-center mb-4"
        >
          <MiniBookcase />
          <RecommendationCard />
        </Col>
        <Col lg={8} xs={12}>
          <CustomGrid items={customBookCards} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
