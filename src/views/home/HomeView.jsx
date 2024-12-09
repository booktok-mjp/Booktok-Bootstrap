import { useEffect, useState, useCallback } from 'react';
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
import CustomAlert from '../../components/alert/CustomAlert';
import { getLoggedInUsersBookcase } from '../../services/bookcaseService';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';

const HomeView = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { allBooks, loading } = useAllBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookcaseBooks, setBookcaseBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ body: '', heading: '', variant: '' });

  const fetchBookcase = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const bookcase = await getLoggedInUsersBookcase(token);
      setBookcaseBooks(bookcase.books);
    } catch (error) {
      console.error('Error fetching bookcase:', error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    setFilteredBooks(allBooks);
  }, [allBooks]);

  useEffect(() => {
    fetchBookcase();
  }, [fetchBookcase]);

  const handleSearch = (searchResults) => {
    setFilteredBooks(searchResults);
  };

  const customBookCards =
    filteredBooks &&
    filteredBooks.map((book) => (
      <CustomCard
        key={book.id}
        book={book}
        setAlert={setAlert}
        setShowAlert={setShowAlert}
        fetchBookcase={fetchBookcase}
      />
    ));

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <MiniBookcase
            books={bookcaseBooks}
            fetchBookcase={fetchBookcase}
            setAlert={setAlert}
          />
          <RecommendationCard />
        </Col>
        <Col lg={8} xs={12}>
          <CustomGrid items={customBookCards} />
        </Col>
      </Row>
      {showAlert && (
        <CustomAlert
          body={alert.body}
          heading={alert.heading}
          variant={alert.variant}
          setShowAlert={setShowAlert}
        />
      )}
    </Container>
  );
};

export default HomeView;
