import Axios from 'axios';
import { useEffect } from 'react';

function ReviewList() {
  useEffect(() => {
    refetch();
  }, []); // [] 인자는 값(의존성), 앞의 인자는 배열
  //의존성에 지정된 값이 바뀌면 함수가 자동호출
  //1시 35분경

  // 다시 가져오기
  // 함수가 호출되면? 함수의 호출부분에서 Axios의 get을 사용해서 불러올거다!
  const refetch = () => {
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';
    // Promise 객체(약속 객체)-> then, catch를 지원
    // 이함수는 자동/수동 호출 둘 다 될것
    // 자동은 이 컴포넌트가 생성되고 자동으로 호출되면 좋을것
    // 수동은 새로고침을 눌렀을 시, 수동으로 호출되면 좋겠음
    Axios.get(url)
      .then((response) => {
        console.group('정상 응답');
        console.log(response);
        console.groupEnd();
      })
      .catch((error) => {
        console.group('에러 응답');
        console.log(error);
        console.groupEnd();
      });
  };
  return (
    <div>
      <h2>Review List</h2>
    </div>
  );
}
export default ReviewList;
