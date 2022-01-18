import { useEffect } from 'react';
import produce from 'immer';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useApiAxios } from 'api/base';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = { title: '', content: '' };

// !articleId : 생성
// articleId  : 수정

function ArticleForm({ articleId, handleDidSave }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  // auth를 통해서 상탯값 접근이 가능

  // articleId 값이 있을 때에만 조회
  // articleId => manual=false
  // !articleId => manual=true

  // 조회(조회의 첫번째 인자 : url(config))
  const [{ data: article, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/news/api/articles/${articleId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: !articleId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    requestToken,
  ] = useApiAxios(
    {
      url: !articleId
        ? '/news/api/articles/'
        : `/news/api/articles/${articleId}/`,
      method: !articleId ? 'POST' : 'PUT',
      headers: {
        // 중복 해결이 필요~ 공부가 더 필요해
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues, formData } =
    useFieldValues(article || INIT_FIELD_VALUES);

  // article 조회 시에 photo 속성을 빈 문자열로 변경
  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [article]);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({
      data: formData,
    }).then((response) => {
      const { savedPost } = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
    navigate('/news/');
  };

  return (
    <div>
      <H2>Article Form</H2>

      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}

      {saveError?.response.status === 403 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            // value=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.photo?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>
      <DebugStates
        article={article}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default ArticleForm;
