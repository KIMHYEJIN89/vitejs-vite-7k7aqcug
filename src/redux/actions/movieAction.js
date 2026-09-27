import api from '../api';

// Vite 방식
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

// 기존 방식
//const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    //데이터 도착 전
    try {
      dispatch({ type: 'GET_MOVIES_REQUEST' }); // 로딩 true
      // console.log('API_KEY', API_KEY);

      const popularMovieApi = api.get(`/movie/popular?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const topRatedApi = api.get(`/movie/top_rated?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const upComingApi = api.get(`/movie/upcoming?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const genreApi = api.get(`/genre/movie/list?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upComingApi,
          genreApi,
        ]); // promise 다 받을때까지, 한번만 기다려! 동시에 다 진행시켜

      //데이터 도착 후(Promise.all)

      dispatch({
        // 액션 사용 할때,
        type: 'GET_MOVIES_SUCCESS',
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        },
      });

      // console.log(popularMovies);
      // console.log(topRatedMovies);
      // console.log(upcomingMovies);
      // console.log('장르', genreList);
      // await를 계속 반복하게 쓰면 await계속 기다리는건데, promise가 한번에 병렬로 처리

      // 강의는 v3버전인것같고, 내꺼는 v4버전이라서 토큰 방식으로 사용 해야한다고 함
      // 토큰 : 인증용 열쇠 (문자열)
      // 헤더 = 편지 봉투 (HTTP 요청의 메타정보 공간)
      // Authorization 헤더 : 내가 인증됐어요 라고 서버에 알려주는 특별한 헤더!
      // 즉 TMDB에 로그인 없어도 v4토큰으로 인증해서 인기 영화 데이터를 가져오는 코드!!

      // let url = `https://api.themoviedb.org/3/`;
      // let response = await fetch(url);
      // let data = await response.json();
    } catch (error) {
      //에러 핸들링
      dispatch({ type: 'GET_MOVIES_FAIURE' });
    }
  };
}

function getAllMovies(query, page) {
  return async (dispatch) => {
    //데이터 도착 전
    try {
      dispatch({ type: 'GET_MOVIES_REQUEST' }); // 로딩 true
      // console.log('API_KEY', API_KEY);

      const discoverApi = api.get(
        `/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const searchMovieApi = api.get(
        `/search/movie?query=${query}&include_adult=false?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const genreApi = api.get(`/genre/movie/list?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      let [discoverMovies, searchMovies, genreList] = await Promise.all([
        discoverApi,
        searchMovieApi,
        genreApi,
      ]); // promise 다 받을때까지, 한번만 기다려! 동시에 다 진행시켜

      //데이터 도착 후(Promise.all)

      dispatch({
        // 액션 사용 할때,
        type: 'GET_MOVIES_SUCCESS',
        payload: {
          discoverMovies: discoverMovies.data,
          searchMovies: searchMovies.data,
          genreList: genreList.data.genres,
        },
      });
    } catch (error) {
      //에러 핸들링
      dispatch({ type: 'GET_MOVIES_FAIURE' });
    }
  };
}

function getDetailMovie(id) {
  return async (dispatch) => {
    //데이터 도착 전
    try {
      dispatch({ type: 'GET_MOVIES_REQUEST' }); // 로딩 true
      //console.log('API_KEY', API_KEY)

      const detailMovieApi = api.get(`/movie/${id}?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const videosApi = api.get(`/movie/${id}/videos?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const recommendMoviesApi = api.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const reviewsApi = api.get(`/movie/${id}/reviews?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      let [detailMovies, videos, recommendMovies, reviews] = await Promise.all([
        detailMovieApi,
        videosApi,
        recommendMoviesApi,
        reviewsApi,
      ]); // promise 다 받을때까지, 한번만 기다려! 동시에 다 진행시켜

      //데이터 도착 후(Promise.all)

      dispatch({
        // 액션 사용 할때,
        type: 'GET_MOVIES_SUCCESS',
        payload: {
          detailMovies: detailMovies.data,
          videos: videos.data,
          recommendMovies: recommendMovies.data,
          reviews: reviews.data,
        },
      });
    } catch (error) {
      //에러 핸들링
      dispatch({ type: 'GET_MOVIES_FAIURE' });
    }
  };
}

export const movieAction = {
  getMovies,
  getAllMovies,
  getDetailMovie,
};
