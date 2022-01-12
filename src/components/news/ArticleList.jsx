import useAxios from 'axios-hooks';
import DebugStates from 'components/DebugStates';
import ArticleSummary from './ArticleSummary';

// use로 시작하니까 이것도 hook

// 전체를 보여주기 보단? 일부만 보여주는 리스트인 셈
function ArticleList() {
  // 개별적으로 뽑아내기 위해 {}
  // 첫번째 인자는 배열, 두번째 인자는 함수
  const [{ data: articleList, loading, error }, refetch] = useAxios(
    'http://localhost:8000/news/api/articles/',
  ); // 첫번째 인자를 문자열로 넣을 수도 있음

  // 주소만주면? 주소에 대해 get요청

  return (
    <div>
      <h2>뉴스 기사 목록을 보여줄 것입니다</h2>
      {loading && '로딩중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {articleList &&
        articleList.map((article) => <ArticleSummary article={article} />)}
      <DebugStates data={articleList} loading={loading} error={error} />
    </div>
  );
}
export default ArticleList;
