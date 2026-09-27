import { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';

const MovieDetailBanner = ({ detailMovies, videos }) => {
  // videos :: 유튜브 api
  const [show, setShow] = useState(false);
  console.log('videos ', videos);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage:
            'url(' +
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${detailMovies.backdrop_path}` +
            ')',
        }}
      >
        <div className="banner-info">
          <h1>{detailMovies.title}</h1>
          <p>{detailMovies.overview}</p>

          <Button variant="light" onClick={() => setShow(true)}>
            재생
          </Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            aria-labelledby="modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="modal-title"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <YouTube
                //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디

                videoId={
                  (
                    videos.results?.find((item) => item.type === 'Trailer') ||
                    videos.results?.find((item) => item.type === 'Teaser') ||
                    videos.results?.[0]
                  )?.key
                }
                //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
                //밑에서 더 설명하겠습니다.
                opts={{
                  width: '560',
                  height: '315',
                  playerVars: {
                    autoplay: 1, //자동재생 O
                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                  },
                }}
                //이벤트 리스너
                onEnd={(e) => {
                  e.target.stopVideo(0);
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default MovieDetailBanner;
