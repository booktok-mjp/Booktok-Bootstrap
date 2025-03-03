import { useState } from 'react';
import { Button, Card, Carousel, ListGroup } from 'react-bootstrap';
import { GiSpellBook } from 'react-icons/gi';

import CustomHeader from '../header/CustomHeader';
import CustomIconButton from '../button/CustomIconButton';
import { Colors, Constants } from '../../config';

const books = [
  {
    title: 'Fourth Wing by Rebecca Yarros',
    img: 'https://m.media-amazon.com/images/I/91eCfZOaurL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Iron Flame by Rebecca Yarros',
    img: 'https://m.media-amazon.com/images/I/81cL2H23nVL.jpg',
  },
  {
    title: 'Onyx Storm by Rebecca Yarros',
    img: 'https://prodimage.images-bn.com/pimages/9781649374189_p1_v7_s600x595.jpg',
  },
];

// ! add functionality
const RecommendationCard = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Card
      className="recommendation-card mt-3 shadow-sm w-100"
      style={{ backgroundColor: Colors.ivory }}
    >
      <Card.Body>
        <Card.Title className="d-flex align-content-center mb-2">
          <span className="mx-2">
            <GiSpellBook color={Colors.brunswickGreen} fontSize="26pt" />
          </span>
          <CustomHeader
            color={Colors.darkSlateGray}
            text={Constants.recommendations}
          />
        </Card.Title>
        <Carousel
          indicators={false}
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
          className="px-5"
        >
          {books &&
            books.map((book, index) => (
              <Carousel.Item key={index}>
                <ListGroup.Item className="d-flex align-items-center">
                  <CustomIconButton size="sm" src={book.img} />
                  <span className="mx-1">{book.title}</span>
                </ListGroup.Item>
              </Carousel.Item>
            ))}
        </Carousel>
        <Button variant="link" style={{ color: Colors.beaver2 }}>
          See more recommendations
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RecommendationCard;
