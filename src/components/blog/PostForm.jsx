// fieldValues : 현재의 필드값 내역
// handleFieldChange : 각 필드 값이 변화 시에 호출
// handleSubmit : 인자없는 함수. submit 시에 호출.
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';

import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useApiAxios } from 'api/base';

const INIT_FIELD_VALUES = { title: '', content: '' };

// !articleId : 생성
// articleId  : 수정
function PostForm({ postId, handleDidSave }) {
  const [{ data: post, loading: getLoading, error: getError }] = useApiAxios(
    `/blog/api/posts/${postId}/`,
    { manual: !postId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !postId ? `/blog/api/posts/` : `/blog/api/posts/${postId}/`,
      method: !postId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(
    post || INIT_FIELD_VALUES,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <>
      <div className="block">
        <div className="w-full mb-6">
          {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
          {saveError &&
            `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

          <form onSubmit={handleSubmit}>
            <div className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              <input
                name="title"
                value={fieldValues.title}
                onChange={handleFieldChange}
                type="text"
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                placeholder="title"
              />
              {saveErrorMessages.title?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
            </div>

            <div className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              <br></br>
              <textarea
                name="content"
                value={fieldValues.content}
                onChange={handleFieldChange}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded mb-3 leading-loose focus:outline-none focus:bg-white pb-40 pl-2"
                placeholder="content"
              />
            </div>

            <div className="text-center">
              <Button type="success">저장하기</Button>
              <br></br>
            </div>
          </form>
          <DebugStates
            post={post}
            getLoading={getLoading}
            getError={getError}
            saveErrorMessages={saveErrorMessages}
            fieldValues={fieldValues}
          />
        </div>
      </div>
    </>
  );
}

export default PostForm;
