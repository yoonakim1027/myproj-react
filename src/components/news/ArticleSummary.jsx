// 속성으로 article 값받음

import { Link } from 'react-router-dom';

// 링크를 a태그로 하는 것 X
// Link라는 이름의 컴포넌트로! 일종의 훼이크로 주소가 바뀐것처럼
// 실제로는 다른 컴포넌트로 바꾸는 것정도임! SPA

function ArticleSummary({ article }) {
  return (
    <div>
      <h2>
        <Link to={`/news/${article.id}/`}>
          {article.id}. {article.title}
        </Link>
      </h2>
    </div>
  );
}
export default ArticleSummary;
