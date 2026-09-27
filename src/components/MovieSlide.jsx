import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../components/MovieCard';
import './movieSlider.css';

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

const MovieSlide = ({ movies }) => {
  const [isDragging, setIsDragging] = useState(false);
  //console.log('무비슬라이드 movies', movies);
  return (
    <>
      <Carousel
        responsive={responsive}
        touch
        onTouchStart={() => setIsDragging(false)}
        onTouchMove={() => setIsDragging(true)}
        className="carousel-container"
      >
        {movies.results.map((item) => (
          <MovieCard key={item.id} item={item} isDragging={isDragging} />
        ))}
      </Carousel>
    </>
  );
};

export default MovieSlide;
