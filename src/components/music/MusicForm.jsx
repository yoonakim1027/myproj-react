import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect } from 'react/cjs/react.development';
import produce from 'immer';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
// 초깃값
const INIT_FIELD_VALUES = { title: '', singer: '', content: '' };

function MusicForm({ musicId, handleDidSave }) {
  const [{ datat: music, loading: getLoading, error: getError }] = useApiAxios(
    `/youtubemusic/api/music/${musicId}/`,
    { manual: !musicId },
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
      url: !musicId
        ? `/youtubemusic/api/music/`
        : `/youtubemusic/api/music/${musicId}/`,
      method: !musicId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { setFieldValues, fieldValues, handleFieldChange, formData } =
    useFieldValues(music || INIT_FIELD_VALUES);

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [music]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('저장 하시겠습니까?')) {
      saveRequest({
        data: formData,
      }).then((response) => {
        const savedPost = response.data;
        if (handleDidSave) handleDidSave(savedPost);
      });
    }
  };

  return (
    <>
      <div className="block">
        <h2> Music Form</h2>
      </div>
      <div className="w-full mb-6">
        {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
        {saveError &&
          `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}
        <form onSubmit={handleSubmit}>
          <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            <input
              name="title"
              value={fieldValues.title}
              onChange={handleFieldChange}
              type="text"
              placeholder="title"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            />
            {saveErrorMessages.title?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </div>

          <div className="my-3">
            <input
              name="singer"
              value={fieldValues.singer}
              onChange={handleFieldChange}
              type="text"
              placeholder="singer"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            />
            {saveErrorMessages.title?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </div>

          <div className="my-3">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handleFieldChange}
              placeholder="photo"
            />
            {saveErrorMessages.photo?.map((photo, index) => (
              <p key={index} className="text-xs text-red-400">
                {photo}
              </p>
            ))}
          </div>

          <div>
            <textarea
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded mb-3 leading-loose focus:outline-none focus:bg-white pb-40 pl-2"
              placeholder="content"
            />
            {saveErrorMessages.content?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="my-3 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ">
            <select
              name="mood"
              value={fieldValues.mood}
              onChange={handleFieldChange}
              disabled={getLoading}
              className="overflow-scroll flex "
            >
              <option>힙할 때</option>
              <option>우울할 때</option>
              <option>신났을 때</option>
              <option>운동할 때</option>
              <option>분위기 좋은 와인바에서</option>
              <option>집중할 때</option>
            </select>
            {saveErrorMessages.mood?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </div>

          <div>
            <Button type="success">저장하기</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default MusicForm;
