import Button from 'components/Button';
import ArticleList from 'components/news/ArticleList';
import { useNavigate } from 'react-router-dom';

function PageNewsIndex() {
  const navigate = useNavigate();

  // 뉴스 페이지의 대문 페이지
  return (
    <div>
      <h2>뉴스 대문 페이지</h2>
      <ArticleList />

      <Button onClick={() => navigate('/news/edit')}>새 포스팅 쓰기</Button>
      <h2>뉴스 추천</h2>
      <h2>광고</h2>
    </div>
  );
}
export default PageNewsIndex;
