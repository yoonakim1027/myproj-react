import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import React, { useEffect } from 'react';
import produce from 'immer';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
// 초깃값
const INIT_FIELD_VALUES = { title: '', singer: '', content: '', mood: '' };

// 데이터를 받아오는 부분 - > 여기서 data
// 여기 밑에부분이 데이터를 받아오는 부분임!!!@
// useApiAxios 부분
function MusicForm({ musicId, handleDidSave }) {
  const [{ data: music, loading: getLoading, error: getError }] = useApiAxios(
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

  // music 조회 시에 photo 속성을 빈 문자열로 변경
  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.album_photo = '';
      }),
    );
  }, [music]);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
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
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Title
              <input
                name="title"
                value={fieldValues.title}
                onChange={handleFieldChange}
                type="text"
                placeholder="노래 제목을 입력해주세요."
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
              {saveErrorMessages.title?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
            </label>
          </div>

          <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Artist
              <textarea
                name="singer"
                value={fieldValues.singer}
                onChange={handleFieldChange}
                placeholder="가수 이름을 입력해주세요."
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
              {saveErrorMessages.title?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
            </label>
          </div>

          <div className="my-3 block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Content
              <textarea
                name="content"
                value={fieldValues.content}
                onChange={handleFieldChange}
                className="h-80 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="가사를 입력해주세요."
              />
              {saveErrorMessages.content?.map((message, index) => (
                <p key={index} className="text-m text-red-400">
                  {message}
                </p>
              ))}
            </label>
          </div>

          <div className="my-3">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="album_photo"
              onChange={handleFieldChange}
              placeholder="album_photo"
            />
            {saveErrorMessages.album_photo?.map((photo, index) => (
              <p key={index} className="text-xs text-red-400">
                {photo}
              </p>
            ))}
          </div>
          <div className="my-3">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="singer_photo"
              onChange={handleFieldChange}
              placeholder="singer_photo"
            />
            {saveErrorMessages.singer_photo?.map((photo, index) => (
              <p key={index} className="text-xs text-red-400">
                {photo}
              </p>
            ))}
          </div>

          <div className="inline-block relative w-64">
            <select
              name="mood"
              value={fieldValues.mood}
              onChange={handleFieldChange}
              disabled={getLoading}
              className="my-3 uppercase tracking-wide text-gray-700 text-m font-bold mb-3 overflow-scroll flex "
            >
              <option>hiphop</option>
              <option>sad</option>
              <option>fun</option>
              <option>run</option>
              <option>groove</option>
              <option>study</option>
            </select>
            {saveErrorMessages.mood?.map((message, index) => (
              <p key={index} className="text-m text-red-400">
                {message}
              </p>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>

          <div>
            <Button type="success">저장하기</Button>
          </div>
        </form>

        <DebugStates
          music={music}
          getLoading={getLoading}
          getError={getError}
          saveErrorMessages={saveErrorMessages}
          fieldValues={fieldValues}
        />
      </div>
    </>
  );
}
export default MusicForm;
