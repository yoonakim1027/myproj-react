import { useNavigate, useParams } from 'react-router-dom';
import PostForm from 'components/blog/PostForm';

function PagePostForm() {
  const navigate = useNavigate();
  const { postId } = useParams();

  return (
    <div className="w-full px-3 mb-6">
      <h2 className="text-m">
        Post Form
        <br></br>
        {postId ? ': π± μμ νκΈ°' : ': πΆ μμ±νκΈ°'}
      </h2>
      <hr />

      <PostForm
        postId={postId}
        handleDidSave={(savedPost) => navigate(`/blog/${savedPost.id}/`)}
      />
    </div>
  );
}

export default PagePostForm;
