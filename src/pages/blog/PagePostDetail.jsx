import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/Button';
import PostDetail from 'components/blog/PostDetail';

function PagePostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();

  return (
    <div>
      <h2>Post detail</h2>
      <div>
        <div className="bg-white shadow-md rounded border border-gray-400 my-3 p-2 ">
          <img src="https://placeimg.com/640/480/animals" alt="" />
          <PostDetail postId={postId} />
        </div>
      </div>

      <br></br>
    </div>
  );
}

export default PagePostDetail;
