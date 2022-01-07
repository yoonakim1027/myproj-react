import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';

function PageReviewList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = 'http://localhost:8000/shop/api/reviews/';
    // Promise 객체
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
      })
      .finally(() => {
        setLoading(false);
      }); // 정상동작 후/ 에러동작후에도 무조건 적용되는 코드!
  };

  return (
    <div>
      <h2>Review List</h2>
      {/* loading이 true시에 */}
      {loading && <div>Loading ... </div>}

      {/* loading이 false 시에  */}
      {error && <div> 통신 중에 오류가 발생했습니다.</div>}

      <button
        onClick={() => refetch()}
        className="bg-yellow-400 hover:bg-yellow-200"
      >
        새로고침
      </button>

      <hr />
      <button></button>
      <DebugStates loading={loading} error={error} reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
