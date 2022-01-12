import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';
import Button from 'components/Button';

function PagePostDetail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [viewPost, setViewPost] = useState([]);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = `/blog/api/posts/${postId}`;
    // Promise 객체
    axiosInstance
      .get(url)
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
        <div className="bg-white shadow-md rounded border border-gray-400 my-3 p-2 ">
          {viewPost.title}
        </div>
        <img src="https://placeimg.com/640/480/animals" alt="" />
        <div className="bg-blue-50 rounded border border-gray-400 my-3 p-2 ">
          {viewPost.content}
        </div>
      </div>

      <hr />
      <br></br>

      <Button onClick={() => navigate(`/blog/`)} type="primary">
        뒤로가기
      </Button>
      <DebugStates loading={loading} error={error} postList={viewPost} />
    </div>
  );
}

export default PagePostDetail;
