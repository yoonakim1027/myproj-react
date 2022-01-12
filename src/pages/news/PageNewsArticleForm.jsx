import ArticleForm from 'components/news/ArticleForm';
import { useNavigate } from 'react-router-dom';

// 함수 컴포넌트 내에서는 가급적 새로운 함수 설정을 피해주는 것이 좋음
// 이름을 바꾸려면, 기본이름:바꿀이름
// 이름을 바꾸는 이유는? 구별해서 사용하기 위해서
function PageNewsArticleForm() {
  const navigate = useNavigate();
  // 생성이기 때문에 우선은 Id가 null
  return (
    <ArticleForm
      articleId={null}
      handleDidSave={(savedPost) => navigate(`/news/${savedPost.id}/`)}
    />
  );
}

export default PageNewsArticleForm;
