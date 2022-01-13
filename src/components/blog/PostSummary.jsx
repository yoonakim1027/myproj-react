import { Link } from 'react-router-dom';

function PostSummary({ post }) {
  return (
    <div>
      {post.photo && <img src={post.photo} art={post.title} />}
      <Link to={`/blog/${post.id}/`}>{post.title}</Link>
    </div>
  );
}

export default PostSummary;
