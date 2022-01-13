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
    <>
      <div className="my-5">
        {loading && '로딩 중 ...'}
        {error && '로딩 중 에러가 발생했습니다.'}
        {postList && (
          <div className="flex flex-wrap">
            {postList.map((post) => (
              <div key={post.id} className="w-full md:w-1/2 xl:w-1/3 px-4">
                <PostSummary post={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
      <hr />
      <div className="my-3 text-center">
        <Button type="purple" onClick={handleDebugClick}>
          Debug 상태 보기
        </Button>
      </div>

      <div>
        {debug && (
          <DebugStates postList={postList} loading={loading} error={error} />
        )}
        {console.log(debug)}
      </div>
    </>
  );
}

export default PostList;
