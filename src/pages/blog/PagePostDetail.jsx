import Axios from 'axios';
import PostDetail from 'components/blog/PostDetail';
import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PagePostDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState([]);
  const [viewPost, setViewPost] = useState([]);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = `http://localhost:8000/blog/api/posts/${postId}`;
    // Promise 객체
    Axios.get(url)
      .then(({ data }) => {
        setViewPost(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Post detail</h2>

      {loading && <div>Loading ...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

      <div>
        <div className="block bg-pink-200 text-center py-2 mb-2">
          {viewPost.title}
        </div>
        <img src="https://placeimg.com/640/480/animals" alt="" />
        <div className="block bg-yellow-100 px-2 py-1">{viewPost.content}</div>
      </div>

      <hr />
      <br></br>
      <button
        onClick={() => navigate(`/blog/`)}
        className=" bg-blue-400 hover:bg-red-400 mr-1"
      >
        뒤로가기
      </button>
      <DebugStates loading={loading} error={error} postList={viewPost} />
    </div>
  );
}

export default PagePostDetail;
