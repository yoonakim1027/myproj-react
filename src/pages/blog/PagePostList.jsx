import PostList from 'components/blog/PostList';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';

function PagePostList() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <hr />
        <h2 className="my-3 text-xl md:w-32 lg:w-48 text-center">
          🐼 Post List 🐰
        </h2>
        <div className="text-center">
          <Button onClick={() => navigate('/blog/new/')}>새 글 쓰기</Button>
        </div>
        <div className="bg-white shadow-md rounded border border-gray-400 my-5 p-1">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default PagePostList;
