import { useEffect, useRef, useState } from 'react';
import { movieAction } from '../redux/actions/movieAction';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import './detail.css';
import MovieReview from '../components/MovieReview';
import MovieDetailBanner from '../components/MovieDetailBanner';
import MovieDetailInfo from '../components/MovieDetailInfo';
import MovieRelated from '../components/MovieRelated';
import { ClipLoader } from 'react-spinners';

const MovieDetail = ({}) => {
  const dispatch = useDispatch();

  const { detailMovies, videos, recommendMovies, reviews, loading } =
    useSelector((state) => state.movie);
  // console.log('detailMovies ', detailMovies);
  // console.log('recommendMovies', recommendMovies);

  let { id } = useParams();

  useEffect(() => {
    dispatch(movieAction.getDetailMovie(id));
  }, [id]); // DOM 준비 끝난 뒤 실행

  if (loading && !detailMovies) {
    return (
      <ClipLoader
        className="loader"
        color="#dc3545"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  return (
    <>
      {detailMovies && (
        <>
          <MovieDetailBanner detailMovies={detailMovies} videos={videos} />
          <Container>
            <MovieDetailInfo detailMovies={detailMovies} />
            <MovieRelated recommendMovies={recommendMovies} />
            <MovieReview reviews={reviews} />
          </Container>
        </>
      )}
    </>
  );
};

export default MovieDetail;
