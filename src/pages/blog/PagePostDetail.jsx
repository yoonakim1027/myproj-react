import { useParams } from 'react-router-dom';
import PostDetail from 'components/blog/PostDetail';

function PagePostDetail() {
  const { postId } = useParams();

  return (
    <div>
      <h2>Post detail</h2>
      <div>
        <div className="bg-white rounded border border-gray-400 my-3 p-2 ">
          <img src="https://placeimg.com/640/480/animals" alt="" />
          <PostDetail postId={postId} />
        </div>
      </div>

      <br></br>
    </div>
  );
}

export default PagePostDetail;
