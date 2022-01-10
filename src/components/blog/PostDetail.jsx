import { useState } from 'react';

function PostDetail({ post, onClick, handleEdit, handleDelete }) {
  const { title, content } = post;

  return (
    <div
      className="bg-white shadow-md rounded border border-gray-400 my-1 p-1"
      style={{ backgroundColor: 'white' }}
      onClick={onClick}
    >
      {title}
      {content}
    </div>
  );
}
export default PostDetail;
