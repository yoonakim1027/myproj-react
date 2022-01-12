import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react/cjs/react.development';
import PostSummary from './PostSummary';

function PostList() {
  const [{ data: postList, loading, error }, refetch] =
    useApiAxios(`/blog/api/posts/`);

  useEffect(() => {
    refetch();
  }, []);

  const [debug, setDebug] = useState(false);
  const handleDebugClick = () => {
    setDebug(true);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded border border-gray-400 my-3 p-1">
        {loading && '로딩 중 ...'}
        {error && '로딩 중 에러가 발생했습니다.'}
        {postList && postList.map((post) => <PostSummary post={post} />)}
      </div>

      <ToastContainer />

      <div className="my-3">
        <Button type="pink" onClick={handleDebugClick}>
          Debug 상태 보기
        </Button>
      </div>

      <div>
        {debug && (
          <DebugStates postList={postList} loading={loading} error={error} />
        )}
        {console.log(debug)}
      </div>
    </div>
  );
}

export default PostList;
