import DebugStates from 'components/DebugStates';
import PostList from 'components/blog/PostList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';
import Button from 'components/Button';

function PagePostList() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2 className="text-xl md:w-32 lg:w-48 text-center italic">
          Post List
        </h2>
        <Button onClick={() => navigate('/blog/new/')}>새 글 쓰기</Button>
        <div>
          <PostList />
        </div>
      </div>
    </>
  );
}

export default PagePostList;
