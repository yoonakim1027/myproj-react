import Button from 'components/Button';
import ArticleList from 'components/news/ArticleList';
import { useNavigate } from 'react-router-dom';

function PageNewsIndex() {
  const navigate = useNavigate();

  // 뉴스 페이지의 대문 페이지
  return (
    <div className="w-full">
      <h2 className="my-3">뉴스 대문 페이지</h2>
      <hr />
      <div className="my-3 text-right">
        <Button type="green" onClick={() => navigate('/news/new/')}>
          새 포스팅 쓰기
        </Button>
      </div>
      <div>
        <ArticleList />
      </div>

      <h2>뉴스 추천</h2>
      <h2>광고</h2>
      <hr className="my-3" />
    </div>
  );
}
export default PageNewsIndex;
