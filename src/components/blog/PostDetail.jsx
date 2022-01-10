import { useNavigate } from 'react-router-dom';

function PostDetail({ post, handleEdit, handleDelete }) {
  const { title } = post;
  const { id: postId } = post;
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded border border-gray-400 my-1 p-1">
      <div>
        <span
          onClick={() => handleEdit()}
          className="hover:text-blue-400 cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="hover:text-red-400 cursor-pointer mr-1"
        >
          삭제
        </span>
      </div>
      <span
        onClick={() => {
          navigate(`/blog/${postId}/`);
        }}
        className="px-2 py-1 rounded hover:bg-blue-200 cursor-pointer"
      >
        {title}
      </span>
    </div>
  );
}

export default PostDetail;
