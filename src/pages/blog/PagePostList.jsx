import DebugStates from 'components/DebugStates';
import PostList from 'components/blog/PostList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';
import Clock from 'pages/examples/Clock';
// import PostForm from 'components/blog/PostForm';
// import PagePostDetail from './PagePostDetail';
// import PostDetail from 'components/blog/PostDetail';

function PagePostList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState([]);

  const [viewForm, setViewForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = '/blog/api/posts/';
    // Promise 객체
    axiosInstance
      .get(url)
      .then(({ data }) => {
        setPostList(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePost = (deletingPost) => {
    const { id: deletingPostId } = deletingPost;
    const url = `/blog/api/posts/${deletingPostId}/`;

    setLoading(true);
    setError(null);

    axiosInstance
      .delete(url)
      .then(() => {
        console.log('삭제 성공');
        // 선택지 #1) 삭제된 항목만 상탯값에서 제거
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== deletingPostId),
        );
        // 선택지 #2) 전체를 새로고침
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //수정
  const editPost = (editingPost) => {
    navigate(`/blog/${editingPost.id}/edit/`);
  };

  return (
    <>
      <div>
        <h2 className="text-xl md:w-32 lg:w-48 text-center italic">
          Post List
        </h2>

        {loading && <div className="italic">Loading ...</div>}
        {error && <div>통신 중에 오류가 발생했습니다.</div>}
        <hr />
        <br></br>
        <div className="text-center">
          {!viewForm && (
            <button
              onClick={() => navigate('/blog/new/')}
              className="shadow bg-purple-400 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              새 포스팅
            </button>
          )}

          <button
            onClick={() => refetch()}
            className="shadow bg-blue-400 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            새로고침
          </button>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {postList.map((post) => (
            <PostList
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              key={post.id}
              post={post}
              handleEdit={() => editPost(post)}
              handleDelete={() => deletePost(post)}
            />
          ))}
        </div>

        <hr />
        <br></br>
        <DebugStates loading={loading} error={error} postList={postList} />
        
      </div>
    </>
  );
}

export default PagePostList;
