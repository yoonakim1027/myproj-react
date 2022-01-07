import Rating from './Rating';

// handleDelete : 인자 없는 함수 -> 삭제 버튼 클릭 시에 호출 !
// review : 보여질 리뷰 객체
function Review({ review, handleEdit, handleDelete }) {
  const { content, score } = review;
  // TODO : handleEdit/handleDelete 호출에 대한 방어적 코드를 작성
  // 조건부 렌더링 필요
  // {handleEdif &&} ~
  //
  return (
    <div className="bg-yellow-100 border border-yellow-400 my-1 p-1">
      <div>
        <span
          onClick={() => handleEdit()}
          className="hover:text-blue-400 cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          className="hover:text-red-400 cursor-pointer"
          onClick={() => handleDelete()}
        >
          삭제
        </span>
      </div>
      {content}
      <Rating score={score} />
    </div>
  );
}

export default Review;
