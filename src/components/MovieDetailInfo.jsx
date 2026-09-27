import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import people4Icon from '../assets/images/people4.png'; 
import under18Icon from '../assets/images/under18.svg'; 

const MovieDetailInfo = ({ detailMovies }) => {
  return (
    <>
      <Row className="movie-detail-section">
        <Col>
          <div
            className="poster"
            style={{
              backgroundImage:
                'url(' +
                `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${detailMovies.poster_path}` +
                ')',
            }}
          ></div>
        </Col>
        <Col>
          <div className="movie-detail-item detail-genres">
            {detailMovies.genres.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
          <div className="movie-detail-item detail-title-area">
            <h2 className="title">{detailMovies.title}</h2>
            <div className="tagline">{detailMovies.tagline}</div>
          </div>
          <div className="movie-detail-item detail-vote">
            <span className="item item1">{detailMovies.vote_average}</span>
            <span className="item item2">{detailMovies.popularity}</span>
            <span className="item item3">
              {detailMovies.adult ? ( 
                <img src={people4Icon} width="25" />
              ) : (
                <img src={under18Icon} width="25" />
              )}
            </span>
          </div>
          <div className="movie-detail-item detail-overview">
            {detailMovies.overview}
          </div>
          <div className="movie-detail-item detail-budget">
            <ul>
              <li>
                <span className="tit">Budget</span>
                <span className="cont">$ {detailMovies.budget}</span>
              </li>
              <li>
                <span className="tit">Revenue</span>
                <span className="cont">$ {detailMovies.revenue}</span>
              </li>
              <li>
                <span className="tit">Release Date</span>
                <span className="cont">{detailMovies.release_date}</span>
              </li>
              <li>
                <span className="tit">Run time</span>
                <span className="cont">{detailMovies.runtime}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MovieDetailInfo;
