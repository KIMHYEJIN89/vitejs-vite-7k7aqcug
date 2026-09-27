import { useEffect, useRef, useState } from 'react';

const ReviewItem = ({ author, content }) => {
  const contRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);

  // useRef :: 값을 기억 하고 싶을때
  // useState :: 값을 변경 하고 싶을때
  useEffect(() => {
    // 접기 : 리뷰 줄 수 체크 함수
    if (contRef.current) {
      // DOM이 실제로 존재한다면,
      const $lineHeight = parseFloat(
        // 브라우저가 최종적으로 계산한 CSS값을 가져오는 함수
        window.getComputedStyle(contRef.current).lineHeight
      );

      if ($lineHeight * 4 < contRef.current.scrollHeight) {
        setIsMore(true);
      }
    }
    // DOM 준비 끝난 뒤 실행
  }, []);
  return (
    <>
      <div class="review-wrapper">
        <div className="review-author">{author}</div>
        <div className={`review-cont ${isOpen ? 'open' : ''}`} ref={contRef}>
          {content}
        </div>
        {isMore && (
          <button
            type="button"
            className="btn-more"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </>
  );
};

export default ReviewItem;
