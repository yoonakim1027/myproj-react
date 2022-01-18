// fieldValues : 현재의 필드값 내역
// handleFieldChange : 각 필드 값이 변화 시에 호출
// handleSubmit : 인자없는 함수. submit 시에 호출.
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';

import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useApiAxios } from 'api/base';
import { useEffect } from 'react/cjs/react.development';
import produce from 'immer';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = { title: '', content: '' };

// !articleId : 생성
// articleId  : 수정
function PostForm({ postId, handleDidSave }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: post, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/blog/api/posts/${postId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
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
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { setFieldValues, fieldValues, handleFieldChange } = useFieldValues(
    post || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues((prevFieldValues) => {
      const newFieldValues = produce(prevFieldValues, (draft) => {
        draft.photo = '';
      });
      return newFieldValues;
    });
  }, [post]); // []는 의존성! -> []안에 있는 것이 바뀌었을때? (Form이 처음뜰때)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;

        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });

    if (window.confirm('저장 하시겠습니까?')) {
      saveRequest({
        data: formData,
      }).then((response) => {
        const savedPost = response.data;
        if (handleDidSave) handleDidSave(savedPost);
      });
      navigate(`/blog/${post.id}`);
    }
  };

  return (
    <>
      <div className="block">
        <div className="w-full mb-6">
          {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
          {saveError &&
            `저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response.statusText})`}

          <form onSubmit={handleSubmit}>
            <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
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

            <div className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2 my-3">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handleFieldChange}
              />
              {saveErrorMessages.photo?.map((photo, index) => (
                <p key={index} className="text-xs text-red-400">
                  {photo}
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
              {saveErrorMessages.content?.map((message, index) => (
                <p key={index} className="text-xs text-red-400">
                  {message}
                </p>
              ))}
            </div>

            <div className="text-center my-3">
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
