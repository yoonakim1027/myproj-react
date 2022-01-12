import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';

import Button from 'components/Button';

function PostDetail({ postId }) {
  const navigate = useNavigate();

  const [{ data: post, loading, error }, refetch] = useApiAxios(
    `/blog/api/posts/${postId}/`,
  );

  const [{ loading: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/blog/api/posts/${postId}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말로 지우시겠습니까?')) {
      // REST API 에서는 DELETE 요청에 대한 응답이 없습니다.
      deletePost().then(() => {
        navigate('/blog/');
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
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.sttusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}
      {post && (
        <>
          <h3 className="bg-white shadow-md rounded border border-gray-400 my-1 p-1">
            {post.title}
          </h3>
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
      <div className="gap-5 mt-3 mb-10">
        <Button type="purple">
          <Link to="/blog/" className="hover:text-white-300">
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
