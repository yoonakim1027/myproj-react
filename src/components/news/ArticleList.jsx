import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import { useEffect } from 'react/cjs/react.development';
import ArticleSummary from './ArticleSummary';

function ArticleList() {
  const [{ data: articleList, loading, error }, refetch] = useApiAxios(
    '/news/api/articles/',
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h3 className="text-xl md:w-32 lg:w-48 text-center italic">Head Line</h3>
      <div className="bg-white shadow-md rounded border border-gray-400 my-3 p-2">
        {loading && '로딩 중 ...'}
        {error && '로딩 중 에러가 발생했습니다.'}
        {articleList &&
          articleList.map((article) => <ArticleSummary article={article} />)}
      </div>

      <DebugStates articleList={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
