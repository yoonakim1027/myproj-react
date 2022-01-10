import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import PostList from 'components/blog/PostList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from 'components/blog/PostForm';
import PagePostDetail from './PagePostDetail';
import PostDetail from 'components/blog/PostDetail';

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

    const url = 'http://localhost:8000/blog/api/posts/';
    // Promise 객체
    Axios.get(url)
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
    const url = `http://localhost:8000/blog/api/posts/${deletingPostId}/`;

    setLoading(true);
    setError(null);

    Axios.delete(url)
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

  //디테일
  const detailPost = (detailingPost) => {
    const { id: detailingPostId } = detailingPost;
    const url = `http://localhost:8000/blog/api/posts/${detailingPostId}/`;

    setLoading(true);
    setError(null);

    Axios.get(url)
      .then(() => {
        console.log('불러오기 성공');
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id === detailingPostId),
        );
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <h2>Post List</h2>

        {loading && <div>Loading ...</div>}
        {error && <div>통신 중에 오류가 발생했습니다.</div>}

        <div>
          {!viewForm && (
            <button
              onClick={() => navigate('/blog/new/')}
              className="bg-blue-400 hover:bg-slate-400"
            >
              새 포스팅
            </button>
          )}
        </div>
        <button
          onClick={() => refetch()}
          className="bg-yellow-400 hover:bg-red-400 mr-1"
        >
          새로고침
        </button>

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
        <DebugStates loading={loading} error={error} postList={postList} />
      </div>
    </>
  );
}

export default PagePostList;
