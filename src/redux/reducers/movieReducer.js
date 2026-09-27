let initialState = {
  popularMovies: { results: [] },
  topRatedMovies: { results: [] },
  upcomingMovies: { results: [] },
  discoverMovies: {},
  searchMovies: { results: [] },
  detailMovies: {},
  videos: {},
  recommendMovies: {},
  genreList: [],
  reviews: {},
  loading: true,
};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case 'GET_MOVIE_RQEUEST':
      return {
        ...state,
        loading: true,
        discoverMovies: null,
      };
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        discoverMovies: payload.discoverMovies,
        searchMovies: payload.searchMovies,
        detailMovies: payload.detailMovies,
        videos: payload.videos,
        recommendMovies: payload.recommendMovies,
        genreList: payload.genreList,
        reviews: payload.reviews,
        loading: false,
      };
    case 'GET_MOVIES_FAIURE':
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default movieReducer;
