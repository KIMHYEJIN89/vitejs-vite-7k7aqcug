import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ item, isDragging }) => {
  const { genreList } = useSelector((state) => state.movie);
  const navigate = useNavigate();

  const showDetail = (e) => {
    // console.log('isDragging', isDragging);
    // if (isDragging) {
    //   e.preventDefault();
    // }
    e.preventDefault();
    navigate(`/movies/${item.id}`);
  };
  return (
    <>
      <div
        className="card"
        style={{
          backgroundImage:
            'url(' +
            `https://image.tmdb.org/t/p/w440_and_h660_face/${item.poster_path}` +
            ')',
        }}
      >
        <div className="overlay" onClick={showDetail}>
          <h1 class="overlay_title">{item.title}</h1>
          <div className="overlay_badge">
            {item.genre_ids.map((id) => (
              <Badge bg="danger">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div>
            <span>{item.vote_average}</span>
            <span>{item.adult ? '청불' : 'Under 18'}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
