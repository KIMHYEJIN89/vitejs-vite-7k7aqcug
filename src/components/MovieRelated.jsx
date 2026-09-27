import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './movieSlider.css';
import MovieRelatedCard from '../components/MovieRelatedCard';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const MovieRelated = ({ recommendMovies }) => {
  return (
    <>
      <Row>
        <Col>
          <h2>Related Movies</h2>
          <Carousel responsive={responsive} className="carousel-container">
            {recommendMovies.results.map((item) => (
              <MovieRelatedCard key={item.id} item={item} />
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default MovieRelated;
