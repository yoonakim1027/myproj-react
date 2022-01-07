import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import Review from 'components/Review';
import { useEffect, useState } from 'react';

function PageReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setError(null);
    setLoading(true);
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';
    // Promise 객체 --> then, catch 지원, 체이닝 가능
    Axios.get(url)
      .then(({ data }) => {
        console.group('정상 응답');
        console.log(data);
        console.groupEnd();
        setReviewList(data);
      })
      .catch((error) => {
        console.group('에러 응답');
        console.log(error);
        console.groupEnd();
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 삭제할 리뷰 객체를 인자로 받을 것!
  // 필요한 것은 review의 id
  // 콜론으로 이름을 바꿀 수 있음
  // {원래이름 : 바꿀이름} -> 이렇게 바꾸고 값을 가져올 수 있음
  const deleteReview = (deletingReview) => {
    const { id: deletingReviewId } = deletingReview;
    const url = `http://127.0.0.1:8000/shop/api/reviews/${deletingReviewId}/`;

    // 삭제도 요청! -> 응답에 시간이 걸릴 수 있음 ==>
    // Axios.에 다양한 요청을 보낼 수 있음!

    //deleting요청이 들어가기 바로전에!!
    setLoading(true);
    setError(null);

    // .then 시에 선택지들
    // 1. 삭제된 항목만 상탯값에서 제거 2. 전체 새로고침(옛날 방식)

    Axios.delete(url)
      .then(() => {
        console.log('삭제성공'); // then 호출만으로 성공을 알 수 있음
        setReviewList((prevReviewList) => {
          // prevReviewList 배열
          // 매 순회마다 배열을 가져옴
          return prevReviewList.filter((review) => {
            // 중괄호!! 꼭 리턴
            // arrow function + 중괄호 -> return 값 필요
            // 문자열, 숫자열 끼리의 비교가 안전!
            return review.id !== deletingReviewId;
          }); // 삭제될 애들이 아닌애들만 남게 ~

          // return 없이 ~
          // setReviewList((prevReviewList)=>prevReviewList.filter(review)=> review.id ===deletingReviewId)
        });
      })
      .catch((error) => {
        setError(error); // 에러를 남기는 상탯값 -> 에러 날 때에는 할 게 딱히 없음
      })
      .finally(() => {
        setLoading(false);
      });
    // 에러

    console.log('Deleting', deletingReview);
  };

  return (
    <div>
      <h2>Review List</h2>

      {loading && <div>Loading...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

      <button
        onClick={() => refetch()}
        className="bg-yellow-400 hover:bg-red-300"
      >
        새로고침
      </button>

      {reviewList.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleDelete={() => deleteReview(review)}
          // 삭제를 누르면, deleteReview를 호출하면서 리뷰 객체를 넘김
        />
      ))}

      <hr />
      <DebugStates loading={loading} error={error} reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
