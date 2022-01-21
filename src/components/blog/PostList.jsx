import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import PostSummary from './PostSummary';
import { useAuth } from 'hooks/useContext';

function PostList() {
  const { auth } = useAuth();
  const [{ data: postList, loading, error }, refetch] = useApiAxios(
    `/blog/api/posts/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const [debug, setDebug] = useState(false);
  const handleDebugClick = () => {
    setDebug(true);
  };

  return (
    <>
      <div className="w-full my-5">
        {loading && '로딩 중 ...'}
        {error && '로딩 중 에러가 발생했습니다.'}
        {postList && (
          <div className="flex flex-wrap">
            {postList.map((post) => (
              <div
                key={post.id}
                className="transition-transform hover:-translate-y-5 duration-300 w-full px-4"
              >
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
          <DebugStates
            auth={auth}
            postList={postList}
            loading={loading}
            error={error}
          />
        )}
        {console.log(debug)}
      </div>
    </>
  );
}

export default PostList;
