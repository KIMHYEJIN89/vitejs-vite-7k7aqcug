import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ReviewItem from './ReviewItem';
const MovieReview = ({ reviews }) => {
  return (
    <>
      <Row className="review-section">
        <Col>
          <h2>Reviews</h2>
          {reviews.results.length > 0 ? (
            reviews.results.map((item) => (
              <ReviewItem author={item.author} content={item.content} />
            ))
          ) : (
            <div>0 reviews for this movie</div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MovieReview;
