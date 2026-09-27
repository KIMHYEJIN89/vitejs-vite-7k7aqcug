import Badge from 'react-bootstrap/Badge';
import { useState, useMemo, useEffect } from 'react'; // useMemo 추가
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Dropdown,
  Accordion,
  Pagination,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { movieAction } from '../redux/actions/movieAction';
import { ClipLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import './rcSlider.css';
import styled, { css } from 'styled-components';

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  // 1. Redux 데이터 가져오기
  const { discoverMovies, searchMovies, genreList, loading } = useSelector(
    (state) => state.movie
  );

  const [sortType, setSortType] = useState(1); // 1: 인기높은순, 2: 인기낮은순
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(false);
  const [yearType, setYearType] = useState(0);
  const [year, setYear] = useState([1990, 2026]);
  const [isOpen, setIsOpen] = useState(true);
  const [firstOpen, setFristOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(true);
  const [num, setNum] = useState([2, 3]);

  const prevPageRef = useState(null);
  const pageSize = 20;
  let searchQuery = query.get('query') || '';
  let totalPages;

  //  계산 (allMovies나 정렬/장르가 바뀔 때마다 자동 실행)
  const filteredMovies = useMemo(() => {
    let list = discoverMovies?.results ?? [];

    if (searchQuery != '') {
      list = searchMovies?.results;
    }

    // 장르
    if (selectedGenreId) {
      list = list.filter((item) => item.genre_ids?.includes(selectedGenreId));
    }

    // 년도
    if (yearType === 1) {
      list = list.filter((item) => {
        const yearNum = Number(item.release_date?.slice(0, 4));
        if (!yearNum) return false;
        return yearNum >= year[0] && yearNum <= year[1];
      });

      console.log('아이템 갯수', list.length);
      totalPages = Math.ceil(list.length / pageSize);

      const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

      console.log('totalPages', totalPages);
      console.log('pageArray', pageArray);
      setNum([...pageArray]);
    }

    // 정렬
    if (sortType === 1) {
      list = [...list].sort((a, b) => b.popularity - a.popularity);
    } else if (sortType === 2) {
      list = [...list].sort((a, b) => a.popularity - b.popularity);
    }

    return list;
  }, [discoverMovies, selectedGenreId, yearType, year, sortType]);

  useEffect(() => {
    // 데이터가 없을 때만 호출하거나, 최신화를 위해 매번 호출
    if (!discoverMovies || page !== prevPageRef) {
      dispatch(movieAction.getAllMovies(searchQuery, page));
    }

    //setPage(1);
  }, [page, query, filteredMovies]); //의존성배열 값이 바뀔때 호출..

  if (!discoverMovies) {
    console.log('로딩로딩로딩로딩로딩로딩', loading);

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
  const showDetail = (id) => {
    navigate(`/movies/${id}`);
  };

  const handlePage = (page) => {
    console.log('페이징', page);
    setPage(page);
    setActive(false);
    let prevNum = [];

    if (page < 1 || page > 500) {
      return;
    }

    if (page > 4) {
      for (let i = page - 1; i <= page + 1; i++) {
        prevNum.push(i);
      }

      if (page == 500) {
        let endPage = [];

        for (let j = page - 2; j <= page; j++) {
          endPage.push(j);
        }

        setNum([...endPage]);

        setLastOpen(false);
        setIsOpen(false);
      } else {
        setNum([...prevNum]);
      }

      setFristOpen(true);
    } else {
      for (let i = 2; i <= (page * 2) / 2 + 1; i++) {
        prevNum.push(i);
      }
      if (page == 1) {
        setNum([...prevNum, 3]);
      } else {
        setNum([...prevNum]);
      }
      setFristOpen(false);
      setLastOpen(true);
      setIsOpen(true);
    }
  };

  // 정렬/장르 변경 핸들러
  const handleSort = (type) => {
    setSortType(type);
    setSelectedGenreId(null); // 정렬 시 장르 초기화하고 싶지 않다면 이 줄 삭제
  };

  const handleYear = (type) => {
    setYearType(type);
  };
  const handleGenre = (genreId) => {
    console.log('genreId', genreId);
    setSelectedGenreId(genreId);
  };

  return (
    <Container>
      <div className="dropdown-wrap">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-sort" variant="danger">
            정렬기준
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSort(1)}>높은순</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort(2)}>낮은순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-gnrl">
            장르별 검색
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedGenreId(null)}>
              전체
            </Dropdown.Item>
            {genreList?.map((item) => (
              <Dropdown.Item key={item.id} onClick={() => handleGenre(item.id)}>
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Accordion defaultActiveKey="null" className="moive-filter-wrap">
          <Accordion.Item eventKey="0">
            <Accordion.Header>년도별 Filter</Accordion.Header>
            <Accordion.Body>
              <div className="text_box">
                <div>YEAR Filter</div>
                <div>
                  From <strong>{year[0]}</strong> - To{' '}
                  <strong>{year[1]}</strong>
                </div>
              </div>
              <div>
                {}
                <Slider
                  range
                  min={1990}
                  max={2026}
                  step={1}
                  value={year}
                  onChange={setYear}
                  onChangeComplete={(value) => handleYear(1)}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies?.map((item) => (
            <Col
              xs={6} // 모바일 (매우 작은 화면)
              sm={6} // 작은 태블릿
              md={4} // 큰 태블릿 이상부터는 3개 (원치 않으면 이것도 6으로 설정)
              lg={3} // 데스크탑에서는 4개
            >
              <div
                key={item.id}
                className="card movies-item"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w440_and_h660_face/${item.poster_path})`,
                  backgroundSize: 'cover',
                }}
              >
                <div className="overlay" onClick={() => showDetail(item.id)}>
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
                    <span> {item.release_date}</span>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div>영화가 없습니다.</div>
        )}
      </Row>
      {filteredMovies.length > 0 && (
        <Pagination>
          <Pagination.First onClick={() => handlePage(1)} />
          <Pagination.Prev onClick={() => handlePage(page - 1)} />
          <Pagination.Item onClick={() => handlePage(1)}>{1}</Pagination.Item>
          {/* <Pagination.Ellipsis
            className={`ellipsis ${firstOpen ? 'show' : ''}`}
            onClick={() => handlePage(page - 1)}
          /> */}

          {[...num].map((i) => (
            <Pagination.Item
              active={false}
              key={i}
              onClick={() => handlePage(i)}
              className={i == page ? 'on' : ''}
            >
              {i}
            </Pagination.Item>
          ))}
          {num[num.length - 1] && (
            <Pagination.Ellipsis
              onClick={() => handlePage(num[num.length - 1] + 1)}
            />
          )}
          {
            <Pagination.Item
              className={`item ${isOpen ? 'show' : ''}`}
              onClick={() => handlePage(500)}
            >
              {500}
            </Pagination.Item>
          }

          <Pagination.Next onClick={() => handlePage(page + 1)} />
          <Pagination.Last onClick={() => handlePage(500)} />
        </Pagination>
      )}
    </Container>
  );
};

export default Movies;
