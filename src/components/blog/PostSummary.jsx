import { Link } from 'react-router-dom';

function PostSummary({ post }) {
  return (
    <div className="bg-gray-100 border-gray-200 border-2 rounded-lg overflow-hidden mb-10">
      {post.photo && (
        <img src={post.photo} alt={post.title} className="w-full" />
      )}
      <div className="p-8 sm:p-9 md:p-7 xl:p-9">
        <h3>
          <Link to={`/blog/${post.id}/`} className="font-semibold text-dark">
            {post.title}
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default PostSummary;
