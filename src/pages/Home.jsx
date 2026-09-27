import { useEffect, useState } from 'react';
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);
  // console.log('home popularMovies  : ', popularMovies);
  // console.log('home topRatedMovies  : ', topRatedMovies);
  // console.log('home upcomingMovies  : ', upcomingMovies);
  //API 호출
  // useEffect 함수 호출 시점  : 랜더를 하고 useEffect호출!!

  useEffect(() => {
    dispatch(movieAction.getMovies(''));
  }, []);
  // loading이 true면 loading스피너를 보여주고,
  // loading이 false면 데이터를 보여주고
  // 영화 데이터 도착하기전 spinner 보여줄거임!!
  // true : 데이터 도착 전
  // false : 데이터 도착 후, 에러가 났을때,
  if (loading || !popularMovies?.results) {
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
      {/* {popularMovies.results && (
        <Banner movie={popularMovies.results[0]} 조건부 랜더링 />
      )} */}

      <Banner movie={popularMovies.results[0]} />
      <div className="px-5 movie-list-wrap">
        <h1>Popular Movie</h1>
        <MovieSlide
          movies={popularMovies} /* 컴포넌트는 동일, 그치만 데이터는 다르게 */
        />
        <h1>Top rated Movie</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1>Upcoming Movie</h1>
        <MovieSlide movies={upcomingMovies} />
      </div>
    </>
  );
};

export default Home;
