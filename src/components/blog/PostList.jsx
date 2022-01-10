import { useState } from 'react';

function PostList({ post, onClick, handleEdit, handleDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const { title, content } = post;
  // TODO : handleEdit/handleDelete 호출에 대한 방어적 코드를 작성
  // 조건부 렌더링 필요
  // {handleEdif &&} ~

  const handleClickedEditButton = () => {
    if (handleEdit) {
      handleEdit();
    } else {
      console.warn('[Post] handleEdit 속성값이 지정되지 않았습니다.');
    }
  };

  const handleClickedDeleteButton = () => {
    if (handleDelete) {
      handleDelete();
    } else {
      console.warn('[Post] handleDelete 속성값이 지정되지 않았습니다.');
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded border border-gray-400 my-1 p-1"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      style={{ backgroundColor: 'white' }}
      onClick={onClick}
    >
      {showMenu && (
        <div className="text-xs top-1 right-0">
          <span
            onClick={handleClickedEditButton}
            className="text-green-700 hover:bg-green-300 cursor-pointer mr-1 "
          >
            수정
          </span>
          <span
            onClick={handleClickedDeleteButton}
            className="text-red-700  hover:bg-red-300 cursor-pointer mr-1 "
          >
            삭제
          </span>
        </div>
      )}
      {title}
    </div>
  );
}

export default PostList;
