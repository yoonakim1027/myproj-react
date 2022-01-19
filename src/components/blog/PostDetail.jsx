import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from 'hooks/useAuth';

function PostDetail({ postId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: post, loading, error }, refetch] = useApiAxios(
    {
      url: `/blog/api/posts/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`, // 구분자
      },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/blog/api/posts/${postId}/`,
        method: 'DELETE',
        headers: `Bearer ${auth.access}`, // 위와 코드 겹치는 부분은 공부를 통해 중복 제거를 해야함~
      },
      { manual: true },
    );

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost().then(() => {
        navigate('/blog/');
        toast.info('🐻🐼 삭제 완료입니다 ! 🐶❤️', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="bg-white shadow-md rounded border border-gray-400 my-1 p-1">
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중... </LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.sttusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response?.status} ${deleteError.response?.statusText})`}
      {post && (
        <>
          <h3 className="bg-white shadow-md rounded border border-gray-400 my-1 p-1">
            {post.title}
          </h3>
          <p>by {post.author.username}</p>
          {post.photo && <img src={post.photo} alt={post.title} />}
          <div>
            {post.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}

      <hr className="my-3" />
      <div className="text-center gap-5 mt-4 mb-10 ">
        <Button type="purple">
          <Link to="/blog/" className="hover:text-white-300 ">
            목록으로
          </Link>
        </Button>

        <Button>
          <Link to={`/blog/${postId}/edit/`} className="hover:text-white-400">
            수정하기
          </Link>
        </Button>

        <Button disabled={deleteLoading} onClick={handleDelete} type="pink">
          삭제하기
        </Button>
      </div>
    </div>
  );
}

export default PostDetail;
