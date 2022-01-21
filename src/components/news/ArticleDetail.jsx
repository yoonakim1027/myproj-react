import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import { useAuth } from 'contexts/AuthContext';

function ArticleDetail({ articleId }) {
  const [auth] = useAuth();

  const navigate = useNavigate();

  const [{ data: article, loading, error }, refetch] = useApiAxios(
    {
      url: `/news/api/articles/${articleId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteArticle] =
    useApiAxios(
      {
        url: `/news/api/articles/${articleId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      // REST API 에서는 DELETE 요청에 대한 응답이 없습니다.
      deleteArticle().then(() => {
        navigate('/news/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response?.status} ${error.response?.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response?.status} ${deleteError.response?.statusText})`}
      {article && (
        <>
          <hr />
          <h3 className="text-2xl my-5">{article.title}</h3>
          {article.photo && <img src={article.photo} alt={article.title} />}
          <div>
            {article.content.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Button>
          <Link to="/news/" className="hover:text-red-400">
            목록으로
          </Link>
        </Button>
        <Button type="pink">
          <Link to={`/news/${articleId}/edit/`} className="hover:text-red-400">
            수정하기
          </Link>
        </Button>

        <Button
          type="purple"
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}

export default ArticleDetail;
