import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import { useState } from 'react';

import { useEffect } from 'react/cjs/react.development';
import PostSummary from './PostSummary';

function PostList() {
  const [{ data: postList, loading, error }, refetch] =
    useApiAxios(`/blog/api/posts/`);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {postList && postList.map((post) => <PostSummary post={post} />)}
      <DebugStates postList={postList} loading={loading} error={error} />
    </div>
  );
}

export default PostList;
