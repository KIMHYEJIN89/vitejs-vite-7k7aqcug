import { useNavigate } from 'react-router-dom';
const MovieRelatedCard = ({ item }) => {
  const navigate = useNavigate();

  const showDetail = () => {
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
        onClick={showDetail}
      ></div>
    </>
  );
};

export default MovieRelatedCard;
