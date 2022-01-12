// 속성값을 인자로 받는다

import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';

// 받은 id에 해당하는 컨텐츠를 보여줌
function ArticleDetail({ articleId }) {
  // 내가 원하는 값만 조회하기 위해 {} 사용
  const [{ data: article, loading, error }] = useAxios(
    `http://localhost:8000/news/api/articles/${articleId}/`,
  );
  //data는 너무 평범하니까 ? 이름을 바꿈
  return (
    <div>
      {loading && '로딩 중....'}
      {error && '에러가 발생했습니다.'}
      {article && (
        <>
          <h2 className="text-2ml my-5">{article.title}</h2>
          <div>
            <h3>
              {article.content.split(/[\r\n]+/).map((line, index) => (
                <p className="my-3" key={index}>
                  {line}
                </p>
              ))}
            </h3>
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/news/" className="hover:text-red-300">
          목록으로
        </Link>
        <Link to={`/news/${articleId}/edit/`} className="hover:text-green-300">
          수정하기
        </Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
