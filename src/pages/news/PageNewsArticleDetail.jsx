// 주소가 http://localhost:3000/news/100/ - > 100번에 해당하는 게시글을 보여주겠음
// 그 페이지에서는 속성값을 받지 못함

import ArticleDetail from 'components/news/ArticleDetail';
import { useParams } from 'react-router-dom';

function PageNewsArticleDetail() {
  const { articleId } = useParams();

  return (
    <div>
      <h2> 뉴스기사 #{articleId} 보여주기</h2>
      <ArticleDetail articleId={articleId} />
      <hr />
      <h3>비슷한 기사 목록</h3>
      <h3>관심있는 기사목록</h3>
    </div>
  );
}
export default PageNewsArticleDetail;
